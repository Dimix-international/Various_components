import React from "react";
import {Story} from "@storybook/react";
import {UseFormikComponent} from "./UseFormikComponent";

export default {
    title: 'components/UseFormik',
    component: UseFormikComponent,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story = (args) => <UseFormikComponent />;

export const MyFormik = Template.bind({});



