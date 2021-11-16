//------useFormik---
/*import React from "react";
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import s from './UseFormikComponent.module.css'

type InitialValuesType = {
    name: string,
    email: string,
    channel: string,
}
const initialValues: InitialValuesType = {
    name: '',
    email: '',
    channel: '',
}
const onSubmit = (values: InitialValuesType) => {
    console.log(values)
}

const validationSchema = yup.object({
    name:yup.string().required('Required'),
    email:yup.string().email('Invalid email format').required('Required'),
    channel:yup.string().required('Required'),
})

export const UseFormikComponent: React.FC<any> = (props) => {

    const formik = useFormik({
        initialValues,
        onSubmit,
       // validate,
        validationSchema //используем схему yup валидации
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form__body}>
                    <div className={s.form__item}>
                        <label className={s.label} htmlFor="name">Name</label>
                        <input
                            className={s.input}
                            type="text"
                            id={'name'}
                            //name={'name'}
                            /!*onBlur={formik.handleBlur}//чтобы можно было проверять на ошибки когда убрали курсор
                            onChange={formik.handleChange}
                            value={formik.values.name}*!/
                            {...formik.getFieldProps('name')}
                        />
                        {/!*formik.touched.name - если не написать, то убрав курсор, ошибка появится на всех полях*!/}
                        {formik.touched.name && formik.errors.name && <span className={s.error}>{formik.errors.name}</span>}
                    </div>

                    <div className={s.form__item}>
                        <label className={s.label} htmlFor="email">Email</label>
                        <input
                            className={s.input}
                            type="email"
                            id={'email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <span className={s.error}>{formik.errors.email}</span>}
                    </div>

                    <div className={s.form__item}>
                        <label className={s.label}
                               htmlFor="channel">Channel</label>
                        <input
                            className={s.input}
                            type="text"
                            id={'channel'}
                            {...formik.getFieldProps('channel')}
                        />
                        {formik.touched.channel && formik.errors.channel && <span className={s.error}>{formik.errors.channel}</span>}
                    </div>

                    <button className={s.btn} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}*/

//---------Formik------

import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik';
import * as yup from 'yup';
import s from './UseFormikComponent.module.css'
import {TextError} from "./TextError";

type InitialValuesType = {
    name: string,
    email: string,
    channel: string,
    comments: string,
    address: string,
    social: {
        facebook: string,
        twitter: string
    },
    phoneNumbers: string [],
    phNumbers: string [],
}

const initialValues: InitialValuesType = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: '',
    },
    phoneNumbers: ['', '',],
    phNumbers: [''],
}

const savedValues: InitialValuesType = {
    name: 'Dimon',
    email: 'd@mail.ru',
    channel: 'youTube',
    comments: 'superGood!',
    address: 'Minsk cyty',
    social: {
        facebook: 'facebook.com',
        twitter: 'twitter.com',
    },
    phoneNumbers: ['123', '456',],
    phNumbers: [''],
}

const onSubmit = (values: InitialValuesType, onSubmitProps: any) => {
    console.log('values', values)
    console.log('onSubmitProps', onSubmitProps);
    onSubmitProps.setSubmitting(false); //когда выполнился запрос раз disable кнопку submit

    onSubmitProps.resetForm(); //очистка формы после нажатия submit - к initial state
}

const validationSchema = yup.object({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email format').required('Required'),
    channel: yup.string().required('Required'),
})

const validateComments = (value: any) => {
    let error;
    if (!value) {
        error = 'My Required!'
    }
    return error;
}

export const UseFormikComponent: React.FC<any> = (props) => {

    const[formValues, setFormValues]  = useState<InitialValuesType | null>(null);

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            //3 сценария ошибку - onChange, onBlur onSubmit
            //validateOnBlur={false} //отключили валидацию на событе onBlur

            //кнопка submit будет изначально disabled, пока обязательные поля не будут заполнены
            // не используем, если используем параметр dirty в button
            validateOnMount={true}

            //решает можно ли изменить initialValues на formValues, по умолч  false
            enableReinitialize={true}
        >
            {
                formik => {
                    console.log('formik props', formik)
                    return (
                        <Form> {/*<form onSubmit={formik.handleSubmit}>*/}
                            <div className={s.form__body}>
                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="name">Name</label>
                                    <Field  /* вместо input*/
                                        className={s.input}
                                        type="text"
                                        id={'name'}
                                        name={'name'}
                                        /*{...formik.getFieldProps('name')} больше не нужно т.к. используем Field*/
                                    />
                                    {/*formik.touched.name - если не написать, то убрав курсор, ошибка появится на всех полях*/}
                                    {/*{formik.touched.name && formik.errors.name && <span className={s.error}>{formik.errors.name}</span>}*/}
                                    <ErrorMessage name={'name'}
                                                  component={TextError}/>
                                </div>
                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="email">Email</label>
                                    <Field
                                        /* вместо input*/
                                        className={s.input}
                                        type="email"
                                        id={'email'}
                                        name={'email'}
                                    />
                                    {/*{formik.touched.email && formik.errors.email && <span className={s.error}>{formik.errors.email}</span>}*/}
                                    <ErrorMessage name={'email'}>
                                        {
                                            (errorMsg) => <span
                                                className={s.error}>{errorMsg}</span>
                                        }
                                    </ErrorMessage>
                                </div>
                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="channel">Channel</label>
                                    <Field
                                        className={s.input}
                                        type="text"
                                        id={'channel'}
                                        name={'channel'}
                                    />
                                    <ErrorMessage name={'channel'}
                                                  component={TextError}/>
                                </div>

                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="comments">Comments</label>
                                    <Field
                                        as={'textarea'} //можно написать component={'textarea'}
                                        id={'comments'}
                                        name={'comments'}
                                        className={s.input}
                                        validate={validateComments}
                                    />
                                    <ErrorMessage name={'comments'}
                                                  component={TextError}/>
                                </div>

                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="address">Address</label>
                                    <FastField
                                        //Field - компонента будет перерисовываться при изменении любого Field в форме
                                        //FastField - компонента не будет перерисовываться пока в ней не происходят изменения
                                        name={'address'}
                                    >
                                        {
                                            (props: any) => {
                                                console.log('props', props)
                                                const {
                                                    field,
                                                    form,
                                                    meta
                                                } = props;
                                                return (
                                                    <>
                                                        <input
                                                            type={'text'}
                                                            className={s.input}
                                                            id={'address'}
                                                            {...field}/>
                                                        {
                                                            meta.touched && meta.error
                                                                ?
                                                                <div>{meta.error}</div>
                                                                : null
                                                        }
                                                    </>
                                                )
                                            }
                                        }
                                    </FastField>
                                </div>

                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="facebook">Facebook
                                        profile</label>
                                    <Field
                                        className={s.input}
                                        type="text"
                                        id={'facebook'}
                                        name={'social.facebook'}
                                    />
                                </div>
                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="twitter">Twitter
                                        profile</label>
                                    <Field
                                        className={s.input}
                                        type="text"
                                        id={'twitter'}
                                        name={'social.twitter'}
                                    />
                                </div>

                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="primaryPh">Primary phone
                                        number</label>
                                    <Field
                                        className={s.input}
                                        type="text"
                                        id={'primaryPh'}
                                        name={'phoneNumbers[0]'}
                                    />
                                </div>
                                <div className={s.form__item}>
                                    <label className={s.label}
                                           htmlFor="secondPh">Second phone
                                        number</label>
                                    <Field
                                        className={s.input}
                                        type="text"
                                        id={'secondPh'}
                                        name={'phoneNumbers[1]'}
                                    />
                                </div>

                                <div className={s.form__item}>
                                    <label className={s.label}>List of phone
                                        numbers</label>
                                    <FieldArray name={'phNumbers'}>
                                        {
                                            (fieldArrayProps) => {
                                                // console.log('fieldArrayProps', fieldArrayProps);
                                                const {
                                                    push,
                                                    remove,
                                                    form
                                                } = fieldArrayProps;
                                                const {values} = form;
                                                const {phNumbers} = values as InitialValuesType;
                                                console.log('form errors', form.errors)
                                                return (
                                                    <div
                                                        className={s.containerWithBtn}>
                                                        {
                                                            phNumbers.map((ph, index) => (
                                                                <div key={index}
                                                                     className={s.input2}>
                                                                    <Field
                                                                        className={s.inputWithNumbers}
                                                                        name={`phNumbers[${index}]`}/>
                                                                    {
                                                                        //чтобы не было кнопки удаления, если одно поле
                                                                        index > 0 &&
                                                                        <button
                                                                            className={s.btnTwo}
                                                                            type={'button'}
                                                                            onClick={() =>
                                                                                remove(index)}>-</button>
                                                                    }
                                                                    <button
                                                                        className={s.btnTwo}
                                                                        type={'button'}
                                                                        onClick={() =>
                                                                            push('')}>+
                                                                    </button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        }
                                    </FieldArray>
                                </div>

                                {/*
                                <button
                                    className={`${s.btn} ${s.btnValid}`}
                                    type={'button'}
                                    validateField - отслеживает ошибку только поля comments
                                    onClick={() => formik.validateField('comments')}>
                                    Validate comments
                                </button>
                                <button
                                    className={`${s.btn} ${s.btnValid}`}
                                    type={'button'}
                                    validateForm - отслеживает ошибки всех полей
                                    onClick={() => formik.validateForm()}>
                                    Validate all
                                </button>
                                <button
                                    className={`${s.btn} ${s.btnValid}`}
                                    type={'button'}
                                    setFieldTouched - выведит ошибку поля comments, touched станет true
                                    onClick={() => formik.setFieldTouched('comments')}>
                                    Visit comments
                                </button>
                                <button
                                    className={`${s.btn} ${s.btnValid}`}
                                    type={'button'}
                                    setTouched - выведит ошибку всех перечислинных полей, touched станет true
                                    onClick={() => formik.setTouched({
                                        name: true,
                                        email: true,
                                        channel: true,
                                        comments: true,
                                    })}>
                                    Visis fields
                                </button>
                            */}

                                <button
                                    className={s.btn}
                                    type={'button'}
                                    //setFormValues - заполняет все поля формы
                                    onClick={() => setFormValues(savedValues)}
                                > Load saved data
                                </button>

                                {/*сброс к initial state*/}
                                <button className={s.btn} type={'reset'}>Reset</button>

                                {/* <button
                                    className={s.btn}
                                    //1) - если была ошибка в любом поле с валидацией, кнопка будет доступна, когда все поля будут заполнены верно
                                    // formik.dirty - дает true, если произошли любые изменение в форме( изначально false) по отношению к initialState
                                    // т.е. если изначально форма заполнена верными значения (в initialState) кнопка будет disable  - минус
                                    //disabled={!(formik.dirty && formik.isValid)} type="submit">

                                    //2) - если была ошибка в любом поле с валидацией, кнопка будет доступна, когда все поля будут заполнены верно,
                                    // в Formik написать validateOnMount={true}, чтобы изначально кнопка была disable
                                    disabled={!formik.isValid} type="submit">
                                    Submit
                                </button>*/}

                                <button
                                    className={s.btn}
                                    type="submit"
                                    //сценарий 2 - во время прогресса( запроса на сервер) disable - универсальная запись
                                    disabled={!formik.isValid || formik.isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )
                }
            }

        </Formik>
    )
}
