import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { authRateLimit, apiRateLimit } from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = request.nextUrl.pathname.startsWith('/api/auth')
    ? authRateLimit(request)
    : apiRateLimit(request)

  if (rateLimitResult) {
    return rateLimitResult
  }

  // Paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/reset-password'
  ]

  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith('/images/') ||
    request.nextUrl.pathname.startsWith('/_next/')
  )

  // Create base response
  let response = isPublicPath 
    ? NextResponse.next()
    : await handleProtectedRoute(request)

  // If the response is a redirect, don't modify headers
  if (response.status === 302) {
    return response
  }

  try {
    // Add security headers
    const headers = new Headers(response.headers)
    headers.set('X-DNS-Prefetch-Control', 'off')
    headers.set('X-Frame-Options', 'SAMEORIGIN')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
    )
    headers.set('X-XSS-Protection', '1; mode=block')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    // Create new response with headers
    response = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    })
  } catch (error) {
    console.error('Error setting security headers:', error)
  }

  return response
}

async function handleProtectedRoute(request: NextRequest) {
  const session = await getSession()
  
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 