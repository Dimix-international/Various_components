import {ChangeEvent, useCallback, useState} from "react";

type InputType = {
    initValue: string
}
export const InputMininHook = (props: InputType) => {

    const {initValue} = props;

    const [currentValue, setCurrentValue] = useState(initValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
    }

    const clear = useCallback(() => {
        setCurrentValue('');
    },[])

    return {
        bind: { //чтобы input получал только нужные свойства
            value: currentValue,
            onChange,
        },
        value: currentValue,
        clear
    }

}