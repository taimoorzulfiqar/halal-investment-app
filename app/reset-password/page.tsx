"use client"

import { Suspense } from "react"
import ResetPasswordForm from "./reset-password-form"

const metadata: { title: string; description: string } = {
  title: "Reset Password",
  description: "Reset your password",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <ResetPasswordForm />
      </div>
    </div>
  )
}