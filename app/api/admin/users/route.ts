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

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true
    }
  });

  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();
  const data = await request.json();

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();

  await prisma.user.delete({
    where: { id: userId }
  });

  return NextResponse.json({ success: true });
}
