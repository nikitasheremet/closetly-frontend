import "./css/ImageDetails.css";
import Modal from "../Utility/Modal";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";

function ImageDetails({
  toggleIsImageDetailsShown,
  selectedImageDetails,
  setUserImages,
  setImageDetails,
}) {
  const history = useHistory();
  const updateImageInput = useRef(null);
  const { title, description, url, _id } = selectedImageDetails;
  const [editMode, setEditMode] = useState(false);
  const [localImageDetails, setLocalImageDetails] =
    useState(selectedImageDetails);

  async function onClickDeleteImage() {
    const authToken = localStorage.getItem("closetlyToken");

    if (authToken) {
      try {
        await axios.post(
          "http://localhost:3000/removeImage",
          { imageId: _id },
          { headers: { Authorization: `Basic ${authToken}` } }
        );
        setUserImages((state) => state.filter((image) => image._id !== _id));
        toggleIsImageDetailsShown(false);
      } catch (err) {
        console.error("image could not be deleted", err);
      }
    } else {
      history.push("/login");
    }
  }
  const onChangeFormInput = (e) => {
    setLocalImageDetails((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeImage = () => {
    updateImageInput.current.click();
  };
  const saveUpdatedFields = async () => {
    const authToken = localStorage.getItem("closetlyToken");

    if (authToken) {
      try {
        // await axios.post(
        //   "http://localhost:3000/removeImage",
        //   { imageId: _id },
        //   { headers: { Authorization: `Basic ${authToken}` } }
        // );
        setUserImages((state) =>
          state.map((imageDetails) => {
            if (imageDetails._id === _id) {
              return localImageDetails;
            } else {
              return imageDetails;
            }
          })
        );
        setImageDetails(localImageDetails);
        setEditMode(false);
      } catch (err) {
        console.error("details could not be saved", err);
      }
    } else {
      history.push("/login");
    }
  };
  const handleNewImageChange = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLocalImageDetails((state) => ({ ...state, url: e.target.result }));
    };
    reader.readAsDataURL(updateImageInput.current.files[0]);
  };
  return (
    <Modal>
      <div className="buttons">
        <button onClick={() => toggleIsImageDetailsShown(false)}>X</button>
        <div className="delete-photo-icon" onClick={onClickDeleteImage}></div>
        {editMode ? (
          <>
            <button onClick={saveUpdatedFields}>Save</button>
            <button
              onClick={() => {
                setLocalImageDetails(selectedImageDetails);
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      </div>
      {editMode ? (
        <input
          name="title"
          value={localImageDetails.title}
          onChange={onChangeFormInput}
        ></input>
      ) : (
        <p className="image-name">{title}</p>
      )}
      <img
        className="clothing-image"
        alt={`${title} - ${description}`}
        src={editMode ? localImageDetails.url : url}
      ></img>
      {editMode && <button onClick={handleChangeImage}>updateImage</button>}
      {editMode && (
        <input
          type="file"
          ref={updateImageInput}
          style={{ display: "none" }}
          onChange={handleNewImageChange}
        ></input>
      )}
      {editMode ? (
        <input
          name="description"
          value={localImageDetails.description}
          onChange={onChangeFormInput}
        ></input>
      ) : (
        <div className="additional-details">{description}</div>
      )}
    </Modal>
  );
}

export default ImageDetails;
