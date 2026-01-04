import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/database/mongoose"
import mongoose from "mongoose"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectToDatabase()

        const usersCollection = mongoose.connection.db.collection("users")
        const user = await usersCollection.findOne({ 
          email: credentials.email as string
        })

        if (!user || !user?.hashedPassword) {
          return null
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)