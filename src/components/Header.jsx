import React from "react"
import ThemeSwitcher from "./ThemeSwitcher"

export default function Header() {
    return (
        <header className="header">
            <img 
                src=""
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <ThemeSwitcher />
        </header>
    )
}