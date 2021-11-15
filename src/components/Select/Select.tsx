import React, {useState} from "react";
import s from './Select.module.css'

export type ItemType = {
    id: string,
    name: string
}
export type SelectPropsType = {
    value:string | null
    setValueSelect: (value: string) => void
    items: ItemType[]
}
export const Select: React.FC<SelectPropsType> = React.memo(({value,setValueSelect,items}) => {
    let [collapsedSelect, setCollapsedSelect] = useState<boolean>(false);
    const onClickSelectCollapsed = () => {
        setCollapsedSelect(!collapsedSelect);
    }
    const componentBody = items.map(item => {
        return (
            <SelectItem
                key={item.id}
                item={item}
                setTitleSelect={setValueSelect}
                onClickSelectCollapsed={onClickSelectCollapsed}
            />
        )
    })
    return (
        <div className = {s.select}>
            <SelectTitle
                onClickSelectCollapsed={onClickSelectCollapsed}
                idItem={value}
                collapsedSelect={collapsedSelect}
                items={items}
            />
            {collapsedSelect && <div className={s.body}>{componentBody}</div>}
        </div>

    )
})
type SelectTitleType = {
    onClickSelectCollapsed: () => void
    idItem: string | null
    collapsedSelect: boolean
    items:ItemType[]
}
export const SelectTitle: React.FC<SelectTitleType> = React.memo(({onClickSelectCollapsed,idItem, collapsedSelect, items }) => {
    const title = items.find(item => item.id === idItem)
    const changeCollapsedHandler = () => {
        onClickSelectCollapsed();
    }
    return (
        <div
            className={collapsedSelect ? `${s.item} ${s.active} ${s.close}` : `${s.item} ${s.active}`}
            onClick={changeCollapsedHandler
            }
        >
            {title && title.name}
        </div>
    )
})

type SelectItemType = {
    item: ItemType
    setTitleSelect: (value:string) => void
    onClickSelectCollapsed: () => void
}
export const SelectItem: React.FC<SelectItemType> = React.memo(({item, setTitleSelect,onClickSelectCollapsed}) => {
    const onChooseOptionHandler = (id:string) => {
        setTitleSelect(id);
        onClickSelectCollapsed();
    }
    return (
            <div
                className={s.item}
                onClick={() => onChooseOptionHandler(item.id)}
            >
                {item.name}
            </div>
    )
})