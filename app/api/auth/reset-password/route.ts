import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, verifyToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    // Verify the reset token
    const payload = await verifyToken(token)
    if (!payload || payload.type !== 'password_reset') {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Update the user's password
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedPassword }
    })

    return NextResponse.json({
      message: 'Password updated successfully'
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
} 