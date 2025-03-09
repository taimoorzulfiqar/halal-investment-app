import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(request: NextRequest, maxRequests = 5, windowMs = 60000) {
  const ip = request.ip ?? 'anonymous'
  const now = Date.now()
  
  // Clean up expired entries
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
  
  // Initialize or get existing record
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs
    }
    return null
  }
  
  // Increment count
  store[ip].count++
  
  // Check if over limit
  if (store[ip].count > maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    )
  }
  
  return null
}

// Different limits for different endpoints
export const authRateLimit = (req: NextRequest) => rateLimit(req, 15, 60000) // 15 requests per minute
export const apiRateLimit = (req: NextRequest) => rateLimit(req, 100, 60000) // 100 requests per minute 