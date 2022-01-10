import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useScrollUlbiHook} from "./n3-hooks/useScrollUlbiHook";
import {useUlbiDebounce} from "./n3-hooks/UlbiDebounce";


export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
export const UlbiList = () => {

    const [todos, setTodos] = useState<TodoType []>([]);
    const [page, setPage] = useState(1);
    const limit = 20;



    const parentRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLDivElement | null>(null);

    const intersected = useScrollUlbiHook({
        parentRef,
        childRef,
        callback: () => fetchTodos(page, limit)
    })
    const fetchTodos = (page: number, limit: number) => {
        fetch(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
        )
            .then(response => response.json())
            .then(json => {

                if(json.length === 0) {
                    return
                }
                setTodos(prev => [...prev, ...json]);
                setPage(prev => prev + 1)
            })
    }

    //debounce
    const[searchValue, setSearchValue] = useState('');
    const debouncedSearch = useUlbiDebounce({
        delay: 500,
        callback: () => searchTodos(searchValue)
    })
    const searchTodos = (query:string) => {
        fetch(
            `https://jsonplaceholder.typicode.com/todos?query=${query}`
        )
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
        debouncedSearch(e.currentTarget.value)
    }


    return (
        <div ref={parentRef} style={{height: '80vh', overflow: 'auto'}}>
            <input type="text" value={searchValue} onChange={onChange}/>
            {
                todos.map(todo => (
                    <div
                        key={todo.id}
                        style={{
                            padding: '15px',
                            border: '2px solid black'
                        }}
                    >{todo.id} {todo.title}</div>
                ))
            }
            <div ref={childRef} style={{
                height: '20px',
                backgroundColor: 'green'
            }}>

            </div>
        </div>
    )
}