import s from './Layout.module.css'
import React, {ReactNode} from "react";
import {useTheme} from "../../providers/ThemeProvider";

export const Layout = React.memo(({children}: { children: ReactNode }) => {

    const {state} = useTheme();
    const finallyClass =  state.theme === 'Dark' ? `${s.layout} ${s.dark}` : s.layout
    return (
        <div className={finallyClass}>
            {children}
        </div>
    )
})