import React from "react";
import {ClocksPropsType} from "./Clock";

export const DigitalClock: React.FC<ClocksPropsType> = ({date}) => {
    const correctTime = (value: number) => {
        return value < 10 ? `0${value}` : value
    }
    return (
        <div className={'clock'}>
            <span className={'element'}>{correctTime(date.getHours())}</span>
            :
            <span className={'element'}>{correctTime(date.getMinutes())}</span>
            :
            <span className={'element'}>{correctTime(date.getSeconds())}</span>
        </div>
    )
}