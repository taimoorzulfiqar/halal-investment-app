// In your reset-password/page.js or page.tsx file
import { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form'; // Your component that uses useSearchParams

export default function ResetPasswordPage() {
  return (
    <div className="reset-password-container">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}