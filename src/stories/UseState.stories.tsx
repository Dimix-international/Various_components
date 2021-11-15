import React, {useMemo, useState} from "react";

export default {
    title: 'components/UseState demo',
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};
function generateData() {
    //сложные вычисление
    let tempValue = 0;
    for (let i = 1; i <= 5; i++) {
        //сделаем, чтобы были проблемы с подсчетом
        let fake = 0;
        while (fake < 10000000) {
            fake++;
            const fa = Math.random();
        }
        tempValue = tempValue * i;
    }
    return tempValue
}
export const Example1 = () => {
    //const initValue = generateData();// ПРОБЛЕМА - сложные вычисление для инициализационного значения
    //const[count, setCount] = useState(initValue);

    //решим прроблему оптимизации(чтобы generateData не вызывалась при каждоый перерисовки)
    //a) useMemo
   // const initValue = useMemo(generateData,[]);
    //b) передать прямо в useState функцию

    const[count, setCount] = useState(generateData);

    //передадим в setCounter функцию которая будет возвращать число (по какому правилу менять useState)
    const changer = (state:number) => {
        //state - значение которое есть на данный момент
        return state + 1;
    }
    return <>
        {/*<button onClick={() => setCount(count + 1)}>+</button>*/}
        <button onClick={() => setCount(changer)}>+</button>
        {count}
    </>
}