import NextAuth from "next-auth"
import type { User as UserP, Session } from "@prisma/client"

declare module "next-auth" {
  interface User  {
    username: string,
    id: string,
    sessionToken?: Session['sessionToken']
  }
  interface Session {
    user:User
  }
}

