import React, {useState, MouseEvent, KeyboardEvent, useEffect} from 'react';
import s from './SelectDim.module.css'

type ItemType = {
    id?: string
    title: string,
}
export type SelectPropsType = {
    id: any,
    onChange: (value: any) => void
    items: ItemType[]
}
export const SelectDim = (props: SelectPropsType) => {

    const [active, setActive] = useState(false);
    let [hoverElementID, setHoverElementID] = useState(props.id)

    const selectItem = props.items.find(i => i.id === props.id);
    const hoveredItem = props.items.find(i => i.id === hoverElementID);

    useEffect(() => {
        setHoverElementID(props.id)
    }, [props.id])

    const toggleSelect = () => setActive(!active);
    const onItemClick = (id: any) => {
        props.onChange(id);
        toggleSelect()
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            for (let i = 0; i < props.items.length; i++) {
                /*мой вариант */
                /* if (e.key === 'ArrowUp') {
                     if(Number(hoverElementID) < 2){
                         setHoverElementID(String(props.items.length));
                         props.onChange(String(props.items.length));
                     } else{
                         let id = Number(hoverElementID) - 1;
                         setHoverElementID(String(id));
                         props.onChange(String(id));
                     }
                 }
                 if (e.key === 'ArrowDown') {
                     if(Number(hoverElementID) > props.items.length - 1) {
                         setHoverElementID('1');
                         props.onChange(String('1'));
                     }
                     else{
                         let id = Number(hoverElementID) + 1;
                         setHoverElementID(String(id));
                         props.onChange(String(String(id)));
                     }
                 }*/
                if (props.items[i].id === hoverElementID) {
                    /*if (e.key === 'ArrowDown') {
                        if(props.items[i + 1]) { //пограничное условие
                            props.onChange(props.items[i + 1].id);
                            break;
                        }
                    }
                    if (e.key === 'ArrowUp') {
                        if(props.items[i - 1]) { //пограничное условие
                            props.onChange(props.items[i - 1].id);
                            break;
                        }
                    }*/
                    //сократим
                    let pretendentElement = e.key === 'ArrowDown' ?
                        props.items[i + 1]
                        : props.items[i - 1];
                    if (pretendentElement) {
                        props.onChange(pretendentElement.id)
                    }
                    ;
                    return
                }
            }
            if (!selectItem) {
                props.onChange(props.items[0].id); //если изначально не задан стартовый элемент
            }
        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false);
        }
    }
    return (
        <div
            className={active ? `${s.select} ${s.active}` : `${s.select}`}
            onClick={toggleSelect}
            /*чтобы можно было повесить событие нажатие на кнопки нужно  div дать tabindex */
            tabIndex={0}
            onKeyUp={onKeyUpHandler}
        >
            <div className={s.title}>{selectItem && selectItem.title}</div>
            {
                active &&
                <div className={s.body}>
                    {props.items.map(item =>
                        <div
                            className={item === hoveredItem ? `${s.item} ${s.hover}` : s.item}
                            key={item.id}
                            onClick={() => onItemClick(item.id)}
                            onMouseEnter={() => setHoverElementID(item.id)}
                        >{item.title}
                        </div>)}
                </div>
            }
        </div>
    )
}
