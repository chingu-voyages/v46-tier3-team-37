import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
) {
  try {
    const user = await prisma?.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            image: true

        }
    })
    console.log(user)
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}