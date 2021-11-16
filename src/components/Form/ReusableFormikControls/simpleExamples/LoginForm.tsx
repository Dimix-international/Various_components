import React from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import s from '../../UseFormikComponent.module.css'
import {FormikControl} from "../components/FormikControl";

type LoginFormType = {
    email: string,
    password: string
}
export const LoginForm = (props: any) => {
    const initialValues: LoginFormType = {
        email: '',
        password: '',
    }
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required')
    })
    const onSubmit = (values: LoginFormType, onSubmitProps: any) => {
        console.log(values);
        onSubmitProps.setSubmitting(false); //когда выполнился запрос раз disable кнопку submit
        onSubmitProps.resetForm(); //очищаем форму к первоначальному initialValues
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => (
                    <Form>
                        <FormikControl
                            control={'input'}
                            name={'email'}
                            type={'email'}
                            label={'Email'}
                        />
                        <FormikControl
                            control={'input'}
                            name={'password'}
                            type={'password'}
                            label={'Password'}
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