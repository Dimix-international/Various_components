import React from "react";
import {Story} from "@storybook/react";

import {Pagination, PaginationType} from "./Pagination";

export default {
    title: 'components/Pagination',
    component: Pagination,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story<PaginationType> = (args) => <Pagination  {...args}  />;

export const MyPagination = Template.bind({});
MyPagination.args = {
    totalPages:20,
    page:5,
}