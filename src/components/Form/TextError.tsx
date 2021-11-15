import React from "react";
import s from './UseFormikComponent.module.css'

type TextErrorType= {}
export const TextError: React.FC<TextErrorType> = (props) => {
    return (
        <span className={s.error}>
            {props.children}
        </span>
    )
}
