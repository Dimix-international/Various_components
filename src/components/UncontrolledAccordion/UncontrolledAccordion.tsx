import React, {useState} from "react";

export type AccordionPropsType = {
    titleValue: string,
}

function UncontrolledAccordion(props: AccordionPropsType) {
    let [collapsed,setCollapsed ] = useState<boolean>(true);
        return (
            <div>
                <AccordionTitle
                    title={props.titleValue}
                    onClick={() => setCollapsed(!collapsed)}
                />
                {!collapsed  && <AccordionBody/>}
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

export default UncontrolledAccordion;