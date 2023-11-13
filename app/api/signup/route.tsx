const bcrypt = require('bcrypt')
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  const newHash = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: newHash,
    },
  })
  console.log(newUser)
  return NextResponse.json(newUser?.username)
}
