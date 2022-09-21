import styled from "styled-components";
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
  const [showDeleteConfirmation, toggleDeleteConfirmation] = useState(false);

  async function onClickDeleteImage() {
    await serverRequest("post", `image/removeImage`, { imageId: _id }, history);
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
    await serverRequest("post", `image/updateImage`, detailsToUpdate, history);
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
  const closeImageDetailsView = (): void => {
    toggleIsImageDetailsShown(false);
  };
  return (
    <Modal clickToClose={closeImageDetailsView}>
      <div style={{ width: "100%", height: "100%" }}>
        <CloseModalButton onClick={() => closeImageDetailsView()}>
          X
        </CloseModalButton>
        {showDeleteConfirmation ? (
          <>
            <p>Are you sure you want to delete this image?</p>
            <button onClick={onClickDeleteImage}>Yes</button>
            <button onClick={() => toggleDeleteConfirmation(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="buttons">
              {editMode ? (
                <>
                  <SaveChangesButton onClick={saveUpdatedFields}>
                    Save
                  </SaveChangesButton>
                  <DeleteImageButton
                    className="delete-photo-icon"
                    onClick={() => toggleDeleteConfirmation(true)}
                  >
                    Delete
                  </DeleteImageButton>
                  <EditDetailsButton
                    onClick={() => {
                      setLocalImageDetails(selectedImageDetails);
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </EditDetailsButton>
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
              <ImageTitle className="image-name">{title}</ImageTitle>
            )}
            <ImageDetailsImg
              className="clothing-image"
              alt={`${title} - ${description}`}
              src={editMode ? localImageDetails.url : url}
            ></ImageDetailsImg>
            {editMode && (
              <button onClick={handleChangeImage}>updateImage</button>
            )}
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
              <ImageDescriptionDiv>
                <ImageDescriptionTitle>Details</ImageDescriptionTitle>
                <ImageDescription className="additional-details">
                  {description}
                </ImageDescription>
              </ImageDescriptionDiv>
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
            {editMode ? (
              localImageDetails.tags?.map((tag) => {
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
            ) : (
              <TagsDiv>
                {tags?.map((tag) => {
                  return (
                    <ImageTag
                      className="tag-name-details"
                      key={tag + Number(tag)}
                    >
                      {tag}
                    </ImageTag>
                  );
                })}
              </TagsDiv>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

export default ImageDetails;

const ImageDetailsImg = styled("img")`
  width: 100%;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const SaveChangesButton = styled.button``;

const EditDetailsButton = styled.button``;

const DeleteImageButton = styled.button``;

const ImageTitle = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin: 0;
  padding: 10px 0 10px 0;
  font-weight: 500;
`;

const ImageTag = styled.div`
  background-color: #d0d0d0;
  padding: 5px 10px 5px 10px;
  border-radius: 30px;
  font-weight: 600;
  width: fit-content;
`;

const ImageDescriptionTitle = styled.p`
  margin: 0px;
  font-size: 1.1em;
  font-weight: 400;
  padding-top: 10px;
`;
const ImageDescription = styled.p`
  border-radius: 10px;
  padding: 15px;
  margin: 0px;
`;

const ImageDescriptionDiv = styled.div`
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  margin: 10px 0 10px 0;
`;

const TagsDiv = styled.div`
  display: flex;
  column-gap: 5px;
  flex-wrap: wrap;
`;
