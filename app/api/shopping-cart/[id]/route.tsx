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

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  const transactionId = req.nextUrl?.pathname
    ?.split('/')
    .pop();

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
    const transaction = await prisma.transaction.findUnique(
      {
        where: {
          id: transactionId,
        },
      }
    );

    if (!transaction) {
      return NextResponse.json('Transaction not found', {
        status: 404,
      });
    }

    const active = new Date() >= transaction.startDate;
    let newStatus: 'OPEN' | 'ACTIVE' = 'OPEN';

    if (active) {
      newStatus = 'ACTIVE';
    }

    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json({
      message: 'Transaction status updated successfully',
    });
  } catch (error) {
    console.error(
      'Error updating transaction status:',
      error
    );
    return NextResponse.json(
      'Failed to update transaction status',
      {
        status: 500,
      }
    );
  }
}
