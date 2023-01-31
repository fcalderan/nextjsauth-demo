import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db("nextjs").collection("users");
        const user = await usersCollection.findOne({
          email: { $eq: credentials.email },
        });

        if (!user) {
          client.close();
          throw new Error("wrong user");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("wrong password");
        }

        client.close();
        return {
          user: {
            email: user.email,
            writepermission: user.writepermission,
          },
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      return {
        expires: session.expires,
        user: token.user,
      };
    },
  },
});
