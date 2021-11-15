import {reducer, StateType, TOGGLE_CONSTANT} from "./Reducer";

test('value should be change on opposite value', () => {

    const state:StateType = {
        collapsed:false
    }
    const newState = reducer(state, {type:TOGGLE_CONSTANT});
    expect(newState.collapsed).toBe(true)
})
test('should be error', () => {

    const state:StateType = {
        collapsed:false
    }
    expect(() => {
        reducer(state, {type:'FAKE'});
    }).toThrowError()
})