import React, {} from "react";
import {Story} from "@storybook/react";
import {ClocksPropsType} from "./Clock";
import {MyTimeout} from "./MyTimeout";

export default {
    title: 'components/MyTimeout',
    component: MyTimeout,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story<ClocksPropsType> = (args) => <MyTimeout   />;

export const Timeout = Template.bind({});

