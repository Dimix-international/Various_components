import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {SelectDim, SelectPropsType} from './SelectDim';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/SelectDim',
    component: SelectDim,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
const callback = action('the event was happen')
const Template: Story<SelectPropsType> = (args) => <SelectDim {...args} />;


export const SelectExampleWithValue = () => {
    let[value, setValue] = useState('3');
    return(
        <SelectDim
            id={value}
            onChange={setValue}
            items={[
                {id: '1', title: 'Minsk'},
                {id: '2', title: 'London'},
                {id: '3', title: 'Tokyo'},
                {id: '4', title: 'Paris'},
            ]}
        />
    )
}

export const SelectExampleWithoutValue = () => {
    let[value, setValue] = useState(null);
    return(
        <SelectDim
            id={value}
            onChange={setValue}
            items={[
                {id: '1', title: 'Minsk'},
                {id: '2', title: 'London'},
                {id: '3', title: 'Tokyo'},
                {id: '4', title: 'Paris'},
            ]}
        />
    )
}


