import "./css/ImageDetails.css";
import Modal from "../Utility/Modal";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import serverRequest from "../../helpers/serverRequest";

function ImageDetails({
  toggleIsImageDetailsShown,
  selectedImageDetails,
  setUserImages,
  setImageDetails,
}) {
  const history = useHistory();
  const tagRef = useRef(null);
  const updateImageInput = useRef(null);
  const { title, description, url, _id, tags } = selectedImageDetails;
  const [editMode, setEditMode] = useState(false);
  const [localImageDetails, setLocalImageDetails] =
    useState(selectedImageDetails);

  async function onClickDeleteImage() {
    await serverRequest("post",`/image/removeImage`, { imageId: _id }, history)
    setUserImages((state) => state.filter((image) => image._id !== _id));
    toggleIsImageDetailsShown(false);
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
    const { name, user, ...detailsToUpdate } = localImageDetails;
    await serverRequest("post",`/image/updateImage`, detailsToUpdate, history)
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
  };
  const handleNewImageChange = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLocalImageDetails((state) => ({ ...state, url: e.target.result }));
    };
    reader.readAsDataURL(updateImageInput.current.files[0]);
  };
  const addTag = async () => {
    const updateTag = async (tagName) => {
      setLocalImageDetails((state) => ({
        ...state,
        tags: [...(state.tags ? state.tags : []), tagName],
      }));
    };
    if (tagRef.current.value.trim()) {
      await updateTag(tagRef.current.value);
      tagRef.current.value = "";
    }
  };
  const deleteTag = (tagName) => {
    setLocalImageDetails((state) => ({
      ...state,
      tags: state.tags.filter((tag) => tag !== tagName),
    }));
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
      {editMode && (
        <>
          <label htmlFor="tag-input"></label>
          <input
            ref={tagRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
            id="tag-input"
            name="tag"
          ></input>
          <button onClick={addTag}>Add</button>
        </>
      )}
      {editMode
        ? localImageDetails.tags?.map((tag) => {
            return (
              <span
                className="tag-name"
                key={tag + Number(tag)}
                onClick={() => deleteTag(tag)}
              >
                {tag}
              </span>
            );
          })
        : tags?.map((tag) => {
            return (
              <span className="tag-name-details" key={tag + Number(tag)}>
                {tag}
              </span>
            );
          })}
    </Modal>
  );
}

export default ImageDetails;
