import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
    const session = await getServerSession(options);
    try {
        const holdItems = await prisma.item.findMany({
            where: {
                Transaction: {
                    some: {
                        status: 'HOLD',
                        renterId: session?.user.id
                    }
                }
            },
            include: {
                Transaction: {
                    where: {
                        status: 'HOLD',
                        renterId: session?.user.id
                    }
                },
                owner: true,
                images: true
            }
        })

        return NextResponse.json(holdItems);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}