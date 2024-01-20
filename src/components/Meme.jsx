import React from "react"
import html2canvas from "html2canvas"
import { Button, TextField, Slider } from 'actify'
import { ArrowUpFromLine, Dices } from "lucide-react"

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
            useCORS: true,
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
        <main className="container sm:px-8 md:px-9 lg:px-32 px-3 my-8">
            <div className="form mb-4 grid grid-rows-3 grid-cols-2 gap-4 bg-secondary/10 p-6 rounded-lg">
                <TextField 
                    label="Top text"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                    className="row-span-1 col-span-2"
                />
                <TextField 
                    label="Bottom text"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                    className="row-span-1 col-span-2"
                />
                <div className="row-span-1 col-span-2">
                    <label htmlFor="font-slider">Text size</label>
                    <Slider labeled 
                        defaultValue={fontSize} 
                        name="fontSize"
                        value={fontSize}
                        min="1"
                        onChange={changeFontSize}
                        id="font-slider"
                    />
                </div>
                
                <Button variant="elevated" onClick={handleUploadClick} className="row-span-1 col-span-2 sm:col-span-1 p-4">
                    Use your base 
                    <ArrowUpFromLine size={24}/>
                </Button>
                <input 
                    type="file"
                    name="image"
                    style={{"display": "none"}}
                    ref={fileInputRef}
                    onChange={imageUploaded}
                />
                
                <Button 
                    variant="elevated" color="primary"
                    className="row-span-1 col-span-2 sm:col-span-1 p-4"
                    onClick={getMemeImage}
                >
                    Random meme base 
                    <Dices size={24} />
                </Button>
            </div>

            <div className="rounded-xl p-6 bg-secondary/10">
                <div className="meme" id="resMeme">
                    <img src={meme.image} className="meme--image" />
                    <h2 style={{ fontSize: `${fontSize}px`}} className="meme--text top">{meme.topText}</h2>
                    <h2 style={{ fontSize: `${fontSize}px`}} className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>
            <Button className="w-full mt-4" onClick={takeScreenshot}>DOWNLOAD MEME</Button>
        
        </main>
    )
}