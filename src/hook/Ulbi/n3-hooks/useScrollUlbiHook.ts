import {MutableRefObject, useEffect, useRef} from "react";

type ScrollUlbiHookType = {
    parentRef:MutableRefObject<HTMLDivElement | null>,
    childRef:MutableRefObject<HTMLDivElement | null>,
    callback:() => void
}
export const useScrollUlbiHook = (props:ScrollUlbiHookType) => {

    const {parentRef, childRef, callback} = props;

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {

        const options = {
            root: parentRef.current, //объект со скролом
            rootMargin: '0px',
            threshold: 0 //вызовется callback если объект только появился
        }

        observer.current = new IntersectionObserver(([target]) => {
            if(target.isIntersecting) {
                console.log('появился элемент в зоне видимости')
                callback()
            }
        }, options)

        //указываем за каким элементом будем следить - как
        // только он появится в зоне видимости , target.isIntersecting = true и сработает callback
        if(childRef.current) {
            observer.current.observe(childRef.current)
        }

        return () => {
            childRef.current && observer.current?.unobserve(childRef.current)
        }

    },[callback, childRef, parentRef])
}