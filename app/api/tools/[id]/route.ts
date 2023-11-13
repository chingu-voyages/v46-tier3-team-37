import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tool = await prisma.item.findUnique({
      where: {
        id: params.id,
      },
      include: {
        images: true,
        Transaction: {
          select: {
            startDate: true,
            endDate: true,
          },
          where: {
            NOT: {
              status: 'COMPLETED',
            },
          },
        },
      },
    })

    return NextResponse.json(tool)
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await (req as any).json();
  const column = Object.keys(data);

  try {
    const tool = await prisma!
      .$executeRaw`UPDATE public."Item" SET name = ${data.name}, description = ${data.description}, price = ${data.price}, "locationId" = 'clnyrowxr0004um24xcchp04w', "ownerId" = 'clnyrovuc0000um24rxym2fm3' WHERE id = ${params.id}`;
    
    return NextResponse.json(tool);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
