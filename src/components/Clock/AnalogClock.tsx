import React from "react";
import {ClocksPropsType} from "./Clock";


export const AnalogClock: React.FC<ClocksPropsType> = ({date}) => {
    return (
        <div className={'arrowClock'}>
            <ClockArrow
                name={'hour'}
                value={date.getHours()}
                minutes={date.getMinutes()}
            />
            <ClockArrow
                name={'min'}
                value={date.getMinutes()}
            />
            <ClockArrow
                name={'sec'}
                value={date.getSeconds()}
            />
        </div>
    )
}
export type ClockArray = {
    name: string
    value: number
    minutes?: number
}
export const ClockArrow = React.memo((props: ClockArray) => {
    let degree: number = 0;
    if (props.minutes) {
        degree = props.value * 30 + props.minutes / 2;
    } else {
        degree = props.value * 6;
    }
    return (
        <div
            style={{transform: `rotate(${degree}deg)`}}
            className={props.name}>
        </div>
    )
})