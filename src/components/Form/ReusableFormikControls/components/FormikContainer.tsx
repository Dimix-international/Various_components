import React from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import s from '../../UseFormikComponent.module.css'
import {FormikControl} from "./FormikControl";

type InitialValuesType = {
    email: string,
    description: string
    selectOptions: string
    radioOption: string
    checkboxOption: Array<string>
    birthDay: string | null
}
export type DropdownOptionsType = {
    key: string,
    value: string,
}
export const FormikContainer = (props: any) => {

    const dropdownOptions: Array<DropdownOptionsType> = [
        {key: 'Select an option', value: ''},
        {key: 'Option 1', value: 'option1'},
        {key: 'Option 2', value: 'option2'},
        {key: 'Option 3', value: 'option3'},
    ]

    const radioOptions: Array<DropdownOptionsType> = [
        {key: 'Option 1.1', value: 'rOption1'},
        {key: 'Option 2.2', value: 'rOption2'},
        {key: 'Option 3.3', value: 'rOption3'},
    ]

    const checkboxOptions: Array<DropdownOptionsType> = [
        {key: 'Option 1', value: 'cOption1'},
        {key: 'Option 2', value: 'cOption2'},
        {key: 'Option 3', value: 'cOption3'},
    ]
    const initialValues: InitialValuesType = {
        email: '',
        description: '',
        selectOptions: '',
        radioOption: '',
        checkboxOption:[],
        birthDay: null,
    };
    const validationSchema = yup.object({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        selectOptions: yup.string().required('Обязательно'),
        radioOption: yup.string().required('Обязательно'),
        checkboxOption: yup.array().required('Обязательно'),
        birthDay: yup.date().required('Обязательно').nullable(),//nullable - установит null если надо
    });

    const onSubmit = (values: InitialValuesType, onSubmitProps: any) => {
        console.log('Form data', values);
        console.log('Saved data data', JSON.parse(JSON.stringify(values))); //чтобы превратить дату из строки в объект

        onSubmitProps.setSubmitting(false); //когда выполнился запрос раз disable кнопку submit
        onSubmitProps.resetForm(); //очищаем форму к первоначальному initialValues
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnMount
        >
            {
                formik => (
                    <Form>
                        <FormikControl
                            control={'input'}
                            type={'email'}
                            label={'Email'}
                            name={'email'}
                        />
                        <FormikControl
                            control={'textarea'}
                            type={'textarea'}
                            label={'Description'}
                            name={'description'}
                        />
                        <FormikControl
                            control={'select'}
                            type={'select'}
                            label={'Select a topic'}
                            name={'selectOptions'}
                            options={dropdownOptions}
                        />
                        <FormikControl
                            control={'radio'}
                            type={'radio'}
                            label={'Radio topic'}
                            name={'radioOption'}
                            options={radioOptions}
                        />
                        <FormikControl
                            control={'checkbox'}
                            type={'checkbox'}
                            label={'Checkbox topic'}
                            name={'checkboxOption'}
                            options={checkboxOptions}
                        />
                        <FormikControl
                            control={'date'}
                            label={'Pick a date'}
                            name={'birthDay'}
                        />
                        <button
                            className={s.btn}
                            type={'submit'}
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                )

            }
        </Formik>
    )
}
