import {useEffect, useState} from "react";

type UseDebounceType = {
    value: string,
    delay: number
}
export const useDebounce = (props: UseDebounceType) => {

    const {delay, value} = props;

    const [debValue, setDebValue] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebValue(value)
        },delay);

        return () => {
            clearTimeout(id)
        }
    },[delay, value])

    return debValue

}