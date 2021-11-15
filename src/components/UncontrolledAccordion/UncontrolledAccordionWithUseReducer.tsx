import React, {useReducer} from "react";
import {reducer, TOGGLE_CONSTANT} from "./Reducer";


export type AccordionPropsType = {
    titleValue: string,
}
function UncontrolledAccordion(props: AccordionPropsType) {
    let [state,dispatch ] = useReducer(reducer, {collapsed:true});
        return (
            <div>
                <AccordionTitle
                    title={props.titleValue}
                    onClick={() => {
                        dispatch({type: TOGGLE_CONSTANT})
                    }}
                />
                {!state.collapsed  && <AccordionBody/>}
            </div>
        )
}
/*function Accordion2(props: AccordionPropsType) {
    if (props.collapsed) {
        return (
            <div>
                <AccordionTitle title={props.titleValue}/>
            </div>
        )
    }
    return (
        <div>
            <AccordionTitle title={props.titleValue}/>
            <AccordionBody/>
        </div>
    )
}*/

type AccordionTitlePropsType = {
    title: string,
    onClick: () => void
}

function AccordionTitle(props: AccordionTitlePropsType) {
    const showAccordion = ()  => props.onClick()
    return <h3 style={{cursor: 'pointer'}} onClick={showAccordion}>{props.title}</h3>
}

function AccordionBody() {
    return (
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    )
}

export default React.memo(UncontrolledAccordion);