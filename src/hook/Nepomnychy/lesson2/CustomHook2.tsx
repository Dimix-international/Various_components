import {useToggle} from "./n5-hooksNepom/toggleHook";
import {Books} from "./Books/Books";
import {books, BookType} from "./data-books";
import {useCallback, useMemo} from "react";
import {useLocalStorage} from "./n5-hooksNepom/useLocalStorage";


export const CustomHook2 = () => {

    const {isVisible, onClick: toggleVisible} = useToggle();

    const booksList = useMemo(() => books, []);

    const {
        value: itemsFromLocalStorage,
        setValue: setItemInLocalStorage,
        clear: clearOrder
    } = useLocalStorage({
        key: 'localStore',
        initialValue: []
    });

    const addToOrderHandler = useCallback((id: number) => {
        const item = booksList.find(book => book.id === id);

        if (item) {
            setItemInLocalStorage([...itemsFromLocalStorage, item])
        }
    }, [booksList, setItemInLocalStorage, itemsFromLocalStorage])

    return (
        <div>
            {isVisible && <p>my message!</p>}
            <button onClick={toggleVisible}>
                {
                    isVisible ? 'Hide message' : 'Show message'
                }
            </button>
            <div style={{display: "flex"}}>
                <Books items={booksList} addToOrder={addToOrderHandler}/>
                <div style={{border: '2px solid grey', padding: '10px'}}>
                    {
                        !!itemsFromLocalStorage.length
                            ? itemsFromLocalStorage.map((item: BookType) => (
                                <div key={item.id}>
                                    <span>{item.title}</span>
                                    <span>{item.price}</span>
                                </div>
                            ))
                            : <p>Корзина пуста</p>
                    }
                </div>
                {
                    !!itemsFromLocalStorage.length &&
                    <button onClick={clearOrder}>
                        reset order</button>
                }
            </div>
        </div>
    )
}