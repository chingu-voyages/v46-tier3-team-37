'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseJSON } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../uiComponents/Button';

export default function Calendar({
  excludeDateRangeArray,
  tool,
  user,
}) {
  const [beginDate, setBeginDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    console.log(start, end);
    setBeginDate(setBefore8AM(start));
    setEndingDate(end);
  };

  const setBefore8AM = (date) => {
    console.log(date);
    const adjustedDate = new Date(date);
    console.log(adjustedDate);
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  };

  const calculateFee = (start, end) => {
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
      const response = await fetch(
        '/api/create-transaction',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: beginDate.toISOString(),
            endDate:
              endingDate.toISOString() ||
              beginDate.toISOString(),
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
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  const updatedExcludeDateRangeArray =
    excludeDateRangeArray.map(({ startDate, endDate }) => ({
      start: parseJSON(startDate),
      end: parseJSON(endDate),
    }));

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
          showDisabledMonthNavigation
          minDate={new Date()}
          selectsRange
          inline
          fixedHeight
        />
        <div className='py-2 pb-8'>
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
