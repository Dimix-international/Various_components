import React, {useState} from "react";
import './Raiting.css';

export type RatingProps = {
    defaultValue?: RaitingType
    onChange: (value:RaitingType) => void
}
export type RaitingType = 0 | 1 | 2 | 3 | 4 | 5;
export function UncontrolledRaiting(props: RatingProps) {

    let [selected, setSelected] = useState<RaitingType>(props.defaultValue ? props.defaultValue : 1);
    return (
        <div>
            <Star  selected={selected >= 1} setSelected={() => {setSelected(1);props.onChange(1)}}/>
            <Star  selected={selected >= 2} setSelected={() => {setSelected(2);props.onChange(2)}}/>
            <Star  selected={selected >= 3} setSelected={() => {setSelected(3);props.onChange(3)}}/>
            <Star  selected={selected >= 4} setSelected={() => {setSelected(4);props.onChange(4)}}/>
            <Star  selected={selected >= 5} setSelected={() => {setSelected(5);props.onChange(5)}}/>
        </div>
    )
}

/*export function Raiting2(props: RatingProps) {
    if (props.stars === 3) {
        return (
            <div>
                <Star selected={true}/>
                <Star selected={true}/>
                <Star selected={true}/>
                <Star selected={false}/>
                <Star selected={false}/>
            </div>
        )
    }
    return (
        <div>
            <Star selected={true}/>
            <Star selected={true}/>
            <Star selected={true}/>
            <Star selected={true}/>
            <Star selected={true}/>
        </div>
    )
}*/

type StarPropsType = {
    selected: boolean
    setSelected: () => void
}

function Star(props: StarPropsType) {
    function changeStar() {
        props.setSelected();
    }
/*    if(props.selected) {
        return <span style={{fontWeight: 700}} onClick={changeStar}>star</span>
    }
    return <span onClick={changeStar}>star</span>*/
    return <span onClick={changeStar}> {props.selected ? <b>star</b> : 'star'}</span>
}