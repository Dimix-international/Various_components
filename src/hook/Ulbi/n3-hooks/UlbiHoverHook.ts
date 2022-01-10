import {MutableRefObject, useEffect, useState} from "react";

type HoverUlbiHookType = {
    ref:MutableRefObject<HTMLElement | null>,
}
export const useHoverUlbiHook = (props:HoverUlbiHookType) => {

    const {ref} = props;

    const [isHovering, setHovering] = useState(false);

    const on = () => setHovering(true);
    const off = () => setHovering(false);

    useEffect(() => {

        if(!ref.current) {
            return
        }

        const node = ref.current;
        node.addEventListener('mousedown', on);
        node.addEventListener('mousemove', on);
        node.addEventListener('mouseleave', off);


        return () => {
            node.removeEventListener('mousedown', on);
            node.removeEventListener('mousemove', on);
            node.removeEventListener('mouseleave', off);
        }
    },[ref])

    return isHovering
}