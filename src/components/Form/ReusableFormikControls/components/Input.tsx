import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {Field, ErrorMessage} from 'formik';
import s from './FormikContainer.module.css'
import {TextError} from "./TextError";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    label?: string
    name: string
}


export const Input = React.memo((props: InputPropsType) => {

    const {label, name, ...restProps} = props;

    return (
        <div className={s.form__item}>
            <label className={s.label} htmlFor={name}>{label}</label>
            <Field
                className={s.element}
                id={name}
                name={name}
                {...restProps}
            />
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
})
