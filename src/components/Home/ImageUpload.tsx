import { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css/ImageUpload.css";
import Modal from "../Utility/Modal";

function ImageUpload({ toggleUploadModalShownState, setUserImages }) {
  const imageRef = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
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
              description: "",
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
  return (
    <Modal>
      {!isLoading && (
        <form onSubmit={uploadImage}>
          <label htmlFor="file-upload">Select a file or take a picture</label>
          <input
            name="clothing-picture"
            ref={imageRef}
            id="file-upload"
            type="file"
          ></input>

          <label htmlFor="image-title">Cloting Item Title</label>
          <input name="imageTitle" id="image-title"></input>
          <label htmlFor="clothing-description">
            OPTIONAL: Add a brief description
          </label>
          <textarea
            name="clothingDescription"
            id="clothing-description"
          ></textarea>

          <button type="submit">Upload</button>
        </form>
      )}
      {isLoading && <div id="loading-indicator"></div>}
    </Modal>
  );
}

export default ImageUpload;
