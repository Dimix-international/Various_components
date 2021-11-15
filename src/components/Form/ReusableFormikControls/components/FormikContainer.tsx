import React from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import s from '../../UseFormikComponent.module.css'
import {FormikControl} from "./FormikControl";

type InitialValuesType = {
    email: string,
    description:string
    selectOptions:string
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

    const initialValues: InitialValuesType = {
        email: '',
        description: '',
        selectOptions: '',
    };

    const validationSchema = yup.object({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        selectOptions: yup.string().required('Обязательно'),
    });

    const onSubmit = (values: InitialValuesType, onSubmitProps:any) => {
        console.log('Form data', values);
        onSubmitProps.setSubmitting(false); //когда выполнился запрос раз disable кнопку submit
        onSubmitProps.resetForm(); //очищаем форму к первоначальному initialValues
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnMount={true}
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
