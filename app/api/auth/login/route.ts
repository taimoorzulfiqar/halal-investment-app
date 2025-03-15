import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePasswords, createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.text();
    console.log('Request body:', body);

    let parsedBody;
    try {
      // Attempt to parse the request body as JSON
      parsedBody = JSON.parse(body);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Destructure email and password from the parsed body
    const { email, password } = parsedBody;

    // Validate that email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify the password
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Validate the user object before creating a token
    if (!user || !user.id || !user.email || !user.firstName || !user.lastName) {
      console.error('Invalid user object:', user);
      return NextResponse.json(
        { error: 'Invalid user data' },
        { status: 500 }
      );
    }

    // Create a JWT token
    const token = await createToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    // Set the token as an HTTP-only cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/', // Accessible across the entire site
    });

    // Return the user data (excluding sensitive information like password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}