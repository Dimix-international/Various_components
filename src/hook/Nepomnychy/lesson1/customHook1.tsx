import { useState, useEffect } from "react";
import {TodosType} from "./dataCustTodo";
import './styleCust.css'
import {useFilter} from "./n1-hook/filter";
import {useSort} from "./n1-hook/sort";

/*
export const CustomHook1 = ({ list }: {list: TodosType []}) => {
    const [enteredSearchValue, setEnteredSearchValue] = useState("");
    const [activeSearchValue, setActiveSearchValue] = useState("");
    const [sortMode, setSortMode] = useState<string | null>(null);

    const availableItems = activeSearchValue
        ? list.filter((item) => RegExp(activeSearchValue, "i").test(item.title))
        : list;

    const sortedItems = !sortMode
        ? availableItems
        : availableItems.slice().sort((a, b) => {
            if (sortMode === "asc" && a.title > b.title) {
                return 1;
            } else if (sortMode === "asc") {
                return -1;
            } else if (sortMode === "desc" && a.title > b.title) {
                return -1;
            } else {
                return 1;
            }
        });

    useEffect(() => {
        const handler = setTimeout(() => {
            setActiveSearchValue(enteredSearchValue);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [enteredSearchValue]);

    return (
        <div className="App">
            <div className="form">
                <input
                    type="search"
                    value={enteredSearchValue}
                    onChange={(e) => setEnteredSearchValue(e.target.value)}
                    placeholder="search todo"
                />
                <div className="form-radio">
                    <input
                        type="radio"
                        name="sort"
                        value="asc"
                        checked={sortMode === "asc"}
                        onChange={(e) => setSortMode(e.target.value)}
                    />{" "}
                    A-Z
                    <input
                        type="radio"
                        name="sort"
                        value="desc"
                        checked={sortMode === "desc"}
                        onChange={(e) => setSortMode(e.target.value)}
                    />{" "}
                    Z-A
                </div>
            </div>

            <ul>
                {sortedItems.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}*/

export const CustomHook1 = ({ list }: {list: TodosType []}) => {

    const {availableItems, enteredSearchValue, setEnteredSearchValue}
        = useFilter({items:list, filterProp: 'title'})

    const {sortMode, setSortMode, sortedItems} = useSort({items:list, sortProp: 'title'});

    return (
        <div className="App">
            <div className="form">
                <input
                    type="search"
                    value={enteredSearchValue}
                    onChange={(e) => setEnteredSearchValue(e.target.value)}
                    placeholder="search todo"
                />
                <div className="form-radio">
                    <input
                        type="radio"
                        name="sort"
                        value="asc"
                        checked={sortMode === "asc"}
                        onChange={(e) => setSortMode(e.target.value)}
                    />{" "}
                    A-Z
                    <input
                        type="radio"
                        name="sort"
                        value="desc"
                        checked={sortMode === "desc"}
                        onChange={(e) => setSortMode(e.target.value)}
                    />{" "}
                    Z-A
                </div>
            </div>

            <ul>
                {sortedItems.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}
