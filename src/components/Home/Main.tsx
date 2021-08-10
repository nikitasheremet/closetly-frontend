import { Fragment, useEffect, useState } from "react";
import axios from "axios"
import {
    Link,
    useHistory
  } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ImageCard from "./ImageCard"
import ImageDetails from "./ImageDetails";

function Main() {
  const [userImages, setUserImages] = useState([])
  const [isUploadModalShown, toggleUploadModalShownState] = useState(false)
  const [isImageDetailsShown, togglIsImageDetailsShown] = useState(false)
  const [selectedImageDetails, setImageDetails] = useState({})
  const addPictureClick = () => {
    toggleUploadModalShownState(true)
  }

  
    let history = useHistory();
    async function fetchImages() {
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
        fetchImages()
        // eslint-disable-next-line
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
          <button onClick={addPictureClick}>Add Picture</button>
          {isUploadModalShown && <ImageUpload toggleUploadModalShownState={toggleUploadModalShownState} setUserImages={setUserImages}></ImageUpload>}
        </div>
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          {userImages?.map(image => {
            return (<ImageCard togglIsImageDetailsShown={togglIsImageDetailsShown} setImageDetails={setImageDetails} key={image.name} imageDetails={image}/>)
          })}
        </div>
        <div>
          {isImageDetailsShown && <ImageDetails setUserImages={setUserImages} toggleIsImageDetailsShown={togglIsImageDetailsShown} selectedImageDetails={selectedImageDetails} setImageDetails={setImageDetails}></ImageDetails>}
        </div>
        
      </div>
  </Fragment>
 )
}

export default Main;