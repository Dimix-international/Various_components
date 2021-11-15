import React from "react";
import {Story} from "@storybook/react";
import {FormikValidFiles} from "./FormikValidFiles";

export default {
    title: 'components/Forms',
    component: FormikValidFiles,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story = (args) => <FormikValidFiles />;

export const ValidationsFiles = Template.bind({});


