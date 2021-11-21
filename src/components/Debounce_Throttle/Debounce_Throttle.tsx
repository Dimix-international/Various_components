import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import s from './Debounce_Throttle.module.css'
import lodash from "lodash";

function useDebounceAlt(fn: (nextValue: string) => void, delay: number) {

    const memoizedCallback = useCallback(fn, []);
    const debouncedCallback = useRef(lodash.debounce(memoizedCallback, delay));

    useEffect(() => {

        debouncedCallback.current = lodash.debounce(memoizedCallback, delay)

    }, [memoizedCallback, delay])

    return debouncedCallback.current
}

export const DebounceThrottle = () => {

    const [value, setValue] = useState('');
    const [dbValue, setDbValue] = useState('');
    const [delay, setDelay] = useState(500);

    const debounceSaved = useDebounceAlt((nextValue: string) => setDbValue(nextValue), delay)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = e.target.value;
        setValue(nextValue);
        debounceSaved(nextValue);
    }
    return (
        <div>
            <h1>Blog</h1>
            <div>
                <input value={delay} type="number"
                       onChange={(e) => setDelay(Number(e.target.value))}/>
            </div>
            <textarea
                value={value}
                onChange={handleChange}
                cols={50}
                rows={5}
            />
            <div className={s.container}>
                <div className={s.column}>
                    <div>Editor (Client)</div>
                    {value}
                </div>
                <div className={s.column}>
                    <div>Saved (DB)</div>
                    {dbValue}
                </div>
            </div>
        </div>
    )
}