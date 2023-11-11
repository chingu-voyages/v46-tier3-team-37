'use client';

import { useState } from 'react';
import Card from '@/components/uiComponents/Card';
import { CartItem } from '@/types/cartItemType';
import RemoveButton from './RemoveButton';
import CompleteButton from './CompleteButton';

export function CheckoutTransactions({
  transactions,
}: {
  transactions: CartItem[];
}) {
  const [holds, setHolds] = useState(transactions);

  const handleRemove = async (id: string) => {
    await removeTransaction(id);
    setHolds((prevTransactions) =>
      prevTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  const handleComplete = async (id: string) => {
    await completeTransaction(id);
    setHolds((prevTransactions) =>
      prevTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  const removeTransaction = async (
    transactionId: String
  ) => {
    try {
      const res = await fetch(
        `/api/shopping-cart/${transactionId}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const completeTransaction = async (
    transactionId: String
  ) => {
    try {
      const res = await fetch(
        `/api/shopping-cart/${transactionId}`,
        {
          method: 'POST',
        }
      );
    } catch (error) {
      console.error('Error completing transaction:', error);
    }
  };

  return (
    <>
      {holds &&
        holds.map((hold) => {
          return (
            <div className=' p-2' key={hold.id}>
              <section className=' w-full p-4 bg-[white] dark:bg-foregroundPrimary'>
                <Card
                  variant={'default'}
                  title={hold.item.name}
                  imageSrc={hold.item.images[0]?.url}
                ></Card>
              </section>
              <section className='w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary'>
                <h1 className='font-bold text-fontPrimary'>
                  Your Rental
                </h1>
                <h3 className='font-semibold text-sm mt-4 text-fontPrimary'>
                  Dates
                </h3>
                <ul className='pb-4 font-light'>
                  <li className='flex justify-between py-1'>
                    <p>
                      Start Date:{' '}
                      {hold.startDate.toString()}
                    </p>
                    <RemoveButton
                      id={hold.id}
                      handleRemove={handleRemove}
                    />
                    <CompleteButton
                      id={hold.id}
                      handleComplete={handleComplete}
                    />
                  </li>
                  <li className='flex justify-between py-1'>
                    <p>
                      End Date: {hold.endDate.toString()}
                    </p>
                  </li>
                  <li className='flex justify-between'>
                    <p className='font-bold'>Fee</p>$
                    {hold.fee}
                  </li>
                </ul>
              </section>
              <section className='w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary'>
                <h1 className='font-bold text-fontPrimary'>
                  Price Details
                </h1>
                {holds.length ? (
                  <ul className='px-10'>
                    {holds.map((hold) => (
                      <li
                        className='flex justify-between'
                        key={hold.id}
                      >
                        <p>
                          {hold.item.name} Fee: ${hold.fee}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </section>
            </div>
          );
        })}
    </>
  );
}
