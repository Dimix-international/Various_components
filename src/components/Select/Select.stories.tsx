import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {Select, SelectPropsType} from './Select';

export default {
    title: 'components/Select',
    component: Select,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story<SelectPropsType> = (args) => <Select {...args} />;

export const ModeSelect = () => {
    let[valueSelect, setValueSelect] = useState<string | null>('2');
    return (
        <Select
            value={valueSelect}
            setValueSelect={setValueSelect}
            items={[
                {id:'1', name: 'Minsk'},
                {id:'2', name: 'Gomel'},
                {id:'3', name: 'Brest'},
                {id:'4', name: 'London'},
            ]}
        />
    )
}


