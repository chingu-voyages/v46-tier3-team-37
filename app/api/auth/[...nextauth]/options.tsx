import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { randomUUID } from 'crypto'
const bcrypt = require('bcrypt')

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Enter password',
        },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.username) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        })
        if (!user) {
          return null
        }

        const passwordIsCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordIsCorrect || !(credentials?.username === user.username)) {
          console.log(user, 'User not found in db')
          return null
        }

        const token = randomUUID()

        const userSession = await prisma.session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sessionToken: token,
          },
        })

        return {
          id: user.id,
          name: null,
          username: user.username,
          email: user.email,
          image: user.image,
          sessionToken: userSession.sessionToken,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.sessionToken = user.sessionToken
        token.username = user.username
      }
      if (token.sessionToken) {
        const session = await prisma.session.findFirst({
          where: {
            sessionToken: token.sessionToken,
          },
          include: {
            user: true,
          },
        })
      }
      return token
    },
    async signIn({ user, account }) {
      try {
        if (account?.type === 'oauth') {
          const token = randomUUID()
          await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              sessionToken: token,
            },
          })
          user.sessionToken = token
        }
      } catch (error) {
        console.log(error)
      }
      return true
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.userId,
        username: token.username,
      },
    }),
  },
  pages: {
    signIn: '/login',
  },
}
