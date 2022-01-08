import {
    createContext,
    ReactNode,
    useContext,
    useReducer
} from "react";

export enum ACTIONS_COUNTER {
    INCREMENT_COUNT = 'INCREMENT_COUNT',
    DECREMENT_COUNT = 'DECREMENT_COUNT',
}

type ActionType = {
    type: ACTIONS_COUNTER
}

const defaultState = {count: 0};
export type StateType = typeof defaultState;
export type DispatchType = (action: ActionType) => void


const CounterContext = createContext<{ state: StateType, dispatch: DispatchType }
    | undefined>(undefined);

const counterReducer = (state: StateType, action: ActionType): StateType => {

    const actions = {
        [`${ACTIONS_COUNTER.INCREMENT_COUNT}`]: () => incrementValue(state),
        [`${ACTIONS_COUNTER.DECREMENT_COUNT}`]: () => decrementValue(state),
        'default': () => state
    }

    return (actions[action.type] || actions['default'])();
}

export const CounterProvider = ({children}: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(counterReducer, defaultState);

    return (
        <CounterContext.Provider value={{state, dispatch}}>
            {children}
        </CounterContext.Provider>
    )
}
//вызов контекста и проверка что контекст должен использоваться внутри CounterProvider
export const useCounter = () => {

    const context = useContext(CounterContext);
    if (!context) throw new Error('useCounter must be used inside a Counter')
    return context
}

const incrementValue = (state: StateType) => {
    return {...state, count: state.count + 1}
}

const decrementValue = (state: StateType) => {
    return {...state, count: state.count - 1}
}