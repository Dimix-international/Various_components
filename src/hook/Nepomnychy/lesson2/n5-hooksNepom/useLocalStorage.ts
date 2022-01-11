import {useEffect, useState} from "react";

type LocalStorageType = {
    initialValue:Array<any>
    key:string
}
export const useLocalStorage = (props:LocalStorageType) => {

    const {initialValue, key} = props;

    const getValue = () => {
        const storage = localStorage.getItem(key); //string or null

        if(storage) {
            return JSON.parse(storage);
        }
        return initialValue;
    }
    const [value, setValue] = useState(getValue);

    const clear = () => {
        setValue([])
    }

    //когда значение будут меняться, будем их перезаписывать
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[value, key])

    return {value, setValue, clear}

}