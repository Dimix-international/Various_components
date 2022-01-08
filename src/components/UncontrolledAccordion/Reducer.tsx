type ActionType = {
    type: string
}
export type StateType = {
    collapsed: boolean
}

export enum ACTIONS_TYPE {
    TOGGLE_COLLAPSED = 'TOGGLE-COLLAPSED'
}

export const reducer = (state: StateType, action: ActionType): StateType => {
    /*switch (action.type) {
        case ACTIONS_TYPE.TOGGLE_CONSTANT: {
            return {...state, collapsed:!state.collapsed }
        }
        default:
            throw new Error('bad action type')
    }*/

    const act = {
        [`${ACTIONS_TYPE.TOGGLE_COLLAPSED}`]: () => toggleFn(state),
        'default': () => state
    };

    return (act[action.type] || act['default'])();
}

const toggleFn = (state: StateType) => {
    return {...state, collapsed: !state.collapsed}
}