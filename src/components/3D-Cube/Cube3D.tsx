import React, {useRef} from "react";
import s from './Cube3D.module.css'
import {SideCube} from "./Side-Cube/Side_Cube";


export type imgType = {
    id: string,
    src: string,
    side: string,
    sign: string
}
export type Cube3DType = {
    images: Array<imgType>
}


export const Cube3D: React.FC<Cube3DType> = (props) => {
    const {images} = props;

    const imageCubeRef = useRef<HTMLDivElement | null>(null);
    let rotateDegCube = useRef(0); //запоминаем значение

    const prevImage = () => {
        rotateDegCube.current = rotateDegCube.current - 90;
        if (imageCubeRef.current) {
            imageCubeRef.current.style.transform = `rotateY(${rotateDegCube.current}deg)`;
        }
    }
    const nextImage = () => {
        rotateDegCube.current = rotateDegCube.current + 90;
        if (imageCubeRef.current) {
            imageCubeRef.current.style.transform = `rotateY(${rotateDegCube.current}deg)`;
        }
    }
    return (
        <div className={s.wrapperCube}>
            <div className={s.containerCube}>
                <div ref={imageCubeRef} id={'cube'} className={s.imageCube}>
                    {images.map(i => {
                        return (
                            <SideCube
                                key={i.id}
                                id={i.id}
                                side={i.side}
                                img={i.src}
                                sign={i.sign}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={s.btns}>
                <button onClick={prevImage}>prev</button>
                <button onClick={nextImage}>next</button>
            </div>
        </div>
    )
}