import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma?.user.findUnique({
        where: {
            id: params.id
        },
        select: {
            name: true,
            email: true,
            username: true,
            image: true,
        }
    })

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}


//Waiting on next auth issue #28 to be completed before implementing protected user routes