import React from "react";

import {FormikContainer} from "./components/FormikContainer";
import {LoginForm} from "./simpleExamples/LoginForm";
import {RegistrationForm} from "./simpleExamples/RegistrationForm";
import {RegistrationFormTwo} from "./simpleExamples/RegistrationFormTwo";

export const ReusableFormikControls = (props: any) => {
    return (
        <div>
            {/*<FormikContainer />
            <LoginForm />*/}
            {/*<RegistrationForm />*/}
            <RegistrationFormTwo />
        </div>
    )
}
