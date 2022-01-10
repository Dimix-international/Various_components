import {useState} from "react";
import {useDebounce} from "./debounce";
import {TodosType} from "../dataCustTodo";

export type FilterType = {
    items: TodosType [],
    filterProp: keyof TodosType
}
export const useFilter = (props: FilterType) => {

    const{items, filterProp} = props;

    const [enteredSearchValue, setEnteredSearchValue] = useState("");
    const activeSearchValue = useDebounce({
        value: enteredSearchValue,
        delay: 300
    });


    const availableItems = activeSearchValue
        ? items.filter((item) => RegExp(activeSearchValue, "i").test(item[filterProp] as keyof TodosType))
        : items;

    return {
        enteredSearchValue,
        setEnteredSearchValue,
        availableItems,
    }
}