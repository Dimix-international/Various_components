import React, {useState} from "react";
import '../OnOff/OnOff.css'

export type OnOffType = {
    on: boolean
    onChange: (value:boolean) => void
}
export const OnOffWithControl = (props: OnOffType) => {

    const classCeilAddActive = props.on ? 'on' : null;
    const classCeilAddPassive = !props.on ? 'off' : null;
    const classIndicator = props.on ? 'on' : 'off';
    function setColor() {
        props.onChange(!props.on);
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
            }
        }>
            <div className={`ceil ${classCeilAddActive} `} onClick={setColor}>on</div>
            <div className={`ceil ${classCeilAddPassive}`} onClick={setColor}>off</div>
            <span className={`indicator ${classIndicator}`}></span>
        </div>
    )
}