import React from "react"
import ThemeSwitcher from "./ThemeSwitcher"
import { IconButton } from "actify"
import { Github, BookUser } from "lucide-react"

export default function Header() {
    return (
        <header className="header sticky top-0 z-30 backdrop-blur bg-surface/25 text-primary shadow">
            <img 
                src=""
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <nav className="flex flex-row gap-1">
                <ThemeSwitcher />
                <a href="https://github.com/SamPwnd" target="_blank">
                    <IconButton>
                        <Github size={24} />
                    </IconButton>
                </a>
                <a href="#" target="_blank">
                    <IconButton>
                        <BookUser size={24} />
                    </IconButton>
                </a>
            </nav>
            
            
        </header>
    )
}