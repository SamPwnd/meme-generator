import React, { useEffect } from "react";
import { Button } from "actify";
import { IconButton } from 'actify'
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = React.useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    },[]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    function toggleDarkMode() {
        setDarkMode((prevMode) => !prevMode);
    }
    return (
        <IconButton onClick={toggleDarkMode}>
            {darkMode ? 
                <Sun size={24} /> : 
                <MoonStar  size={24} />
            }
        </IconButton>
    );
};