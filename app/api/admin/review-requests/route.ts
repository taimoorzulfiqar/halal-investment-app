import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Middleware to check if user is admin
async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      id: true,
      role: true
    }
  });
  
  return user?.role === 'ADMIN';
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  });

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reviewRequests = await prisma.reviewRequest.findMany({
    include: {
      investment: true,
      requester: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return NextResponse.json(reviewRequests);
}

export async function POST(request: Request) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { investmentId, status, notes } = data;

    const updatedReview = await prisma.reviewRequest.update({
      where: { investmentId },
      data: {
        status,
        notes,
        reviewerId: (await getServerSession(authOptions))?.user?.id
      }
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review request:', error);
    return NextResponse.json({ error: 'Failed to update review request' }, { status: 500 });
  }
}
