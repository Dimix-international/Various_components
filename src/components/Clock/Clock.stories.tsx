import React, {useEffect, useState} from "react";
import {action} from "@storybook/addon-actions";
import {Story} from "@storybook/react";
import {Clock, ClocksPropsType} from "./Clock";

export default {
    title: 'components/Clock',
    component: Clock,
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
const Template: Story<ClocksPropsType> = (args) => <Clock  {...args}  />;

export const MyClock = Template.bind({});

