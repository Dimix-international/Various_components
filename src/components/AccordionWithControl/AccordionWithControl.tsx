import React from "react";

export type ItemType = {
    title: string,
    value: any
}
export type AccordionPropsType = {
    titleValue: string,
    collapsed: boolean
    onChange: () => void
    /**
      *  Elements witch will be shown whe accordion is opened!
     */
    items: ItemType[]
    /**
     *  We will watch value of element
     *  @param value has type any for more comfortable
     */
    onClickItemOfAccordion: (value: any) => void
}

export function AccordionWithControl(props: AccordionPropsType) {
    return (
        <div>
            <AccordionTitle
                title={props.titleValue}
                onChange={props.onChange}
            />
            {props.collapsed && <AccordionBody
                items={props.items}
                onClickItemOfAccordion={props.onClickItemOfAccordion}
            />}
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
    onChange: () => void
}

export function AccordionTitle(props: AccordionTitlePropsType) {
    const showAccordion = () => {
        props.onChange();
    }
    return <h3 style={{cursor: 'pointer'}} onClick={showAccordion}>{props.title}</h3>
}

export type AccordionBodyPropsType = {
    items: ItemType[]
    onClickItemOfAccordion: (value: any) => void
}

function AccordionBody(props: AccordionBodyPropsType) {
    return (
        <ul>
            {
                props.items.map((item, index) => {

                    const onClickHandler = () => {
                        props.onClickItemOfAccordion(item.value)
                    }

                        return (
                            <li style={{cursor: 'pointer'}}
                                key={index}
                                onClick={onClickHandler}
                            >{item.title}
                            </li>)
                    }
                )
            }
        </ul>
    )
}
