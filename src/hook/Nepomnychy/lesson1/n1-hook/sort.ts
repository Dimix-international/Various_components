
import {useState} from "react";
import {TodosType} from "../dataCustTodo";

export type SortType = {
    items: TodosType [],
    sortProp: keyof TodosType;
}

export const useSort = (props: SortType) => {

    const {sortProp, items} = props;

    const [sortMode, setSortMode] = useState<string | null>(null);

    const sortedItems = !sortMode
        ? items
        : items.slice().sort((a, b) => {
            if (sortMode === "asc" && a[sortProp] > b[sortProp]) {
                return 1;
            } else if (sortMode === "asc") {
                return -1;
            } else if (sortMode === "desc" && a[sortProp] > b[sortProp]) {
                return -1;
            } else {
                return 1;
            }
        });

    return {
        sortMode, setSortMode, sortedItems
    }
}