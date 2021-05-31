import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios"


import {
    Link,
    useHistory
  } from "react-router-dom";

function Main() {
  const [userImages, setUserImages] = useState([])
  const fileInput = useRef(null)
  const addPictureClick = () => {
    fileInput.current.click()
  }
  const onFileSubmit = async (e) => {
    const signature = await axios.get("http://localhost:3000/getSignature")
    console.log("SIGNATURE IS:", signature.data)
    const fileInputEl = e.target
    console.log(fileInputEl.files)
    const imageFile = fileInputEl.files[0]
    const formData = new FormData()
    formData.append("file", imageFile);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    const uploadImageResponse = await axios.post("https://api.cloudinary.com/v1_1/decc6odzg/image/upload", formData)

    setUserImages([{url: uploadImageResponse.data.secure_url}])
  }
  
    let history = useHistory();
    const fetchImages = async () => {
        const authToken = localStorage.getItem('closetlyToken')
        if (authToken) {
            const pictureList = await axios.get('http://localhost:3000/showPictures', {headers: {'Authorization': `Basic ${authToken}`}}).catch(err => {
                if (err.response.status === 403) {
                    history.push('/login')
                } 
            })
            if (pictureList && pictureList.data) {
              setUserImages(pictureList.data)
            }
            
        } else {
            history.push('/login')
        }
        
    }

    useEffect(() => {
      
        // fetchImages()
    }, [])
 return (
  <Fragment>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
          </ul>
        </nav>
      <div>
        <div>
          <input ref={fileInput} onChange={onFileSubmit} style={{display: "none"}} type="file" id="imageFile" capture="environment" accept="image/*"></input>
          <button onClick={addPictureClick}>Add Picture</button>
        </div>
        {userImages.map(image => {
          return (<img key={image.url} src={image.url} width="200px"/>)
        })}
      </div>
  </Fragment>
 )
}

export default Main;