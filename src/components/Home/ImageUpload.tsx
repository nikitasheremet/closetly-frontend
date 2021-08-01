import { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css/ImageUpload.css";
import Modal from "../Utility/Modal";

function ImageUpload({ toggleUploadModalShownState, setUserImages }) {
  const imageRef = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [imageDetails, setImageDetails] = useState({title: "", description: ""})
  async function uploadImage(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const imageFile = imageRef.current.files[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      const uploadImageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/decc6odzg/image/upload",
        formData
      );
      const authToken = localStorage.getItem("closetlyToken");
      if (authToken) {
        await axios
          .post(
            "http://localhost:3000/saveImage",
            {
              description: imageDetails.description,
              title: imageDetails.title,
              name: uploadImageResponse.data.public_id,
              url: uploadImageResponse.data.url,
            },
            { headers: { Authorization: `Basic ${authToken}` } }
          )
          .catch((err) => {
            if (err.response.status === 403) {
              history.push("/login");
            }
          });
        setIsLoading(false);
        toggleUploadModalShownState(false);
        setUserImages((state) => [
          ...state,
          {
            url: uploadImageResponse.data.url,
            name: uploadImageResponse.data.public_id,
            description: imageDetails.description,
            title: imageDetails.title,
          },
        ]);
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log("Image upload failed", err);
      setIsLoading(false);
    }
  }
  const onChangeFormInput = (e) => {
    setImageDetails(state => ({...state, [e.target.name]: e.target.value}))
  }
  return (
    <Modal>
      {!isLoading && (
        <>
         <button onClick={() => toggleUploadModalShownState(false)}>X</button>
        <form onSubmit={uploadImage}>
          <label htmlFor="file-upload">Select a file or take a picture</label>
          <input
            name="clothing-picture"
            ref={imageRef}
            id="file-upload"
            type="file"
          ></input>

          <label htmlFor="image-title">Cloting Item Title</label>
          <input name="title" id="image-title" 
          value={imageDetails.title}
          onChange={onChangeFormInput}
          >

          </input>
          <label htmlFor="clothing-description">
            OPTIONAL: Add a brief description
          </label>
          <textarea
            name="description"
            id="clothing-description"
            value={imageDetails.description}
            onChange={onChangeFormInput}
          ></textarea>

          <button type="submit">Upload</button>
        </form>
        </>
      )}
      {isLoading && <div id="loading-indicator"></div>}
    </Modal>
  );
}

export default ImageUpload;
