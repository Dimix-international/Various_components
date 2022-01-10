import {useCallback, useRef} from "react";


type UlbiDebounceType = {
    delay:number,
    callback:() => void
}

export const useUlbiDebounce = (props:UlbiDebounceType) => {

    const {callback, delay} = props;

    const timer = useRef<any>();

    const debounceCallback = useCallback((...args) => {

        //логика создаем таймаут, и если функция вызвалась
        // быстрее чем задержка, то мы очищаем таймаут
        // и запускаем заново, и когда пользователь
        // остановился писать - вызывается переданный callback

        if(timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            //@ts-ignore
            callback(...args)
        },delay)

    },[callback, delay])

    return debounceCallback
}