import React from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import s from '../../UseFormikComponent.module.css'
import {FormikControl} from "../components/FormikControl";
type RegistrationFormType = {
    email: string,
    bio: string,
    course: string,
    skills: string [],
    courseDate: string | null
}
type OptionType = {
    key: string,
    value: string
}
export const RegistrationFormTwo: React.FC<{}> = React.memo(props => {
    const initialValues: RegistrationFormType = {
        email: '',
        bio: '',
        course: '',
        skills: [],
        courseDate: null,
    }
    const dropdownOptions: Array<OptionType> = [
        {key: 'Select your course', value: ''},
        {key: 'React', value: 'react'},
        {key: 'Angular', value: 'angular'},
        {key: 'Vue', value: 'vue'},
    ]
    const checkboxOptions: Array<OptionType> = [
        {key: 'HTML', value: 'html'},
        {key: 'CSS', value: 'css'},
        {key: 'JavaScript', value: 'javascript'},
    ]
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Required'),
        bio: yup.string().required('Required'),
        course: yup.string().required('Required'),
        courseDate: yup.date().required('Required').nullable(),
    })

    const onSubmit = (values: RegistrationFormType, onSubmitProps: any) => {
        console.log('Saved data data', JSON.parse(JSON.stringify(values)));
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
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                        />
                        <FormikControl
                            control={'textarea'}
                            name={'bio'}
                            label={'Bio'}
                        />
                        <FormikControl
                            control={'select'}
                            name={'course'}
                            label={'Course'}
                            options={dropdownOptions}
                        />
                        <FormikControl
                            control={'checkbox'}
                            name={'skills'}
                            label={'Your skills'}
                            options={checkboxOptions}
                        />
                        <FormikControl
                            control={'date'}
                            name={'courseDate'}
                            label={'Course date'}
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
})
