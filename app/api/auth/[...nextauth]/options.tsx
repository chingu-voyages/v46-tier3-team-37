import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { randomUUID } from 'crypto'
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

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
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          })

          const passwordIsCorrect = await bcrypt.compare(
            credentials?.password,
            user?.password
          )

          if (
            !passwordIsCorrect ||
            !(credentials?.username === user?.username)
          ) {
            console.log(user, 'User no found in db')
            return null
          }

          const token = randomUUID()
          await prisma.session.create({
            data: {
              userId: user?.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              sessionToken: token,
            },
          })
          return {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            name: user?.name,
            image: user?.image,
            sessionToken: token,
          }
        } catch (error) {
          console.log(error)
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id
        token.sessionToken = user.sessionToken
        token.username = user.username
      }
      if (token?.sessionToken) {
        const session = await prisma.session.findFirst({
          where: {
            sessionToken: token.sessionToken,
          },
          include: {
            user: true,
          },
        })
        if (!session) {
          return null
        }
      }
      console.log(token, 'test')
      return token
    },
    async signIn({ user, account, profile }) {
      try {
        if (account?.type === 'oauth') {
          const token = randomUUID()
          await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              sessionToken: token,
            },
          })
          console.log(user)
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
        id: token?.userId,
        username: token?.username,
      },
    }),
  },
  pages: {
    signIn: '/login',
  },
}
