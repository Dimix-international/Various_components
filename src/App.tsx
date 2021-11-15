import React, {useState} from 'react';
import './App.css';
import {UncontrolledRaiting} from "./components/UncontrolledRaiting/UncontrolledRaiting";
import {OnOff} from "./components/OnOff/OnOff";
import UncontrolledAccordion
    from "./components/UncontrolledAccordion/UncontrolledAccordion";
import {Raiting, RatingType} from "./components/Raiting/Raiting";
import {AccordionWithControl} from "./components/AccordionWithControl/AccordionWithControl";
import {OnOffWithControl} from "./components/OnOfWithControl/OnOffWithControl";
import {Select} from "./components/Select/Select";
import {SelectDim} from "./components/SelectDim/SelectDim";
import UncontrolledAccordionWithUseReducer
    from "./components/UncontrolledAccordion/UncontrolledAccordionWithUseReducer";
import {Cube3D} from "./components/3D-Cube/Cube3D";
import reactImg from "./components/3D-Cube/assets/react.jpg";
import reduxImg from "./components/3D-Cube/assets/redux.jpeg";
import jsImg from "./components/3D-Cube/assets/js.jpg";
import tsImg from "./components/3D-Cube/assets/ts.png";

function App() {
    let [ratingValue, setRatingValue] = useState<RatingType>(0)
    let [collapsedAccordion, setCollapsedAccordion] = useState<boolean>(false)
    let [on, setOn] = useState<boolean>(false)
    let [valueSelect, setValueSelect] = useState<string | null>('2');

    const onClickItemOfAccordion = (value: any) => {
        alert(value)
    }
    return (
        <div className={'App'}>
            <PageTitle title={'This is app'}/>
            <PageTitle title={'My friends!'}/>
            <Raiting
                value={ratingValue}
                onClick={setRatingValue}
            />
            <UncontrolledRaiting onChange={() => ratingValue}/>
            <UncontrolledAccordion titleValue={'Menu'}/>
            <UncontrolledAccordionWithUseReducer titleValue={'Reducer'}/>
            <AccordionWithControl
                titleValue={'Users'}
                collapsed={collapsedAccordion}
                items={[
                    {title: 'Dima', value: 1},
                    {title: 'Vika', value: 2},
                    {title: 'Igor', value: 3},
                ]}
                onClickItemOfAccordion={onClickItemOfAccordion}
                onChange={() => setCollapsedAccordion(!collapsedAccordion)}
            />
            <OnOff onChange={setOn}/> {on.toString()}
            {/* <OnOffWithControl
              on={on}
              onChange={setOn}

          />*/}
            <Select
                value={valueSelect}
                setValueSelect={setValueSelect}
                items={[
                    {id: '1', name: 'Minsk'},
                    {id: '2', name: 'Gomel'},
                    {id: '3', name: 'Brest'},
                    {id: '4', name: 'London'},
                ]}
            />
        </div>
    );
}

// фрагмент
function PageTitle(props: { title: string }) {
    return <h2>{props.title}</h2>
}

export default App;
