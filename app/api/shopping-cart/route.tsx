import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
  try {
    const holds = await prisma.transaction.findMany({
      where: {
        AND: [
          { renterId: session?.user.id },
          { status: 'HOLD' },
        ],
      },
      include: {
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    return NextResponse.json(holds);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
