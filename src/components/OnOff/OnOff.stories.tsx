import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {OnOff, OnOffType} from './OnOff';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/OnOff',
    component: OnOff,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
const callback = action('on off works')
const Template: Story<OnOffType> = (args) => <OnOff  {...args}  />;

export const OnOffMode = Template.bind({});
OnOffMode.args = {
    onChange: callback,
    defaultOn: true,
};
export const DefaultInputValue = () => <input defaultValue={'yo'}/>
