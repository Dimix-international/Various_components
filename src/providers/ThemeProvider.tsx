import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction, useContext, useMemo,
    useReducer
} from "react";


/*type SetStateType<T> = Dispatch<SetStateAction<T>>*/

export type ThemeType = 'Light' | 'Dark'
type ActionType = {
    type: ThemeType
}

const defaultState = {
    theme: 'Light'
}
type StateType = typeof defaultState;

interface IContextTheme {
    state: typeof defaultState,
    dispatch: (action: ActionType) => void
}


const ThemeContext = createContext<IContextTheme | undefined>(undefined);

const themeReducer = (state: StateType, action: ActionType): StateType => {

    const actions = {
        'Light': () => ({...state, theme: 'Dark'}),
        'Dark': () => ({...state, theme: 'Light'}),
        'default': () => state
    }
    return (actions[action.type] || actions['default'])();
}

export const ThemeProvider = ({children}: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(themeReducer, defaultState);

    /*!! обязательно функции передаваемые в useCallback,  а параметры в useMemo*/
    const value = useMemo(() => ({state, dispatch}),[state])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
    return context
}
