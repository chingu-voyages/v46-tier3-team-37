import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export async function GET (req: NextRequest) {
    const session = await getServerSession(options);
    try {
        const holdTransactions = await prisma.transaction.findMany({
            where: {
                status: 'HOLD',
                renterId: session?.user.id
            },
            include: {
                renter: true,
                item: {
                    include: {
                        owner: true,
                        images: true
                    }
                },
            }
        })

        return NextResponse.json(holdTransactions);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}