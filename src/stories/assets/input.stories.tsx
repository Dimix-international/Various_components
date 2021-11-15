import React, {ChangeEvent, useRef, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/input',
};

export const UncontrolledInput = () => <input/>
export const TrackValueUncontrolledInput = () => {
    const [value, setValue] = useState('');

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <input
                type="text"
                onChange={changeValue}
            />
            {value}
        </div>
    )
}
export const GetValueUncontrolledInputByButtonPress = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const save = () => {
        const el = inputRef.current as HTMLInputElement;
        setValue(el.value)
    }
    return (
        <div>
            <input ref={inputRef}/>
            <button onClick={save}>save</button>
            - actual value : {value}
        </div>
    )
}


export const ControlledInput = () => {
    const [parentValue, setParentValue] = useState<string>('');
    const changeValue= (e:ChangeEvent<HTMLInputElement>) => {
        setParentValue(e.currentTarget.value)
    }
    return (
        <input
            value={parentValue}
            onChange={changeValue}
        />
    )
}
export const ControlledCheckbox = () => {
    const[checked, setChecked] = useState<boolean>(false);
    const changeCheckbox = (e:ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked);
    }
    return <input
        type="checkbox"
        checked={checked}
        onChange={changeCheckbox}
    />
}
export const ControlledSelect = () => {
    const[parentValue, setParentValue] = useState<string | undefined>(undefined)
    const changeValue = (e:ChangeEvent<HTMLSelectElement>) => {
        setParentValue(e.currentTarget.value)
    }
   return (
       <select value={parentValue} onChange={changeValue}>
           <option >none</option>
           <option value="1">Minsk</option>
           <option value="2">Gomel</option>
           <option value="3">Brest</option>
       </select>
   )
}

