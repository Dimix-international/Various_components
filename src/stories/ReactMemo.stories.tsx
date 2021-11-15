import React, {useState} from "react";

export default {
    title: 'components/React.memo demo',
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

const NewMessagesCounter = React.memo((props: { count: number }) => {
    console.log('counter')
    return <div>{props.count}</div>
})
const Users = React.memo((props: { users: Array<string> }) => {
    console.log('users')
    return <div>
        {
            props.users.map((u, i) => <div key={i}>{u}</div>)
        }
    </div>
})


export const Example1 = () => {
    const[count, setCount] = useState(0);
    const[users, setUsers] = useState(['Dima', 'Vika', 'Jack']);

    const addUsersHandler = () => {
        setUsers(['Sveta', ...users]);
    }
    return <>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={addUsersHandler}>add Sveta</button>
        <NewMessagesCounter count={count}/>
        <Users users={users}/>
    </>
}