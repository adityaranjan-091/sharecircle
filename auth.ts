import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyFirebaseIdToken } from "@/lib/firebaseAdmin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ─── Email + Password ─────────────────────────────────
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
        }).select("+password");

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          credits: user.credits,
        };
      },
    }),

    // ─── Firebase Google Sign-In (ID Token) ───────────────
    Credentials({
      id: "firebase-google",
      name: "Firebase Google",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        const idToken = credentials?.idToken as string | undefined;
        if (!idToken) {
          return null;
        }

        const decoded = await verifyFirebaseIdToken(idToken);
        const email = decoded.email?.toLowerCase();

        if (!email) {
          return null;
        }

        await connectDB();

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: decoded.name || "Google User",
            email,
            image: decoded.picture || "",
            credits: 100,
          });
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          credits: user.credits,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    // Attach MongoDB user ID to the JWT token
    async jwt({ token, user }) {
      // First sign-in: map the user email to the MongoDB ID
      if (user?.email && !token.userId) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.userId = dbUser._id.toString();
          token.credits = dbUser.credits;
        }
      }
      // Always refresh credits from DB so the UI stays in sync
      if (token.userId) {
        await connectDB();
        const dbUser = await User.findById(token.userId);
        if (dbUser) {
          token.credits = dbUser.credits;
        }
      }
      return token;
    },

    // Expose userId and credits in the session
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
        (session.user as any).credits = (token as any).credits;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
});
