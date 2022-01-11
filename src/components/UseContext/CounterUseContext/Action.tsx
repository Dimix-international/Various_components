import './Counter.css'
import {ActionsCounter, DispatchType} from "./counterContext";

export const Action = ({handler}:{handler: DispatchType}) => {
    return (
        <div className={'controls'}>
            <button onClick={() => handler({type: ActionsCounter.IncrementCount})} className={'counter'}>+</button>
            <button onClick={() => handler({type: ActionsCounter.DecrementCount})} className={'counter'}>-</button>
        </div>
    )
}