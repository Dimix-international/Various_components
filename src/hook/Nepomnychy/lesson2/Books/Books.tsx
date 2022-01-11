import React from "react";
import {BookType} from "../data-books";
import { Book } from "./Book";

type BooksType = {
    items: BookType [],
    addToOrder: (id:number) => void
}
export const Books: React.FC<BooksType> = React.memo( (props) => {
    const { items = [], addToOrder } = props;

    return (
        <div className="books">
            {items.map((book) => (
                <Book key={book.id} addToOrder={addToOrder} {...book} />
            ))}
        </div>
    );
});