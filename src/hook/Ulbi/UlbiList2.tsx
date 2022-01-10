import {useUlbiRequest} from "./n3-hooks/UlbiUseRequest";
import axios from "axios";


export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
export const UlbiList2 = () => {


    const {
        data,
        loading,
        error
    } = useUlbiRequest({request: () => fetchTodosRequest()});

    const fetchTodosRequest = () => {
        return axios.get(
            `https://jsonplaceholder.typicode.com/todos`
        )
    }

    if (loading) {
        return <h1>loading.....</h1>
    }

    if (error) {
        return <h1>Error!.</h1>
    }


    return (
        <div style={{height: '80vh', overflow: 'auto'}}>
            {
                data && data.map(todo => (
                    <div
                        key={todo.id}
                        style={{
                            padding: '15px',
                            border: '2px solid black'
                        }}
                    >{todo.id} {todo.title}</div>
                ))
            }
        </div>
    )
}