import {useEffect, useState} from "react";

type UseRequestType = {
    request: () => Promise<any>
}
export const useUlbiRequest = (props: UseRequestType) => {

    const {request} = props;

    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        request()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    },[])

    return {data, loading, error}

}