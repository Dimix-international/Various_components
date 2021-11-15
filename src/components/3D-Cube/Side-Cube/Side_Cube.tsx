import React from "react";
import s from './Side_Cube.module.css'

type SideCubeType = {
    id: string
    side: string,
    img: string,
    sign: string
}
export const SideCube: React.FC<SideCubeType> = (props) => {
    const {side, img, sign,} = props;

    return (
        <div
            className={`${s.body} ${s[side]}`}>
            <img src={img} alt={sign}/>
        </div>
    )
}
