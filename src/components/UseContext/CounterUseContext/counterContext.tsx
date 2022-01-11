import {createContext, ReactNode, useContext, useMemo, useReducer} from "react";

export enum ActionsCounter {
    IncrementCount = 'increment-count',
    DecrementCount = 'decrement-count',
    Default = 'default'
}
type ActionType = {
    type: ActionsCounter;
}

export type StateType = {count: number};
export type DispatchType = (action: ActionType) => void
export type CounterCollectionContextType  = {state: StateType, dispatch: DispatchType}

type CounterReducerReturnType = {
    [key in ActionsCounter]: () => StateType
}

const CounterContext = createContext<
    CounterCollectionContextType | undefined>(undefined);

const counterReducer = (state: StateType, action: ActionType): StateType => {
    const incrementValue = () => {
        return {...state, count: state.count + 1}
    }

    const decrementValue = () => {
        return {...state, count: state.count - 1}
    }

    const actions = {
        'increment-count': incrementValue,
        'decrement-count': decrementValue,
        'default': () => state
    } as CounterReducerReturnType;

    return (actions[action.type] || actions['default'])();
}

export const CounterProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(counterReducer, {count: 0});

    const value = useMemo(() => ({state, dispatch}), [state])

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}
//вызов контекста и проверка что контекст должен использоваться внутри CounterProvider
export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) throw new Error('useCounter must be used inside a Counter');

    return context
}
