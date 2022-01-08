import './Counter.css'

export const Display = ({count}: {count:number}) => {
    return (
        <div className={'display'}>
            {count}
        </div>
    )
}