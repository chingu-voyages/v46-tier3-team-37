'use client';
import toast from "react-hot-toast"
import useCountdown from "@/hooks/useCountdown"

//get cart item and pass as props. 
export default function CartToast() {
    const {timer, stopTimer} = useCountdown();
    // add toast in return statement and display timer
   return (
    <>Time: {timer && timer}
    <br/>
    <br/>
    <br/>
    <button onClick={stopTimer}>stop</button>
    </>
   )
}