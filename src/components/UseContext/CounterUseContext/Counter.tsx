import './Counter.css'
import {Display} from "./Display";
import {Action} from "./Action";
import {useCounter} from "./counterContext";

export const Counter = () => {

    const {state, dispatch} = useCounter()
    return (
        <>
            <Display {...state}/>
            <Action handler={dispatch}/>
        </>
    )
}