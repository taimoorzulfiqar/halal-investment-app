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
    select: { role: true }
  });
  
  return user?.role === 'ADMIN';
}

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requests = await prisma.reviewRequest.findMany({
    include: {
      investment: {
        select: {
          id: true,
          title: true,
          description: true
        }
      },
      requester: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return NextResponse.json(requests);
}

export async function PUT(request: Request) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const requestId = url.pathname.split('/').pop();
  const data = await request.json();

  const session = await getServerSession(authOptions);
  const adminUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  });

  const reviewRequest = await prisma.reviewRequest.update({
    where: { id: requestId },
    data: {
      status: data.status,
      comment: data.comment,
      reviewerId: adminUser?.id
    },
    include: {
      investment: true,
      requester: true
    }
  });

  return NextResponse.json(reviewRequest);
}
