// @ts-ignore
const zxcvbn = require('zxcvbn')

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  score: number
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  
  // Check minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  // Check for number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  // Check for special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  // Check password strength using zxcvbn
  const result = zxcvbn(password)
  
  if (result.score < 3) {
    errors.push('Password is too weak. Try making it longer or more complex.')
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: result.score
  }
} 