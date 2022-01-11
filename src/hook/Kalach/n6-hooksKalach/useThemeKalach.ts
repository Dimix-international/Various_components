import {useEffect, useState} from "react";


type ThemeKalachType = 'light' | 'dark'
export const useThemeKalach = () => {

    const [theme, setTheme] = useState<ThemeKalachType>('light');

    const toggleTheme = () => {
        if(theme !== 'dark') {
            localStorage.setItem('themeLocal', 'dark');
            setTheme('dark');
        } else {
            localStorage.setItem('themeLocal', 'light');
            setTheme('light');
        }
    }

    useEffect(() => {
       const localTheme =  localStorage.getItem('themeLocal');
       if(localTheme) {
           setTheme(localTheme as ThemeKalachType)
       }
    },[])

    return{
        theme,
        toggleTheme,
    }
}