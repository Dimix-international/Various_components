import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import UncontrolledAccordion, {AccordionPropsType} from './UncontrolledAccordion';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/UncontrolledAccordion',
    component: UncontrolledAccordion,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
const Template: Story<AccordionPropsType> = (args) => <UncontrolledAccordion {...args} />;

export const AccordionWithoutControl = Template.bind({});
AccordionWithoutControl.args = {
    titleValue: 'Users' ,
};


