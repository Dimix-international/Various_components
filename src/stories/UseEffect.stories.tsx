import React, {useCallback, useEffect, useState} from "react";
import Typewriter from 'typewriter-effect'

export default {
    title: 'components/UseEffect demo',
    argTypes: {
        color: {
            control: 'color',
            table: {
                category: 'Colors'
            }
        },
    },
};

export const SetIntervalExample1 = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        let idInterval: number = window.setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [])
    return <>
        {/*<button onClick={() => setCount(count + 1)}>+</button>*/}
        {/*<button onClick={() => setCount(changer)}>+</button>*/}
        {count}
    </>
}

export const ResetEffectExample1 = () => {
    const [count, setCount] = useState(1);
    console.log('rendering component with - ' + count)
    useEffect(() => {
        console.log('effect have done - ' + count);

        //сброс компоненты срабатывает:
        //1) когда компонент умирает
        //2) перед очередным вызовом useEffect

        //т.е. перед вторым срабатыванием сначала запустится сброс эффекта (return)
        return () => {
            console.log('died - ' + count)
        }
    }, [count])
    return <>
        <button onClick={() => setCount(count + 1)}>+</button>
        {count}
    </>
}
//задача - будем выводить текст который вводит пользователь за пределами react компонент
export const KeysTrackerExample1 = () => {
    const [text, setText] = useState('');
    console.log('rendering  with - ' + text)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            console.log(e.key);
            //если так оставить - text + e.key - всегда будет только одно значение (text замкнулся на первом значении = '')
            //setText(text + e.key)
            //1) можем избавить функцию от зависимости - массив зависимостей пуст
            //setText((state:string) => state + e.key)
            //2) установим зависимость text в массиве зависимостей
            setText(text + e.key)
        }
        window.addEventListener('keypress', handler);

        return () => {
            window.removeEventListener('keypress', handler);
        }
    }, [text])
    return <>
        Typed text: {text}
    </>
}

export const SetTimeoutExample2 = () => {
    const [text, setText] = useState('');
    useEffect(() => {
        let timeoutId: number = window.setTimeout(() => {
            console.log('timeout is expected')
            setText('3')
        }, 3000)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [text])
    return <>
        Typed text: {text}
    </>
}

export const TypeWriterText = () => {
    const value = `
    Проснись, Нео…
           Ты увяз в Матрице.
                Следуй за белым кроликом.
                Тук-тук, Нео.     
    `;
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);


    useEffect(() => {
        const id = setInterval(() => {
            setCount(prevState => prevState + 1);
        }, 200)

        if (count === value.length) {
            return clearInterval(id)
        }

        const array = value.split('');
        setText(state => state + array[count]);

        return () => clearInterval(id)
    }, [count, value])

    return <div style={{
        fontSize: '18px',
        color: 'greenyellow',
        backgroundColor: 'black',
        height: '100vh',
        padding: '30px'
    }}>
        {text}
    </div>
}

export const TypeWriterTextTwo = () => {
    return (
        <div style={{
            fontSize: '20px',
            color: 'greenyellow',
            backgroundColor: 'black',
            height: '100vh',
            padding: '30px'
        }}>
            <Typewriter
                options={{
                    delay: 200, //скорость
                    loop: true,
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('Проснись, Нео…')
                        .pauseFor(2500)
                        .deleteAll()
                        .pauseFor(1000)
                    typewriter.typeString('Ты увяз в Матрице.')
                        .pauseFor(2500)
                        .deleteAll()
                    typewriter.typeString('Следуй за белым кроликом.')
                        .pauseFor(2500)
                        .deleteAll()
                    typewriter.typeString('Тук-тук, Нео.')
                        .pauseFor(1000)
                        .deleteAll()
                        .callFunction(() => alert('Finish!'))
                        .start();
                }}
            />
        </div>
    )
}
