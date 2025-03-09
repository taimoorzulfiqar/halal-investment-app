import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { prisma } from './db'

export async function generateTwoFactorSecret(userId: string) {
  const secret = speakeasy.generateSecret({
    name: 'InvestConnect'
  })

  // Store the secret in the database
  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorSecret: secret.base32 }
  })

  // Generate QR code
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.base32,
    label: 'InvestConnect',
    issuer: 'InvestConnect'
  })

  const qrCodeUrl = await QRCode.toDataURL(otpauthUrl)

  return {
    secret: secret.base32,
    qrCode: qrCodeUrl
  }
}

export async function verifyTwoFactorToken(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user?.twoFactorSecret) {
    return false
  }

  return speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token
  })
}

export async function enableTwoFactor(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorEnabled: true }
  })
}

export async function disableTwoFactor(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret: null
    }
  })
} 