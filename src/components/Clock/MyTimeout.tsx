import React, {useCallback, useEffect, useState} from "react";
import s from './MyTimeout.module.css'

const endDate = new Date(2022, 9, 15, 18, 33);

const initialTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
}
type TimeType = typeof initialTime
export const MyTimeout = () => {
    const [time, setTime] = useState<TimeType>(initialTime);

    const endTime = endDate.getTime();
    let todayTime = new Date().getTime();
    let remainingTime = endTime - todayTime;

    const oneMin = 60 * 1000;
    const oneHour = 60 * oneMin;
    const oneDay = 24 * oneHour;

    const addZeroes = (num: number) => num < 10 ? `0${num}` : num;

    const countTime = useCallback(() => {

        setTime({
                ...time,
                days: Math.floor(remainingTime / oneDay),
                hours: Math.floor((remainingTime % oneDay) / oneHour),
                minutes: Math.floor((remainingTime % oneHour) / oneMin),
                seconds: Math.floor((remainingTime % oneMin) / 1000),
            }
        )

    }, [time, remainingTime, oneDay, oneHour, oneMin])

    useEffect(() => {
        let timeoutId: number = window.setTimeout(() => {
            if (endTime < todayTime) {
                return clearTimeout(timeoutId)
            }

            countTime();

            return (() => {
                clearTimeout(timeoutId)
            })
        }, 1000)
    }, [endTime, todayTime, countTime])

    return (
        <div className={s.countdown}>
            <div className={s.box}>
                <span className={s.num}
                      data-name={'day-box'}>{addZeroes(time.days)}</span>
                <span className={s.text}>Days</span>
            </div>
            <div className={s.box}>
                <span className={s.num}
                      data-name={'hours-box'}>{addZeroes(time.hours)}</span>
                <span className={s.text}>Hours</span>
            </div>
            <div className={s.box}>
                <span className={s.num}
                      data-name={'minutes-box'}>{addZeroes(time.minutes)}</span>
                <span className={s.text}>Minutes</span>
            </div>
            <div className={s.box}>
                <span className={s.num}
                      data-name={'seconds-box'}>{addZeroes(time.seconds)}</span>
                <span className={s.text}>Seconds</span>
            </div>
        </div>
    )
}

