import './Counter.css'
import {ACTIONS_COUNTER, DispatchType} from "./counterContext";

export const Action = ({handler}:{handler: DispatchType}) => {
    return (
        <div className={'controls'}>
            <button onClick={() => handler({type: ACTIONS_COUNTER.INCREMENT_COUNT})} className={'counter'}>+</button>
            <button onClick={() => handler({type: ACTIONS_COUNTER.DECREMENT_COUNT})} className={'counter'}>-</button>
        </div>
    )
}