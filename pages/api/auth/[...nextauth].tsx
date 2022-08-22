import NextAuth, { Awaitable, Session, User } from 'next-auth';
import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
import UserEntity from '../../../models/User';
import { verifyPassword } from '../../../src/utils/bcryptUtils';
import dbConnect from '../../../src/utils/dbConnect';

type ExtendedUserType = User & { isAdmin: boolean };

export default NextAuth({
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      (session.user as ExtendedUserType).isAdmin = token.user.isAdmin;

      return session;
    },
  },
  session: {
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    CredentialsProvider({
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials) return;

        console.log(credentials, 'credentials');

        await dbConnect();

        console.log(credentials, 'credentials');

        const user = await UserEntity.findOne({ email: credentials!.email });

        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in');
        }

        if (credentials.callbackUrl.includes('admin')) {
          if (user.isAdmin) {
            return user;
          } else {
            throw new Error('You Cant Sign in');
          }
        } else {
          return user;
        }
      },
      credentials: {
        email: '' as CredentialInput,
        password: '' as CredentialInput,
        callbackUrl: '' as CredentialInput,
      },
    }),
  ],
});
