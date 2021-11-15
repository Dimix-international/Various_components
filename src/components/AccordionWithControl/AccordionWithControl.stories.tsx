import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {AccordionPropsType, AccordionWithControl} from './AccordionWithControl';
import {action} from "@storybook/addon-actions";

export default {
    title: 'components/AccordionWithControl',
    component: AccordionWithControl,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
const callback = action('the event was happen')
const onClickCallback = action('the click on item was happen')
const Template: Story<AccordionPropsType> = (args) => <AccordionWithControl {...args} />;


export const MenuCollapsedMode = Template.bind({});

const callbackProps = {
    onChange: callback,
    onClickItemOfAccordion:onClickCallback
}

MenuCollapsedMode.args = {
    /*onChange: callback,
onClickItemOfAccordion:onClickCallback*/
    ...callbackProps,
    titleValue: 'Menu' ,
    collapsed: false,
    items: [],
};
export const UsersUnCollapsedMode = Template.bind({});
UsersUnCollapsedMode.args = {
    ...callbackProps,
    titleValue: 'Users' ,
    collapsed: true,
    items: [
        {title: 'Dima', value: 1},
        {title: 'Vika', value: 2},
        {title: 'Igor', value: 3},
    ],
};
export const ModeChanging = () => {
    const[collapsed, setCollapsed] = useState<boolean>(false);
   return <AccordionWithControl
       titleValue={'Users'}
       collapsed={collapsed}
       items ={[
           {title: 'Dima', value: 1},
           {title: 'Vika', value: 2},
           {title: 'Igor', value: 3},
       ]}
       onClickItemOfAccordion={(id) => alert(id)}
       onChange={() => setCollapsed(!collapsed)}
   />
}

