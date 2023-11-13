import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const body = await (request as any).json();
      const { startDate, endDate, itemId, renterId, fee } =
        body;

      const existingTransactions =
        await prisma.transaction.findMany({
          where: {
            itemId,
            OR: [
              {
                startDate: { lte: new Date(endDate) },
                endDate: { gte: new Date(startDate) },
              },
              {
                startDate: { lte: new Date(startDate) },
                endDate: { gte: new Date(endDate) },
              },
            ],
          },
        });

      if (existingTransactions.length > 0) {
        return NextResponse.json({
          error: 'Transaction dates are not available',
        });
      }

      const transaction = await prisma.transaction.create({
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          itemId,
          renterId,
          fee,
          status: 'HOLD',
        },
      });

      return NextResponse.json({ transaction });
    } else {
      return NextResponse.json({
        error:
          'Invalid content type. Please provide JSON data.',
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
