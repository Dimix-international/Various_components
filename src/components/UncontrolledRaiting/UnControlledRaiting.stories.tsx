import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story, Meta} from '@storybook/react';

import {RaitingType, RatingProps, UncontrolledRaiting} from './UncontrolledRaiting';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/UncontrolledRaiting',
    component: UncontrolledRaiting,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
}as Meta;
const callback = action('rating changed')
const Template: Story<RatingProps> = (args) => <UncontrolledRaiting {...args}

/>;

export const RatingWithDefault = Template.bind({});
RatingWithDefault.args = {
    defaultValue: 4,
    onChange: callback
}