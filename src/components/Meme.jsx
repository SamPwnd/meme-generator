import React from "react"
import html2canvas from "html2canvas"
import { Button } from 'actify'
import { TextField } from "actify"


export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        image: "http://i.imgflip.com/1bij.jpg",
    })
    const [allMemes, setAllMemes] = React.useState([])
    const [fontSize, setFontSize] = React.useState(24)
    const fileInputRef = React.useRef(null)

    const takeScreenshot = () => {
        const element = document.getElementById('resMeme');
        if(!element) return;
        html2canvas(element, {
            useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
            }).then((canvas) => {
            let image = canvas.toDataURL("image/jpeg");
            const a = document.createElement('a');
            a.href = image;
            a.download = `meme-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}.jpeg`;
            a.click();

        }).catch(err => {
            console.error('Screenshot not possible')
        })
    }
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            image: url
        }))
    }
    
    function handleChange(event) {
        if (!event.target) return
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    function handleUploadClick() {
        fileInputRef.current.click()
    }
    function imageUploaded(event) {
        const url = URL.createObjectURL(event.target.files[0])
        event.target.value = null
        setMeme(prevMeme => ({
            ...prevMeme,
            image: url
        })) 
    }
    function changeFontSize(event) {
        setFontSize(event.target.value)
    }

    return (
        <main className="container mx-auto px-6">
            <div className="form">
                <TextField 
                    label="Top text"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                <TextField 
                    label="Bottom text"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <Button variant="elevated" onClick={handleUploadClick}>
                    Use your base
                </Button>
                <input 
                    type="file"
                    name="image"
                    style={{"display": "none"}}
                    ref={fileInputRef}
                    onChange={imageUploaded}
                />
                <input
                    type="range"
                    name="fontSize"
                    value={fontSize}
                    min="20" max="100"
                    step="1"
                    onChange={changeFontSize}
                />
                <Button 
                    variant="elevated" color="primary"
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a random meme base 
                </Button>
            </div>
            <div className="meme" id="resMeme">
                <img src={meme.image} className="meme--image" />
                <h2 style={{ fontSize: `${fontSize}px`}} className="meme--text top">{meme.topText}</h2>
                <h2 style={{ fontSize: `${fontSize}px`}} className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <Button onClick={takeScreenshot}>DOWNLOAD</Button>
        </main>
    )
}