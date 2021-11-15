import React from "react";
import {Story} from "@storybook/react";
import {ReusableFormikControls} from "./ReusableFormikControls";


export default {
    title: 'components/UseFormik',
    component: ReusableFormikControls,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story = (args) => <ReusableFormikControls />;

export const ReusableControls = Template.bind({});



