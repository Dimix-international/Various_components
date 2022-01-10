import {InputMininHook} from "./n2-hook/InputMininHook";


export const MininHook = () => {

    const inputFirstNname = InputMininHook({initValue: ''});
    const inputLastName = InputMininHook({initValue: ''});
    const {clear} = InputMininHook({initValue: ''});

    return (
        <div>
            <input
                type="text"
                {...inputFirstNname.bind}
            />
            <input
                type="text"
                {...inputLastName.bind}
            />
            <h1>{inputFirstNname.value}</h1>
            <h1>{inputLastName.value}</h1>
            <button onClick={() => {
                inputFirstNname.clear();
                inputLastName.clear();
            }
            }>Очистить
            </button>
        </div>
    )
}