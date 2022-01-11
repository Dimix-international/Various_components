import {useEffect, useState} from "react";

type UseFetchKalachType = {
    url: string,
    options?: any
}
type StatusType = {
    loading: boolean,
    data: any [] | undefined,
    error: string | undefined
}
//лучше использовать у ULBI
export const UseFetchKalach = (props: UseFetchKalachType) => {

    const {url, options = {}} = props;

    const [status, setStatus] = useState<StatusType>({
        loading: false,
        data: undefined,
        error: undefined,
    })

    const fetchNow = async (url: string, options: any) => {
        setStatus({...status, loading: true});
        try{
            const response = await fetch(url, options);
            const data = await response.json();
            setStatus({...status, data, loading: false});
        } catch (e) {
            setStatus({...status,
                error:e.message,
                loading: false
            })
        }
       /* fetch(url, options)
            .then(res => res.json())
            .then(res => {
                setStatus({...status, data: res});
            })
            .catch(error => setStatus({...status, error}))
            /!*.finally(() => setStatus({...status, loading: false}))*!/*/
    }

    useEffect(() => {
        url && fetchNow(url, options)
    },[])

    return {
        ...status,
        fetchNow,
    }
}