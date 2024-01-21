import React from "react"
import Header from "./components/Header"
import Meme from "./components/Meme"
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import './App.scss'

export default function App() {
    return (
        <div>
            <Header />
            <Meme />
        </div>
    )
}
