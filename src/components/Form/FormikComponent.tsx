import React from "react";
import {Formik} from 'formik';
import * as yup from 'yup';
import s from './Formik.module.css'


export const FormikComponent: React.FC<any> = (props) => {

    //валидация - переменная в которой хранится схема валидации
    const validationScheme = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        secondName: yup.string().typeError('Должно быть строкой').required('Обязательно'),

        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        //подтверждение пароля - должен ссылаться на пароль,  в [] указывается ссылка на значение поля password
        confirmPassword: yup.string().oneOf([yup.ref('password')],'Пароли не совпадают').required('Обязательно'),

        email: yup.string().email('Введите верный email').required('Обязательно'),
        confirmEmail: yup.string().email('Введите верный email').oneOf([yup.ref('email')],'Emails не совпадают').required('Обязательно'),
    })


    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    secondName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    confirmEmail: '',
                }}
                //валидация когда переходим на следующее поле
                validateOnBlur
                onSubmit={values => {
                    console.log(values)
                }}
                validationSchema={validationScheme} //схема валидации
            >
                {/*передаем children*/}
                {({
                      values,
                      errors,
                      touched, //показывает взаимодействовали ли с полем раньше,
                      handleChange, //вызывается каждый раз когда меняется значение формы
                      handleBlur, //вызывается каждый раз когда уходим из поля формы
                      isValid, //валидна ли форма в данный момент
                      handleSubmit, // вызывет функцию onSubmit
                      dirty,// изменялись ли когда нибудь значения в форме
                  }) => (
                    //возвращаем JSX
                    <div className={s.form}>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'name'}>Имя</label>
                            <input
                                id={'name'}
                                className={s.input}
                                type={'text'}
                                name={'name'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.name && errors.name && <p className={s.error}>{errors.name}</p>}
                        </div>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'secondName'}>Фамилия</label>
                            <input
                                id={'secondName'}
                                className={s.input}
                                type={'text'}
                                name={'secondName'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.secondName}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.secondName && errors.secondName && <p className={s.error}>{errors.secondName}</p>}
                        </div>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'password'}>Пароль</label>
                            <input
                                id={'password'}
                                className={s.input}
                                type={'password'}
                                name={'password'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.password && errors.password && <p className={s.error}>{errors.password}</p>}
                        </div>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'confirmPassword'}>Подтвердите пароль</label>
                            <input
                                id={'confirmPassword'}
                                className={s.input}
                                type={'password'}
                                name={'confirmPassword'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.confirmPassword && errors.confirmPassword && <p className={s.error}>{errors.confirmPassword}</p>}
                        </div>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'email'}>Email</label>
                            <input
                                id={'email'}
                                className={s.input}
                                type={'email'}
                                name={'email'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.email && errors.email && <p className={s.error}>{errors.email}</p>}
                        </div>
                        <div className={s.form__item}>
                            <label className={s.label} htmlFor={'confirmEmail'}>Подтвердите email</label>
                            <input
                                id={'confirmEmail'}
                                className={s.input}
                                type={'email'}
                                name={'confirmEmail'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmEmail}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.confirmEmail && errors.confirmEmail && <p className={s.error}>{errors.confirmEmail}</p>}
                        </div>
                        <button
                            className={s.button}
                            disabled={!isValid || !dirty} /*!dirty -никогда не меняли значени формы*/
                            onClick={() => handleSubmit()}
                            type="submit"
                        >
                            Отправить
                        </button>
                    </div>
                )}
            </Formik>
        </div>
    )
}