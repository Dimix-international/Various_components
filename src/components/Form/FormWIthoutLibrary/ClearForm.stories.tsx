import React from "react";
import {Story} from "@storybook/react";
import {ClearForm} from "./ClearForm";


export default {
    title: 'components/Forms',
    component: ClearForm,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story = (args) => <ClearForm />;

export const MyFormWithoutLibrary = Template.bind({});


