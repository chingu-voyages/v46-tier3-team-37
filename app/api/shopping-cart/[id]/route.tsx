import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../../auth/[...nextauth]/options';

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);

  const transactionId = req.nextUrl?.pathname
    ?.split('/')
    .pop();
  console.log(transactionId);

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    });
  }

  if (!transactionId) {
    return NextResponse.json('Transaction ID is missing', {
      status: 400,
    });
  }

  try {
    const deletedTransaction =
      await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      });
    if (!deletedTransaction) {
      return NextResponse.json(
        'Transaction could not be deleted',
        { status: 500 }
      );
    }
    return NextResponse.json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      'Failed to delete transaction',
      { status: 500 }
    );
  }
}
