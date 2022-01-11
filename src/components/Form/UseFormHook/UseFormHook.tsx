import {useForm, useFormState, useWatch} from "react-hook-form";
import {useEffect, useState} from "react";

type FormValuesType = {
    firstName: string,
    lastName: string,
    age: number,
}

const Controller = ({control, register, name, rules, render}: any) => {
    const props = register(name, rules);

    const value = useWatch({
        control,
        name
    });

    const {errors} = useFormState({
        control,
        name
    });


    return render({
        value,
        onChange: (e:any) => props.onChange({
            target: {
                name,
                value: e.target.value
            }
        }),
        onBlur: props.onBlur,
        name: props.name
    });
}

const Input = (props:any) => {
    const[value, setValue] = useState(props.value || '');

    useEffect(() => {
        setValue(props.value)
    },[props.value])

    return (
        <input
            type="text"
            value={value}
            onChange={e => {
                setValue(e.target.value);
                props.onChange && props.onChange(e)
            }}
        />
    )
}

export const UseFormHook = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors}
    } = useForm<FormValuesType>({
        defaultValues: {
            firstName: '',
            lastName: '',
            age: 0,
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setValue('lastName', 'test')
        },1000)
    },[setValue])

    return (
        <div>
            <form onSubmit={handleSubmit((data) =>
                console.log(data))}
            >
                <input {...register('firstName', {required: 'this is required'})}
                 placeholder={'first name'}/>
                {/*<input {...register('lastName', {
                    maxLength: {
                        value: 5,
                        message: 'Max 5 symbols!'
                    }
                })} placeholder={'last name'}/>*/}
                {/*<input type="number" {...register('age', {
                    valueAsNumber: true
                })}/>*/}

                <Controller {...{
                    control,
                    register,
                    name:'lastName',
                    rules: {
                        required: true,
                    },
                        render:(props:any) => <Input {...props}/>}}/>
                <button type={'submit'}>submit</button>
            </form>
        </div>
    )
}