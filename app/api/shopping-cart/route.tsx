import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const holdTransactions = await prisma.transaction.findMany({
            where: {
                status: 'HOLD'
            },
            include: {
                renter: true,
                item: {
                    include: {
                        owner: true
                    }
                }
            }
        })

        return NextResponse.json(holdTransactions);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}