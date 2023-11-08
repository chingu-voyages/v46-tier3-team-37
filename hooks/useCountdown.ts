import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/plugin/duration";
dayjs.extend(require("dayjs/plugin/duration"));

export default function useCountdown() {
  const [seconds, setSeconds] = useState(600000);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  function startTimer() {
    if (seconds <= 0) {
      stopTimer();
      return;
    }
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1000);
      console.log(seconds);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerId.current);
    setSeconds(600000);
  }

  const timer = dayjs.duration(seconds).format("mm:ss");
  return { timer, stopTimer };
}
//start timer
//show toast with timer and x button to close
//delete cart item when timer ends.
//end timer if item is checked out.
//show success toast when checkout is complete should be done in the checkout page or component
