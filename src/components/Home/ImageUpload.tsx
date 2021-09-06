import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css/ImageUpload.css";
import Modal from "../Utility/Modal";
import serverRequest from "../../helpers/serverRequest";

function ImageUpload({ toggleUploadModalShownState, setUserImages }) {
  const imageRef = useRef(null);
  const tagRef = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    title: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
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
      const dbPayload = {
        description: imageDetails.description,
        title: imageDetails.title,
        name: uploadImageResponse.data.public_id,
        url: uploadImageResponse.data.url,
        tags
      }
      await serverRequest("post", `/image/saveImage`, dbPayload, history)
        setIsLoading(false);
        toggleUploadModalShownState(false);
        setUserImages((state) => [
          ...state,
          {
            url: uploadImageResponse.data.url,
            name: uploadImageResponse.data.public_id,
            description: imageDetails.description,
            title: imageDetails.title,
            tags
          },
        ]);
    } catch (err) {
      console.log("Image upload failed", err);
      setIsLoading(false);
    }
  }
  const onChangeFormInput = (e) => {
    setImageDetails((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const addTag = async () => {
    const updateTag = async (tagName) => {
      setTags((state) => [...state, tagName]);
    };
    if (tagRef.current.value.trim()) {
      await updateTag(tagRef.current.value);
      tagRef.current.value = "";
    }
  };

  const deleteTag = (tagName) => {
    setTags((state) => state.filter((tag) => tag !== tagName));
  };
  return (
    <Modal>
      {!isLoading && (
        <>
          <button onClick={() => toggleUploadModalShownState(false)}>X</button>
          <label htmlFor="file-upload">Select a file or take a picture</label>
          <input
            name="clothing-picture"
            ref={imageRef}
            id="file-upload"
            type="file"
          ></input>

          <label htmlFor="image-title">Cloting Item Title</label>
          <input
            name="title"
            id="image-title"
            value={imageDetails.title}
            onChange={onChangeFormInput}
          ></input>
          <label htmlFor="clothing-description">
            OPTIONAL: Add a brief description
          </label>
          <textarea
            name="description"
            id="clothing-description"
            value={imageDetails.description}
            onChange={onChangeFormInput}
          ></textarea>
          <label htmlFor="tag-input"></label>
          <input ref={tagRef} onKeyDown={e => {
            console.log("")
            if (e.key === "Enter") {
              addTag()
            }
          }} id="tag-input" name="tag"></input>
          <button onClick={addTag} >Add</button>
          {tags.map((tag) => {
            return (
              <span
                className="tag-name"
                key={tag + Number(tag)}
                onClick={() => deleteTag(tag)}
              >
                {tag}
              </span>
            );
          })}

          <button onClick={uploadImage}>Upload</button>
        </>
      )}
      {isLoading && <div id="loading-indicator"></div>}
    </Modal>
  );
}

export default ImageUpload;
