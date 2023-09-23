//@ts-nocheck
import NextAuth, { type NextAuthOptions } from "next-auth"

// Providers
import SlackProvider from "next-auth/providers/slack"

// Prisma Adapter
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,

      account: {
        accessToken: null,
        // Omit access_token field for Slack
      },
    }),
  ],
  callbacks: {
    oauth: async (params) => {
      const { account } = params

      // Remove for Slack
      if (account.provider === "slack") {
        delete account.accessToken
      }

      // Create account
      await prisma.account.create({ data: account })
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          randomKey: u.randomKey,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
