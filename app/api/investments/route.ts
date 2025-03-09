import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const investments = await prisma.investment.findMany({
      include: {
        postedBy: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })
    return NextResponse.json(investments)
  } catch (error) {
    console.error('Error fetching investments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const investment = await prisma.investment.create({
      data: json
    })
    return NextResponse.json(investment)
  } catch (error) {
    console.error('Error creating investment:', error)
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    )
  }
} 