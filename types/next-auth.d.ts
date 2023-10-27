import NextAuth from "next-auth"
import type { User as UserP, Session } from "@prisma/client"

declare module "next-auth" {
  interface User  {
    username: string,
    sessionToken?: Session['sessionToken']
  }
}