import React, {ChangeEvent, FormEvent, useState} from "react";
import s from './ClearForm.module.css'
import {FormInput} from "./FormInput/FormInput";


type initialValues = {
    username: string,
    email: string,
    birthday: string,
    password: string,
    confirmPassword: string
}

export type InputType = {
    id: string,
    name: string,
    type: string,
    placeholder: string,
    label: string
    errorMessage?: string
    required?: boolean
    pattern?: string
}


export const ClearForm: React.FC<any> = (props) => {

    const [values, setValues] = useState<initialValues>({
        username: '',
        email: '',
        birthday: '',
        password: '',
        confirmPassword: ''
    })


    const inputs: Array<InputType> = [
        {
            id: '1',
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username',
            errorMessage: "Username should be 3-16 characters and and shouldn't include any special character!",
            required: true,
            pattern: "^[A-Za-z0-9]{3,16}$",
        },
        {
            id: '2',
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            errorMessage: ' It should be a valid email address!',
            required: true,
        },
        {
            id: '3',
            name: 'birthday',
            type: 'date',
            placeholder: 'Birthday',
            label: 'Birthday',
            required: true,
        },
        {
            id: '4',
            name: 'password',
            type: 'password',
            placeholder: '123asdf!@#',
            label: 'Password',
            errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 characters!',
            required: true,
            pattern: "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{8,20}$",
        },
        {
            id: '5',
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'confirm password',
            label: 'Confirm password',
            errorMessage: "Password doesn't match!",
            required: true,
            pattern: values.password //проверка на совпадение паролей
        },
    ]


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
    }

    return (
        <div className={s.app}>
            <form className={s.form} onSubmit={handleSubmit}>
                {
                    inputs.map(i => (
                        <FormInput
                            key={i.id}
                            {...i}
                            value={values[i.name as keyof initialValues]}
                            onChange={onChangeHandler}
                        />
                    ))
                }
                <button className={s.btn}>Submit</button>
            </form>
        </div>
    )
}