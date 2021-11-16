import React from "react";
import {Input} from "./Input";
import {Textarea} from "./Textarea";
import {Select} from "./Select";
import {DropdownOptionsType} from "./FormikContainer";
import {RadioButtons} from "./RadioButtons";
import {CheckboxGroup} from "./CheckboxGroup";
import {DatePicker} from "./DatePicker";

type FormikControlType = {
    control: string
    type?: string
    label?: string
    name: string
    options?: Array<DropdownOptionsType>
}

export const FormikControl = React.memo((props: FormikControlType) => {

    const {control, ...restProps} = props;
    console.log(restProps)
    switch (control) {
        case 'input':
            return <Input {...restProps}/>
        case 'textarea':
            return <Textarea {...restProps}/>
        case 'select':
            return <Select options={restProps.options ? restProps.options : []} {...restProps} />
        case 'radio':
            return <RadioButtons options={restProps.options ? restProps.options : []} {...restProps}  {...restProps} />
        case 'checkbox':
            return <CheckboxGroup options={restProps.options ? restProps.options : []} {...restProps}  {...restProps} />
        case 'date':
            return <DatePicker {...restProps} />
        default:
            return null
    }
})
