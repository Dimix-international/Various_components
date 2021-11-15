import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {OnOffType, OnOffWithControl} from './OnOffWithControl';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/OnOffWithControl',
    component: OnOffWithControl,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
const callback = action('on or off clicked')
const Template: Story<OnOffType> = (args) => <OnOffWithControl {...args} />;

export const OnMode = Template.bind({});
OnMode.args = {
    on: true ,
    onChange: callback
};
export const OffMode = Template.bind({});
OnMode.args = {
    on: false ,
    onChange: callback
};

export const ModeChanging = () => {
    const[mode, setMode] = useState<boolean>(false);
    return <OnOffWithControl on={mode} onChange={setMode} />
}
