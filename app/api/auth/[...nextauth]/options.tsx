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
      /**this try catch block is going to try and change the return type of credentials
       * its expecting a return type of awaitable<User | null>
       */
        // try {
          if (!credentials || !credentials.username) {
            return null
          }
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
          })
          /**this is to let typescript know that the user exists so that you dont have to do
           * user?.property <-- This can cause unexpected errors if it does not exist. 
           */
          if (!user) {
            return null
          }

          const passwordIsCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (
            !passwordIsCorrect ||
            !(credentials?.username === user.username)
          ) {
            console.log(user, 'User no found in db')
            return null
          }

          const token = randomUUID()
          /**prisma create() expects a return of type Session */
          const userSession = await prisma.session.create({
                        data: {
                          userId: user.id,
                          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                          sessionToken: token,
                        }
                      })

          return {
            id: user.id,
            name: null, //name is no longer a type on our user schema but it is expected by the nextAuth User type
            username: user.username,
            email: user.email,
            image: user.image,
            sessionToken: userSession.sessionToken,
          }
        // } catch (error) {
        //   console.log(error)
        // }
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
        /***The jwt callback cannot return null it must return a type Token
         * Im not sure what this conditional is trying to accomplish so i didn't delete it.
         * You could return a invalidated token?
         */
        // if (!session) {
        //   return null
        // }
      }
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