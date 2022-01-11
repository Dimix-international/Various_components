import {InputMininHook} from "./n2-hook/InputMininHook";


export const MininHook = () => {

    const inputFirstNname = InputMininHook({initValue: '', required: true});
    const inputLastName = InputMininHook({initValue: ''});

    return (
        <div>
            <h1>{inputFirstNname.value}</h1>
            <h1>{inputLastName.value}</h1>
            <form>
                <input
                    type="text"
                    {...inputFirstNname.bind}
                />
                {inputFirstNname.error && <span style={{color: 'red'}}>{inputFirstNname.error}</span>}
                <input
                    type="text"
                    {...inputLastName.bind}
                />
                <button onClick={() => {
                    inputFirstNname.clear();
                    inputLastName.clear();
                }
                }>Очистить
                </button>
            </form>
        </div>
    )
}