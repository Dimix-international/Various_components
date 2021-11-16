import React from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import s from '../../UseFormikComponent.module.css'
import {FormikControl} from "../components/FormikControl";

type RegistrationFormType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    contactOption: string,
    phone: string
}
type ContactOptionType = {
    key: string,
    value: string
}
export const RegistrationForm: React.FC<{}> = React.memo(props => {
    const initialValues: RegistrationFormType = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactOption: '',
        phone: '',
    }
    const contactOptions: Array<ContactOptionType> = [
        {key: 'Email', value: 'emailmoc'},
        {key: 'Telephone', value: 'telephonemoc'},
    ]

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        email: yup.string().email('Invalid email format').required('Required'),
        password: yup.string().min(3, 'need more characters').max(7).required('Required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required'),
        contactOption: yup.string().required('Required'),

        phone: yup.number().when('contactOption', {
            is: 'telephonemoc',
            then: yup.number().required('Required'),
        }),
    })

    const onSubmit = (values: RegistrationFormType, onSubmitProps: any) => {
        console.log(values);
        onSubmitProps.setSubmitting(false); //когда выполнился запрос раз disable кнопку submit
        onSubmitProps.resetForm(); //очищаем форму к первоначальному initialValues
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>

            {
                formik => (
                    <Form>
                        <FormikControl
                            control={'input'}
                            name={'name'}
                            label={'Name'}
                            type={'text'}
                        />
                        <FormikControl
                            control={'input'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                        />
                        <FormikControl
                            control={'input'}
                            name={'password'}
                            label={'Password'}
                            type={'password'}
                        />
                        <FormikControl
                            control={'input'}
                            name={'confirmPassword'}
                            label={'Confirm password'}
                            type={'password'}
                        />
                        <FormikControl
                            control={'radio'}
                            type={'radio'}
                            name={'contactOption'}
                            label={'Mode of contact'}
                            options={contactOptions}
                        />
                        {formik.values.contactOption === 'telephonemoc'
                            ? <FormikControl
                                control={'input'}
                                type={'text'}
                                name={'phone'}
                                label={'Phone number'}
                            />
                            : false
                        }
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
})
