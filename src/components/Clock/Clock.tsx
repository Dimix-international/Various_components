import React, {useEffect, useState} from "react";
import './Clock.css'
import {DigitalClock} from "./DigitalClock";
import {AnalogClock} from "./AnalogClock";


export const Clock = (props: any) => {
    const [date, setDate] = useState(new Date());
    const [toggleClock, setToggleClock] = useState(true)

    useEffect(() => {
        let idInterval: number = window.setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [])
    const changeClock = () => {
        setToggleClock(!toggleClock)
    }
    return (
        <div>
            <button
                className={'changeBtn'}
                onClick={changeClock}
            >
                change clock
            </button>
            <div>
                {toggleClock
                    ? <DigitalClock date={date}/>
                    : <AnalogClock date={date}/>
                }</div>
        </div>
    )
}

export type ClocksPropsType = {
    date: Date
}

