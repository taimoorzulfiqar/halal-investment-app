"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ResetPasswordForm from "./reset-password-form"

const metadata: { title: string; description: string } = {
  title: "Reset Password",
  description: "Reset your password",
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ResetPasswordForm token={token || undefined} />
    </Suspense>
  )
}