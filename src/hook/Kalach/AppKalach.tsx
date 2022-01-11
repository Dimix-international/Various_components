import {UseFetchKalach} from "./n6-hooksKalach/useFetchKalach";
import {useThemeKalach} from "./n6-hooksKalach/useThemeKalach";
import './Kalach.css'

type DataType = {
    userId: number,
    id: number,
    title: string,
    body: string
}
export const AppKalach = () => {

    const {data, loading, error, fetchNow}
        = UseFetchKalach({
        url: 'https://jsonplaceholder.typicode.com/posts',
    });

    const {theme, toggleTheme} = useThemeKalach();

    if(loading) return <div>Loading...</div>
    if(error) return <div>Some error</div>

    return(
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>change local theme</button>
            {
                data && (data as DataType []).map(item => (
                    <div key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.title}</span>
                    </div>
                ))
            }
        </div>
    )
}