"use client";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/plugin/duration";
dayjs.extend(require("dayjs/plugin/duration"));

export default function useCountdown() {
  const [seconds, setSeconds] = useState(600000);
  const timerId = useRef<NodeJS.Timeout>()

  const stopTimer = () => {
    clearInterval(timerId.current)
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (seconds <= 0) {
        stopTimer()
      }else { 
        setSeconds(prev => prev - 1000)
      }
    }, 1000)
    return () => clearInterval(timerId.current)
  }, []);

  const time = dayjs.duration(seconds).format("mm:ss");

  return {time, stopTimer};
}
