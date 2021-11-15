import React from "react";
import {Input} from "./Input";
import {Textarea} from "./Textarea";
import {Select} from "./Select";
import {DropdownOptionsType} from "./FormikContainer";

type FormikControlType = {
    control: string
    type: string
    label: string
    name: string
    options?: Array<DropdownOptionsType>
}

export const FormikControl = React.memo((props: FormikControlType) => {

    const {control, ...restProps} = props;

    switch (control) {
        case 'input':
            return <Input {...restProps}/>
        case 'textarea':
            return <Textarea {...restProps}/>
        case 'select':
            return <Select options={restProps.options ? restProps.options : []} {...restProps} />
        case 'radio':
        case 'checkbox':
        case 'date':
        default:
            return null
    }
})
