import React from "react";
import '../UncontrolledRaiting/Raiting.css';

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5;
export type RatingPropsType = {
    value: RatingType,
    onClick: (number:RatingType) => void
}
export function Raiting(props: RatingPropsType) {

    return (
        <div>
            <Star onClick={props.onClick} value={1} selected={props.value > 0} />
            <Star onClick={props.onClick} value={2} selected={props.value > 1} />
            <Star onClick={props.onClick} value={3} selected={props.value > 2} />
            <Star onClick={props.onClick} value={4} selected={props.value > 3} />
            <Star onClick={props.onClick} value={5} selected={props.value > 4} />
        </div>
    )
}

type StarPropsType = {
    selected: boolean,
    onClick: (number:RatingType) => void
    value:RatingType
}

function Star(props: StarPropsType) {
    const changeStars = () => {
        props.onClick(props.value)
    }
    return <span onClick={changeStars}>
        {props.selected? <b> start </b> : 'star'}
    </span>
}