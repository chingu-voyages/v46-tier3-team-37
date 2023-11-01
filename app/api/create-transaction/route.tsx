import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    if (req.method === 'PUT') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const body = await req.json();
        const {
          startDate,
          endDate,
          itemId,
          renterId,
          fee,
        } = body;

        const transaction = await prisma.transaction.create(
          {
            data: {
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              itemId,
              renterId,
              fee,
              status: 'HOLD',
            },
          }
        );

        return NextResponse.json({ transaction });
      } else {
        return NextResponse.json({
          error:
            'Invalid content type. Please provide JSON data.',
        });
      }
    } else {
      return NextResponse.json({
        error: 'This endpoint only accepts PUT requests.',
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
