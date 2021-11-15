import React from "react";
import {Story} from "@storybook/react";
import {Cube3D, Cube3DType} from "./Cube3D";


import reactImg from './assets/react.jpg';
import reduxImg from './assets/redux.jpeg';
import jsImg from './assets/js.jpg';
import tsImg from './assets/ts.png';

export default {
    title: 'components/Cube3D',
    component: Cube3D,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story<Cube3DType> = (args) => <Cube3D  {...args}  />;

export const My3DCube = Template.bind({});
My3DCube.args = {
    images: [
        {id:'1', src:reactImg, side:'front', sign:'react'},
        {id:'2', src:reduxImg, side:'right', sign:'redux'},
        {id:'3', src:jsImg, side:'back', sign:'js'},
        {id:'4', src:tsImg, side:'left', sign:'ts'},
    ]
}