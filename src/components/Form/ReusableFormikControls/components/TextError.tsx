import React from "react";
import s from './FormikContainer.module.css'



export const TextError = React.memo((props: any) => {

    return (
        <div className={s.error}>
            {props.children}
        </div>
    )
})
