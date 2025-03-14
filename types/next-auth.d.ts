import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'USER' | 'ADMIN';
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    firstName: string;
    lastName: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN';
  }
}
