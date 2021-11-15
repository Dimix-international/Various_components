import React from "react";
import {Story} from "@storybook/react";
import {FormikComponent} from "./FormikComponent";

export default {
    title: 'components/Forms',
    component: FormikComponent,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story = (args) => <FormikComponent />;

export const MyForm = Template.bind({});



