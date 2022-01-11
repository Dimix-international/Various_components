import {useState} from "react";


export const useToggle = (initValue:boolean = false) => {

    const[isVisible, setVisible] = useState(initValue);

    const onClick = () => {
        setVisible(!isVisible)
    }
    return {
        isVisible,
        onClick
    }

}