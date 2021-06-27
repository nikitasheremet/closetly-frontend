import axios from "axios"
import {
    useHistory
  } from "react-router-dom";
import "./css/ImageCard.css"
function ImageCard({imageDetails}) {
    const history = useHistory()
    const {name, description, url, _id} = imageDetails

    async function onClickDeleteImage () {
        const authToken = localStorage.getItem('closetlyToken')
            if (authToken) {
        await axios.post("http://localhost:3000/removeImage", {imageId: _id} , {headers: {'Authorization': `Basic ${authToken}`}})
            }else {
                history.push('/login')
            }
    }
    return (
        <div className="image-card">
            <img className="image-photo" src={url} alt={name}/>
            <div className="photo-description">{description}</div>
            <div className="delete-photo-icon" onClick={onClickDeleteImage}></div>
        </div>
    )
}

export default ImageCard