import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {Field, ErrorMessage} from 'formik';
import s from './FormikContainer.module.css'
import {TextError} from "./TextError";
import {DropdownOptionsType} from "./FormikContainer";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

// здесь мы говорим что у нашего textarea будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)


type SelectPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    label?: string
    name: string,
    options: Array<DropdownOptionsType> | []
}

export const Select = React.memo((props: SelectPropsType) => {

    const {label, name, options, ...restProps} = props;

    return (
        <div className={s.form__item}>
            <label className={s.label} htmlFor={name}>{label}</label>
            <Field className={s.select} as={'select'} id={name} name={name} {...restProps}>
                {
                    options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.key}
                        </option>
                    ))
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
})
