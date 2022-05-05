import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [image, setImage] = useState('')
    const [link, setLink] = useState('')

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    const strPad = str => {
        return '000'.slice(str.toString().length) + str
    }

    const randomImageUrl = () => {
        const baseUrl = 'https://ozgrozer.github.io/100k-faces/'
        const firstFolder = '0'
        const secondFolder = randomInt(0, 9)
        const randomFile = strPad(randomInt(0, 999))
        const filename = `00${secondFolder}${randomFile}`
        const fullUrl = `${baseUrl}${firstFolder}/${secondFolder}/${filename}.jpg`
        const result = {
            url: fullUrl
        }
        return result
    }
    const changeHandler = async (req, res) => {
        const result = randomImageUrl()
        setImage(result.url)
    }

    const uploadHandler = async () => {
        if (!image) return 
        try {
            fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: image }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    setLink(data.data);
                });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        changeHandler()
    },[]);

    return (
        <div className="row">
            <div className="column">
                <div className="status">
                    Photo Link: <a href={link}>Use Link</a>
                </div>
                <div className='result'  >
                    {image && <img id='photo' src={image} alt='AI Face' />}<br />
                    <Button variant='contained' color='primary' onClick={changeHandler}>New Image</Button>{' '}
                    <Button variant='contained' color='primary' onClick={uploadHandler}>Upload</Button>
                </div>
            </div>
        </div>
    )
}
