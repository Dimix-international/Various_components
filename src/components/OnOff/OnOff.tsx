import React, {useState} from "react";
import './OnOff.css'

export type OnOffType = {
    onChange: (toggle:boolean) => void
    defaultOn?: boolean,
}
export const OnOff = (props: OnOffType) => {

    let[on, setOn] = useState<boolean>(props.defaultOn ? props.defaultOn : false);
    const classCeilAddActive = on ? 'on' : null;
    const classCeilAddPassive = !on ? 'off' : null;
    const classIndicator = on ? 'on' : 'off';
    function setColor() {
        props.onChange(!on);
        setOn(!on);
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