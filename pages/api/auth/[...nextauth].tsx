import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import { verifyPassword } from '../../../src/utils/bcryptUtils';
import dbConnect from '../../../src/utils/dbConnect';

export default NextAuth({
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

        await dbConnect();

        console.log(credentials, 'credentials');

        const user = await User.findOne({ email: credentials!.email });

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
        return { email: user.email };
      },
    }),
  ],
});
