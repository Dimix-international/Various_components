import {ChangeEvent,FocusEvent, useCallback, useState} from "react";

type InputType = {
    initValue: string
    required?:boolean
}
export const InputMininHook = (props: InputType) => {

    const {initValue, required} = props;

    const [currentValue, setCurrentValue] = useState(initValue);
    const [error, serError] = useState<string | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
        serError(null)
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        if(!e.target.value && required) serError('Required field!')
        else serError(null)
    }

    const clear = useCallback(() => {
        setCurrentValue('');
    },[])

    return {
        bind: { //чтобы input получал только нужные свойства
            value: currentValue,
            onChange,
            onBlur,
        },
        value: currentValue,
        clear,
        error,
    }

}