import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToMongoDB, connectToContentful } from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials.source === "mongodb") {
          const client = await connectToMongoDB();
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
              writepermission: +user.writepermission,
              s3key: user.s3key || "",
              authSource: credentials.source,
            },
          };
        }

        if (credentials.source === "contentful") {
          const response = await connectToContentful();
          let user = response.filter(function (entry) {
            return entry.fields.email === credentials.email;
          });

          if (user.length < 1) {
            throw new Error("wrong user");
          }

          user = user[0].fields;

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("wrong password");
          }
          return {
            user: {
              email: user.email,
              writepermission: +user.writepermission,
              s3key: user.s3key || "",
              authSource: credentials.source,
            },
          };
        }
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
