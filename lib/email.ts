export async function sendPasswordResetEmail(email: string, token: string) {
  // In a real application, you would integrate with an email service
  // For now, we'll just log the reset link
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  console.log(`Password reset link for ${email}: ${resetLink}`)
}
