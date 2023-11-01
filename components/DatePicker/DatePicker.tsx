'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../uiComponents/Button';

export default function Calendar({
  excludeDateRangeArray,
}) {
  const [beginDate, setBeginDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());

  const onChange = (dates) => {
    const [start, end] = dates;
    setBeginDate(start);
    setEndingDate(end);
  };

  const updatedExcludeDateRangeArray =
    excludeDateRangeArray.map(({ startDate, endDate }) => ({
      start: parseISO(startDate),
      end: parseISO(endDate),
    }));
  console.log('this is the ', updatedExcludeDateRangeArray);

  return (
    <>
      <div>
        <DatePicker
          selected={beginDate}
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
          placeholderText='Select a date other than the interval from 5 days ago to 5 days in the future'
        />
        {/* <Button onClick={}>Add to Cart</Button> */}
      </div>
    </>
  );
}
