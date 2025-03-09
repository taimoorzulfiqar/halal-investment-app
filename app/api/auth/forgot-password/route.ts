import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return success even if user doesn't exist for security
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link'
      })
    }

    // Create a password reset token
    const resetToken = await createToken({
      userId: user.id,
      type: 'password_reset'
    })

    // In a real application, you would send an email here with the reset link
    // For demo purposes, we'll just return the token
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return NextResponse.json({
      message: 'If an account exists with this email, you will receive a password reset link'
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
} 