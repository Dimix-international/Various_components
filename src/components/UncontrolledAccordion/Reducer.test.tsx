import {ACTIONS_TYPE, reducer, StateType} from "./Reducer";

test('value should be change on opposite value', () => {

    const state: StateType = {
        collapsed: false
    }
    const newState = reducer(state, {type: ACTIONS_TYPE.TOGGLE_COLLAPSED});
    expect(newState.collapsed).toBe(true)
})
test('should be equal old state', () => {

    const state: StateType = {
        collapsed: false
    }
    const newState = reducer(state, {type: 'FAKE'});
    expect(newState).toEqual(state)
})