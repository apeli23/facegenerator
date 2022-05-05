import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useScreenshot } from 'use-react-screenshot';

var $ = require('jquery');

export default function Home() {
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [userprofile, takeScreenshot] = useScreenshot();
  const photo = useRef(undefined);

  let snapshot, canvas, context

  const changeHandler = async () => {
    axios.get('https://api.generated.photos/api/v1/faces?api_key=eCfoD1dw1H4Utp4Hpu82Hg&order_by=random')//YOUR_API_KEY
      .then(res => {
        let uri = res.data.faces[0].urls[4][512]
        uri && setImage(uri)

      })
  }

  const uploadHandler = async () => {
    if(!image) return upload
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
  }, []);
  return (
    <div className="container">
      <h1>AI photo generator</h1>
      <div className="row">
        <div className="column">
          <div className="status">
            Photo Link: <a href={link}>Use Link</a>
          </div>
          <div className='result'  >
            {image && <img id='photo' ref={photo} src={image} alt='AI Face' />}<br />
            <Button variant='contained' color='primary' onClick={changeHandler}>New Image</Button>{' '}
            <Button variant='contained' color='primary' onClick={uploadHandler}>Double Click to Upload</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
