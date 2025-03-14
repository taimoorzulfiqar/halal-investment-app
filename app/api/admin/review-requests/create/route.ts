import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Create review request
  const reviewRequest = await prisma.reviewRequest.create({
    data: {
      investment: { connect: { id: data.investmentId } },
      requester: { connect: { id: user.id } },
      status: 'PENDING'
    },
    include: {
      investment: true,
      requester: true
    }
  });

  return NextResponse.json(reviewRequest);
}
