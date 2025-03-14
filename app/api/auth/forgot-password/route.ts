import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "../../../../lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      )
    }

    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    await prisma.passwordReset.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    })

    await sendPasswordResetEmail(email, token)

    return NextResponse.json({ message: "Password reset email sent" })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Failed to process password reset" },
      { status: 500 }
    )
  }
}

export const runtime = "nodejs"