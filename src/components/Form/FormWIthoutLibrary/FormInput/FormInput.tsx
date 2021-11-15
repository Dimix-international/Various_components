import React, {
    ChangeEvent,
    FocusEvent,
    useState
} from "react";
import s from './FormInput.module.css'
import {InputType} from "../ClearForm";

type FormInputType = InputType & {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const FormInput: React.FC<FormInputType> = (props) => {

    /*const {id,name, type, placeholder, label, value, onChange, errorMessage, required, pattern} = props;*/
    const {id, label, onChange, errorMessage, ...inputProps} = props;

    const[focused, setFocused] = useState(false);

    const onBlurHandler = (e:FocusEvent<HTMLInputElement>) => {
        if(e.currentTarget.dataset.focused) {
            setFocused(true);
        }
    }
    return (
        <div className={s.formInput}>
            <label className={s.label} htmlFor={id}>{label}</label>
            <input
                /*id={id}
                name={name}
                className={s.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}*/
                {...inputProps}
                className={s.input}
                onChange={onChange}
                onBlur={onBlurHandler}
                onFocus={() => inputProps.name === 'confirmPassword' && setFocused(true)}
                data-focused={focused.toString()}
            />
            <span className={s.error}>{errorMessage}</span>
        </div>
    )
}