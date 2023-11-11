'use client'
import { useTimer } from "@/components/cartToast/useTimer";

export default function Test() {
    
  const {time, stopTimer} = useTimer();
    return (
        <>
        time: {time}
        <button onClick={stopTimer}>stop</button>
        </>
    )
}