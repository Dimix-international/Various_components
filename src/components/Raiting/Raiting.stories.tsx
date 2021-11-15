import React, {useState} from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {Raiting, RatingPropsType, RatingType} from './Raiting';

export default {
    title: 'components/Raiting',
    component: Raiting,
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const Template: Story<RatingPropsType> = (args) => <Raiting {...args} />;

export const EmptyRaiting = Template.bind({});
EmptyRaiting.args = {
    value: 0 ,
    onClick: number => number
};
export const ChangeRaiting = () => {
    let [raiting, setRaiting] = useState<RatingType>(0);
   return <Raiting value={raiting} onClick={setRaiting} />
}
