import React, {useCallback, useMemo, useState} from "react";

export default {
    title: 'components/UseMemo demo',
};


export const DifficultCountingExample = () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(3);

    //сделаем расчет факториала чисел
    let resultA = 1;
    let resultB = 1;
    for (let i = 1; i <= a; i++) {
        resultA = resultA * i;
    }

    //обернем сложный расчет b в useMemo
    //чтобы он не пересчитывался , если меняется a,
    // но b остался прежним
    resultB = useMemo(() => {
            let tempValue = 1;
            for (let i = 1; i <= b; i++) {
                //сделаем, чтобы были проблемы с подсчетом
                let fake = 0;
                while (fake < 10000000) {
                    fake++;
                    const fa = Math.random();
                }
                tempValue = tempValue * i;
            }
            return tempValue
        },
        //зависимости, от которых зависит перезапускать функцию или нет
        // если a не поменялось, то функцию запускать не нужно,
        [b]);
    /*for (let i = 1; i <= b; i++) {
        //сделаем, чтобы были проблемы с подсчетом
        let fake = 0;
        while (fake < 10000000) {
            fake++;
            const fa = Math.random();
        }
        resultB = resultB * i;
    }*/

    return (
        <div>
            <input value={a} onChange={(e) => setA(Number(e.currentTarget.value))}/>
            <input value={b} onChange={(e) => setB(Number(e.currentTarget.value))}/>
            <hr/>
            <div>
                Result for a: {resultA}
            </div>
            <div>
                Result for b: {resultB}
            </div>
        </div>
    )
}


const Users = React.memo((props: { users: Array<string> }) => {
    console.log('users')
    return <div>
        {
            props.users.map((u, i) => <div key={i}>{u}</div>)
        }
    </div>
})

export const HelpsToReactMemo = () => {
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState(['Dima', 'Vika', 'Joker']);

    //newArrOfUsers не меняется, но перерисовка просходит, даже при защищенной Users, т.к. filter возвращает новый массив
    // const newArrOfUsers = users.filter(u => u.toLowerCase().includes('a'))
    //обернем в useMemo (при пустом [] зависимостей, useMemo сработает только 1 раз)
    const newArrOfUsers = useMemo(() => {
        return users.filter(u => u.toLowerCase().includes('a'))
    }, [users])
    const addUsersHandler = () => {
        setUsers(['Sveta', 'Lom', ...users]);
    }

    return <>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={addUsersHandler}>add Sveta</button>
        {count}
        <Users users={newArrOfUsers}/>
    </>
}



export const LikeUseCallback = () => {
    console.log('LikeUseCallback')
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState(['React', 'JS', 'HTML/CSS']);

    const newArrOfBooks = useMemo(() => {
        return books.filter(b => b.toLowerCase().includes('a'))
    }, [books]);

    /*const addBooksHandler = () => {
        setBooks(['Angular', ...books]);
    }
    //запомним функцию addBooksHandler с помощью useMemo
    const memorizedAddBooks = useMemo(() => {
        return addBooksHandler
    },[books]);*/
    //запишем  в одной функции
    /*const memorizedAddBooks = useMemo(() => {
        return () => {
            setBooks(['Angular', ...books]);
        }
    },[books]);*/
    //используя useCallback - альтернатива useMemo
    const memorizedAddBooks = useCallback(() => {
            setBooks(['Angular', ...books]);
    },[books]);
    return <>
        <button onClick={() => setCount(count + 1)}>+</button>
        {count}
        <BooksSecret
            books={newArrOfBooks}
            /*addBook={addBooksHandler}*/
            addBook={memorizedAddBooks}
        />
    </>
}
const BooksSecret = React.memo((props: { books: Array<string>; addBook:() => void} ) => {
    console.log('books')
    return <div>
        <button onClick={()=> props.addBook()}>add book</button>
        {
            props.books.map((b, i) => <div key={i}>{b}</div>)
        }
    </div>
})





type CityType = {
    id: number,
    country: string
    title: string
    count: number
}

const Cities = React.memo((props: { cities: Array<CityType> }) => {
    console.log('cities')
    return <select>
        {
            props.cities.map((c, i) => <option key={i}>{c.title}</option>)
        }
    </select>
})

export const HelpsToSelectReactMemo = () => {
    const [count, setCount] = useState(0);
    const [city, setCity] = useState<Array<CityType>>([
        {id: 1, country: 'Belarus', title: 'Gomel', count: 500000},
        {id: 2, country: 'Belarus', title: 'Minsk', count: 2000000},
        {id: 3, country: 'Russia', title: 'Moskva', count: 10000000},
        {id: 4, country: 'Russia', title: 'Saint Petersburg', count: 500000},
        {id: 5, country: 'Germany', title: 'Berlin', count: 2000000},
        {id: 6, country: 'Belarus', title: 'Grodno', count: 300000},
        {id: 7, country: 'England', title: 'London', count: 100000},
        {id: 8, country: 'Russia', title: 'Novgorod', count: 2500000},
        {id: 9, country: 'French', title: 'Paris', count: 5000000},
    ]);

    const arrayCityFromBelarus = useMemo(() => {
        console.log('Belarus')
        return city.filter(c => c.country === 'Belarus')
    }, [city]);
    const arrayFromLetterM =useMemo(() => {
        console.log('Russia')
        return city.filter(c => c.title.toLowerCase().startsWith('m',0));
    },[city])
    const arrayCityWithPopulationMoreMillion =useMemo(() => {
        console.log('Population')
        return city.filter(c => c.count > 1000000)
    },[city])

    const addUsersHandler = () => {
        setCity([{id: Math.random(), country: 'Russia', title: 'Novozipkov', count: 200000}, ...city]);
    }

    return <>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={addUsersHandler}>add City</button>
        {count}
        <Cities cities={arrayCityFromBelarus}/>
        <Cities cities={arrayFromLetterM}/>
        <Cities cities={arrayCityWithPopulationMoreMillion}/>
    </>
}
