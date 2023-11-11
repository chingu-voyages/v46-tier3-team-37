'use client';
import useCountdown from "@/hooks/useCountdown"
import { createContext, useContext } from "react";

type TimerContext = {
    time: string,
    stopTimer: () => void
} | null


const TimerContext = createContext<TimerContext>(null)

//get cart item and pass as props. 
 export function TimerProvider({children}:{children: React.ReactNode}) {
    const {time, stopTimer} = useCountdown();

    
   return (
    <TimerContext.Provider value={{time, stopTimer}}>
        {children}
    </TimerContext.Provider>
   )
}

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) throw new Error('useTimer context is null');

    return context;
}


