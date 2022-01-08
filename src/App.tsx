import React, {useState} from 'react';
import './App.css';
import {UncontrolledRaiting} from "./components/UncontrolledRaiting/UncontrolledRaiting";
import {OnOff} from "./components/OnOff/OnOff";
import UncontrolledAccordion
    from "./components/UncontrolledAccordion/UncontrolledAccordion";
import {Raiting, RatingType} from "./components/Raiting/Raiting";
import {AccordionWithControl} from "./components/AccordionWithControl/AccordionWithControl";
import {Select} from "./components/Select/Select";
import UncontrolledAccordionWithUseReducer
    from "./components/UncontrolledAccordion/UncontrolledAccordionWithUseReducer";
import {Container} from '@mui/material'
import {Route, Routes} from 'react-router-dom';

import {PaginationWithMaterial} from "./components/Pagination/PaginationWithMaterialUI/PaginationWithMaterial";
import {NotFoundPageForPagination} from "./components/Pagination/PaginationWithMaterialUI/pages/NotFoundPageForPagination";
import {AboutPageForPagination} from "./components/Pagination/PaginationWithMaterialUI/pages/AboutPageForPagination";
import {DebounceThrottle} from "./components/Debounce_Throttle/Debounce_Throttle";
import {Debounce} from "./components/Debounce_Throttle/Alternative/Debounce";
import {UseFormHook} from "./components/Form/UseFormHook/UseFormHook";
import {Counter} from "./components/UseContext/CounterUseContext/Counter";
import {CounterProvider} from "./components/UseContext/CounterUseContext/counterContext";

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
            <UncontrolledAccordionWithUseReducer titleValue={'Use Reducer'}/>
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
            {/*            <Container maxWidth={'md'}>
                <Routes>
                    <Route path={'/'} element={<PaginationWithMaterial />}/>
                    <Route path={'/:page'} element={<PaginationWithMaterial />}/>
                    <Route path={'/about'} element={<AboutPageForPagination />}/>
                    <Route path={'*'} element={<NotFoundPageForPagination />}/>
                </Routes>
            </Container>*/}
            <Debounce/>
            <UseFormHook/>
            <CounterProvider>
                <Counter/>
            </CounterProvider>
        </div>
    );
}

// фрагмент
function PageTitle(props: { title: string }) {
    return <h2>{props.title}</h2>
}

export default App;
