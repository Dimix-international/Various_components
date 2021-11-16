import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {Field, ErrorMessage} from 'formik';
import s from './FormikContainer.module.css'
import {TextError} from "./TextError";
import {DropdownOptionsType} from "./FormikContainer";

import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLElement>

// здесь мы говорим что у нашего textarea будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)


type RadioButtonsType =DefaultInputPropsType & {
    label?: string
    name: string,
    options?: Array<DropdownOptionsType> | []
}

export const DatePicker = React.memo((props: RadioButtonsType) => {

    const {label, name, ...restProps} = props;
    return (
        <div className={s.form__item}>
            <label className={s.label} htmlFor={name}>{label}</label>
            <Field  name={name}>
                {
                    ({form, field}:any) => {
                        const {setFieldValue} = form;
                        const {value} = field;
                        return <DateView
                            className={s.element}
                            id={name}
                            {...field}
                            {...restProps}
                            selected={value}
                            //setFieldValue - запонил поле name значением value
                            onChange={(value:string) => setFieldValue(name, value)}
                            //необязательные параметры
                            //1) формат вывода даты
                            dateFormat={'dd/MM/yyyy'}
                            //2) min и max дата - по умолч любой день
                            //minDate={new Date()} - даты прошедшие выбрать будет нельзя
                            //minDate={new Date()}
                            //maxDate={new Date()}} - даты будущее выбрать будет нельзя
                            //maxDate={new Date()}
                            // фильтрация
                            //будут доступны дни, кроме субботы и воскресенья
                            filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                            //конпка очистки даты, после выбора
                           // isClearable
                            //выподающий список дат
                            showYearDropdown
                            scrollableMonthYearDropdown

                        />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
})
