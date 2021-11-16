import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {Field, ErrorMessage} from 'formik';
import s from './FormikContainer.module.css'
import {TextError} from "./TextError";
import {DropdownOptionsType} from "./FormikContainer";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLElement>

// здесь мы говорим что у нашего textarea будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)


type RadioButtonsType =DefaultInputPropsType & {
    label?: string
    name: string,
    options: Array<DropdownOptionsType> | []
}

export const RadioButtons = React.memo((props: RadioButtonsType) => {

    const {label, name, options, ...restProps} = props;
    return (
        <div className={s.form__item}>
            <label className={s.label} htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    (props: any) => {
                        const {field} = props;
                        return options.map(option => {

                            return (
                                <React.Fragment key={option.key}>
                                    <input
                                        type={'radio'}
                                        id={option.value}
                                        {...field}
                                        value={option.value}
                                        checked={
                                            field.value === option.value
                                        }
                                    />
                                    <label htmlFor={option.value}>{option.key}</label>
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
})
