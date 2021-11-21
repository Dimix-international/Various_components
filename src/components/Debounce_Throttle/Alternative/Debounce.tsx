import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import s from './Debounce_Throttle.module.css'
import lodash from "lodash";
import axios from "axios";


type ItemType = {
    identifier: string
    name: string
    published_at: string
    type: string
    url: string
}

export const Debounce = () => {

    const [search, setSearch] = useState<Array<ItemType>>([]);


    const debounce = (func: (e: ChangeEvent<HTMLInputElement>) => void, ms: number) => {

        let timer: number | null;

        return (e: ChangeEvent<HTMLInputElement>) => {

            const context = this;

            if (timer) clearTimeout(timer);

            timer = window.setTimeout(() => {
                timer = null;
                func.apply(context, [e])
            }, ms)

        }
    }

    const onChangeHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        axios.get(`https://demo.dataverse.org/api/search?q=${value}`)
            .then(response => {
                // @ts-ignore
                setSearch(response.data.data.items)
            })
    }

    const optimazedVersion = useCallback(debounce(onChangeHandler, 1000), [])


    return (
        <div>
            <input
                type="text"
                onChange={optimazedVersion}
            />
            {
                search.length > 0 &&
                search?.map((item, index) => (
                    <div key={index}>
                        <span>{item.name}</span>
                    </div>
                ))

            }
        </div>
    )
}