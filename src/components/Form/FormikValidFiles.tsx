import React from "react";
import {Formik, FieldArray} from 'formik'; //FieldArray - для работы с файлами
import * as yup from 'yup';
import s from './Formik.module.css'

type FileErrorsType = {
    file: string,
    type: string,
}

export const FormikValidFiles: React.FC<any> = (props) => {

    //валидация - переменная в которой хранится схема валидации

    const validationScheme = yup.object().shape({
        addressRegister: yup.string().required('Обязательно'),
        likeRegister: yup.boolean(),
        // Валидация зависимых данных - для валидации addressActual в зависимости от likeRegister - метод when
        addressActual: yup.string().when('likeRegister', {
            is: false,//будет смотреть на значение likeRegister , если likeRegister - false,
            // то сработает then - поле станет обязательным - и кнопка не будет disable
            then: yup.string().required('Обязательно')
        }),

        //валидация файла -является массивом, через метод of укажем что в нем содержится
        // в of добавляем новую схему т.к. file -объект
        file: yup.array().of(yup.object().shape({
            //проверяем что явл файлом ,.test - проверим размер файла
            file: yup.mixed().test('fileSize', 'Размер файла больше 15 килобайт', (value: File) => {
                if (!value) return false //если нету файла
                return value.size < 15360 //true если размер меньше 15 килобайт // в одном килобайте 1024 байт
            }).required(),

            //проверяем mime type документов (гуглим mime type pdf), oneOf [] -  перечислим типы, которые нам подходят
            type: yup.string().oneOf(["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], 'Добавьте файл верного формата').required(),

            name: yup.mixed().required(),

        }).typeError('Добавьте файл'))
    })

    //функция для обработки файла, чтобы передать его в виде объекта
    const getFileScheme = (file: File | null) => file && ({
        file: file,
        type: file.type,
        name: file.name
    })

    //в файле  fileErrors лежит объект, преобразуем ео для печати (преобразуем в массив строк)
    const getArrErrorsMessages = (errors: any) => {
        const result: any = [];

        errors && Array.isArray(errors) && errors.forEach((value) => {
            //errors  может содержать  как объект ошибок так и  строки с ошибками
            if (typeof value === 'string') {
                result.push(value)
            } else {
                //если объект
                Object.values(value).forEach(error => {
                    result.push(error)
                })
            }
        })
        return result;
    }
    //функция для распечатки ошибок
    const getError = (touched: boolean, error: string) => {
        return touched && error &&
            <p key={error} className={s.error}>{error}</p>
    }

    return (
        <div>
            <Formik
                initialValues={{
                    addressRegister: '',
                    likeRegister: false,
                    addressActual: '',
                    file: undefined,
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
                            <label className={s.label}
                                   htmlFor={'addressRegister'}>Адрес
                                регистрации</label>
                            <input
                                id={'addressRegister'}
                                className={s.input}
                                type={'text'}
                                name={'addressRegister'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.addressRegister}
                            />
                            {/*покажем ошибку, если есть*/}
                            {touched.addressRegister && errors.addressRegister &&
                            <p className={s.error}>{errors.addressRegister}</p>}
                        </div>
                        <div
                            className={`${s.form__item} ${s.form__item_checkbox}`}>
                            <label className={s.label}
                                   htmlFor={'likeRegister'}>Адреса
                                совпадают</label>
                            <input
                                id={'likeRegister'}
                                className={s.checkbox}
                                type={'checkbox'}
                                name={'likeRegister'} //совпадать с initialValues
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.likeRegister}
                            />
                        </div>
                        {
                            !values.likeRegister &&
                            <div className={s.form__item}>
                                <label className={s.label}
                                       htmlFor={'addressActual'}>Адрес
                                    проживания</label>
                                <input
                                    id={'addressActual'}
                                    className={s.input}
                                    type={'text'}
                                    name={'addressActual'} //совпадать с initialValues
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.addressActual}
                                />
                                {/*покажем ошибку, если есть*/}
                                {touched.addressActual && errors.addressActual &&
                                <p className={s.error}>{errors.addressActual}</p>}
                            </div>
                        }
                        {console.log('file', values.file)}
                        {console.log('fileErrors', errors.file)}
                        <FieldArray name={'file'}>
                            {arrayHelper => (
                                <div className={s.form__item}>
                                    <input
                                        className={`${s.input} ${s.input_file}`}
                                        type={'file'}
                                        name={'file'} //совпадать с initialValues
                                        onChange={event => {
                                            const {files} = event.target;
                                            if (files) {
                                                const file = getFileScheme(files.item(0)); //1-sый файл
                                                if (!file) {
                                                    //выбрали файл, после зашли в выбор и ничего не выбрали - удаляем файл из выбора предыдущий
                                                    arrayHelper.remove(0);
                                                }
                                                //проверим хранится ли массив
                                                if (Array.isArray(values.file)) {
                                                    arrayHelper.replace(0, file);
                                                } else {
                                                    arrayHelper.push(file)
                                                }
                                            }
                                        }}
                                    />
                                    {errors.file && getArrErrorsMessages(errors.file).map((error: string) => getError(true, error))}
                                </div>
                            )}
                        </FieldArray>
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