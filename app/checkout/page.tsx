import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { CheckoutTransactions } from '@/components/checkoutPage/CheckoutTransactions';
export const dynamic = "force-dynamic"

async function getUsersHoldTransactions() {
  const session = await getServerSession(options);
  if (!session) redirect('/login');
  const transactionHolds =
    await prisma.transaction.findMany({
      where: {
        AND: [
          { renterId: session.user.id },
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
  if (!transactionHolds) {
    throw new Error('no transactions found');
  }
  return transactionHolds;
}

export default async function CheckoutPage() {
  const session = await getServerSession(options);
  const transactionHolds = await getUsersHoldTransactions();

  return (
    <main className='dark flex flex-col gap-4 dark text-center bg-opacity-5 bg-[black] dark:bg-backgroundPrimary dark:text-fontSecondary h-full w-screen md:px-48'>
      {transactionHolds.length > 0 ? (
        <CheckoutTransactions
          transactions={transactionHolds}
        />
      ) : (
        <div>
          <p>There are no items in the cart</p>
        </div>
      )}

      {/* <section className='w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary'>
        <h1 className='font-bold mb-4 text-fontPrimary'>
          Choose Payment Option
        </h1>
        <ul className='px-10'>
          <li className='flex justify-between items-center border h-16 px-5'>
            <label htmlFor='card'>Card Info</label>
            <input type='radio' value='card' />
          </li>
          <li className='flex justify-between items-center border h-16 px-5'>
            <label htmlFor='card'>Card Info</label>
            <input type='radio' value='card' />
          </li>
        </ul>
      </section> */}
    </main>
  );
}
