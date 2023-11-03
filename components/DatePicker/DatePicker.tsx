'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseJSON } from 'date-fns';
import { ItemComplete as Tool } from '@/types/schemaTypes';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../uiComponents/Button';
import Link from 'next/link';

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
        const response = await fetch(
          '/api/create-transaction',
          {
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
          }
        );

        if (response.ok) {
          console.log('Transaction created successfully!');
        } else {
          console.error('Failed to create transaction');
        }
      }
    } catch (error) {
      console.error('Failed to create transaction:', error);
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
          <Button variant={'icon'} onClick={clearDates}>
            Clear Date Selection
          </Button>
          {!user && (
            <div className='flex flex-col'>
              <p>Users must be signed in to rent items</p>
              <div className='flex space-between'>
                <Link href={'/login'}>
                  <Button>Login</Button>
                </Link>
                <Link href={'/signup'}>
                  <Button>Signup</Button>
                </Link>
              </div>
            </div>
          )}
          {!endingDate ? (
            <p>Select both a start and end date</p>
          ) : (
            <Button onClick={addToCart}>Add to Cart</Button>
          )}
        </div>
      </div>
    </>
  );
}
