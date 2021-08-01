import "./css/ImageDetails.css";
import Modal from "../Utility/Modal";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ImageDetails({ toggleIsImageDetailsShown, selectedImageDetails, setUserImages }) {
  console.log(selectedImageDetails);
  const history = useHistory();
  const { title, description, url, _id } = selectedImageDetails;

  async function onClickDeleteImage() {
    const authToken = localStorage.getItem("closetlyToken");
    if (authToken) {
      try {
        await axios.post(
          "http://localhost:3000/removeImage",
          { imageId: _id },
          { headers: { Authorization: `Basic ${authToken}` } }
        );
        setUserImages(state => state.filter(image => image._id !== _id))
        toggleIsImageDetailsShown(false)
      } catch (err) {
        console.error("image could not be deleted", err)
      }
      
    } else {
      history.push("/login");
    }
  }
  return (
    <Modal>
      <div className="buttons">
        <button onClick={() => toggleIsImageDetailsShown(false)}>X</button>
        <div className="delete-photo-icon" onClick={onClickDeleteImage}></div>
      </div>
      <p className="image-name">{title}</p>
      <img className="clothing-image" alt={`${title} - ${description}}`} src={url}></img>
      <div className="additional-details">{description}</div>
    </Modal>
  );
}

export default ImageDetails;
