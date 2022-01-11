import {BookType} from "../data-books";
import React from "react";

type BookPropsType = BookType & {
    addToOrder: (id:number) => void
}
export const Book = React.memo( (props: BookPropsType) => {
    const { id, title, price, addToOrder } = props;

    return (
        <div className="book">
            <h2>{title}</h2>
            <span>{price} </span>
            <button onClick={() => addToOrder(id)}>Buy</button>
        </div>
    );
});