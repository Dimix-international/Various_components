import {useRef} from "react";
import {useHoverUlbiHook} from "./n3-hooks/UlbiHoverHook";


export const UlbiHover = () => {

    const ref = useRef<HTMLDivElement | null>(null);
    const isHovering = useHoverUlbiHook({ref});

    return (
        <div ref={ref} style={{
            width:200,
            height:200,
            backgroundColor:isHovering ? 'red' : 'blue'
        }}>

        </div>
    )
}