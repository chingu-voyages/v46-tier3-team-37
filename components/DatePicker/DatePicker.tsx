'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseJSON } from 'date-fns';
import { ItemComplete as Tool } from '@/types/schemaTypes';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../uiComponents/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export default function Calendar({
  excludeDateRangeArray,
  tool,
  user,
}: {
  excludeDateRangeArray: DateRange[];
  tool: Tool;
  user: String | undefined | null;
}) {
  const [beginDate, setBeginDate] = useState<Date | null>(
    null
  );
  const [endingDate, setEndingDate] = useState<Date | null>(
    null
  );

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start !== null) {
      setBeginDate(setBefore8AM(start));
    }
    if (end !== null) {
      setEndingDate(end);
    }
  };

  const clearDates = () => {
    setBeginDate(null);
    setEndingDate(null);
  };

  const setBefore8AM = (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  };

  const calculateFee = (start: Date, end: Date) => {
    if (tool.ownerId === user) return 0;
    const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

    const differenceInMillis =
      end.getTime() - start.getTime();

    const days = Math.round(
      differenceInMillis / MILLIS_PER_DAY
    );

    const fee = days * tool.price;
    return fee;
  };

  const addToCart = async () => {
    try {
      if (beginDate && endingDate) {
        toast.promise(
          fetch('/api/create-transaction', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              startDate: beginDate.toISOString(),
              endDate: endingDate.toISOString(),
              itemId: tool.id,
              renterId: user,
              fee: calculateFee(beginDate, endingDate),
            }),
          })
            .then(async (response) => {
              if (response.ok) {
                return response.json().then((data) => {
                  if (data.error) {
                    toast.error(data.error);
                    return Promise.reject(data.error);
                  } else {
                    toast.success(
                      'Your order is now on hold in checkout!'
                    );
                    return 'Successful';
                  }
                });
              } else {
                return Promise.reject(
                  'Failed to create transaction'
                );
              }
            })
            .catch((error) => {
              return Promise.reject(
                'Oops! Something went wrong.'
              );
            }),
          {
            loading: 'Loading...',
            success: 'Successful',
            error: 'Oops! Something went wrong.',
          }
        );
      }
    } catch (error) {
      toast.error('Oops! Something went wrong.');
    }
  };

  const updatedExcludeDateRangeArray =
    excludeDateRangeArray.map(
      ({
        startDate,
        endDate,
      }: {
        startDate: Date;
        endDate: Date;
      }) => ({
        start: parseJSON(startDate),
        end: parseJSON(endDate),
      })
    );

  return (
    <>
      <div className='flex flex-col items-center'>
        <DatePicker
          startDate={beginDate}
          endDate={endingDate}
          onChange={onChange}
          excludeDateIntervals={
            updatedExcludeDateRangeArray
          }
          minDate={new Date()}
          showDisabledMonthNavigation
          selectsRange
          inline
          fixedHeight
        />
        <div className='py-2 pb-8 items-center flex flex-col'>
          {!user ? (
            <div className='flex flex-col'>
              <h1 className='font-bold'>
                Users must be signed in to rent items
              </h1>
              <div className='flex justify-between'>
                <Link href={'/login'}>
                  <Button>Login</Button>
                </Link>
                <Link href={'/signup'}>
                  <Button>Signup</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className='flex flex-col space-y-2'>
              <Button variant={'icon'} onClick={clearDates}>
                Clear Date Selection
              </Button>
              {!endingDate ? (
                <p>Select both a start and end date</p>
              ) : (
                <Button onClick={addToCart}>
                  Add to Cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
