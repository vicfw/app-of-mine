import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: {
      isAdmin: boolean;
      email: string;
    };
  }
}

declare module 'next-auth' {
  interface User {
    /** This is an example. You can find me in types/next-auth.d.ts */
    isAdmin: boolean;
    email: string;
  }
}

// /** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      isAdmin: boolean;
      email: string;
    } /** This is an example. You can find me in types/next-auth.d.ts */;
  }
}
