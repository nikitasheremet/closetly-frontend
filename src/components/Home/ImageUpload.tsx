import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/ImageUpload.css";
import Modal from "../Utility/Modal";
import serverRequest from "../../helpers/serverRequest";
import { ImageDetailsInterface } from "./types/ImageTypes";
import {
  CloseModalButton,
  ImageTag,
  DeleteTagIconSpan,
} from "./styledComponents";
import styled from "styled-components";

interface ImageUploadProps {
  toggleUploadModalShownState: React.Dispatch<React.SetStateAction<boolean>>;
  setUserImages: React.Dispatch<React.SetStateAction<ImageDetailsInterface[]>>;
}

function ImageUpload({
  toggleUploadModalShownState,
  setUserImages,
}: ImageUploadProps) {
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
      formData.append("closet-image", imageFile);
      formData.append("enctype", "multipart/form-data");
      formData.append("description", imageDetails.description);
      formData.append("title", imageDetails.title);
      formData.append("tags", JSON.stringify(tags));

      const uploadImageResponse = await serverRequest(
        "post",
        `image/saveImage`,
        formData,
        history
      );
      setIsLoading(false);
      toggleUploadModalShownState(false);
      setUserImages((state) => [
        ...state,
        {
          url: uploadImageResponse.url,
          _id: uploadImageResponse.public_id,
          description: imageDetails.description,
          title: imageDetails.title,
          tags,
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

  const isUploadDisabled = !(imageDetails.title && imageRef);

  const deleteTag = (tagName) => {
    setTags((state) => state.filter((tag) => tag !== tagName));
  };
  return (
    <Modal>
      {!isLoading && (
        <>
          <CloseModalButton onClick={() => toggleUploadModalShownState(false)}>
            X
          </CloseModalButton>
          <UploadInputDiv>
            <label htmlFor="file-upload">Select a file or take a picture</label>
            <input
              name="clothing-picture"
              ref={imageRef}
              id="file-upload"
              type="file"
            ></input>
          </UploadInputDiv>

          <UploadInputDiv>
            <label htmlFor="image-title">Cloting Item Title</label>
            <input
              name="title"
              id="image-title"
              value={imageDetails.title}
              onChange={onChangeFormInput}
            ></input>
          </UploadInputDiv>
          <UploadInputDiv>
            <label htmlFor="clothing-description">
              OPTIONAL: Add a brief description
            </label>
            <textarea
              name="description"
              id="clothing-description"
              value={imageDetails.description}
              onChange={onChangeFormInput}
            ></textarea>
          </UploadInputDiv>
          <UploadInputDiv>
            <label htmlFor="tag-input">Add Tags</label>
            <AddTagInputAndButtonDiv>
              <input
                ref={tagRef}
                onKeyDown={(e) => {
                  console.log("");
                  if (e.key === "Enter") {
                    addTag();
                  }
                }}
                id="tag-input"
                name="tag"
              ></input>
              <AddTagButton onClick={addTag}>Add</AddTagButton>
            </AddTagInputAndButtonDiv>
          </UploadInputDiv>
          <UploadTagsAdded>
            {tags.map((tag) => {
              return (
                <ImageTag
                  className="tag-name"
                  key={tag + Number(tag)}
                  onClick={() => deleteTag(tag)}
                >
                  {tag}
                  <DeleteTagIconSpan>X</DeleteTagIconSpan>
                </ImageTag>
              );
            })}
          </UploadTagsAdded>
          <AddImageToClosetButton
            onClick={uploadImage}
            disabled={isUploadDisabled}
          >
            Add Image To Closet
          </AddImageToClosetButton>
        </>
      )}
      {/* Create generic loading indicator */}
      {isLoading && <div id="loading-indicator"></div>}
    </Modal>
  );
}

export default ImageUpload;

const UploadInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin: 0 0 10px 0;
`;

const AddTagButton = styled.button`
  width: 20%;
`;

const AddTagInputAndButtonDiv = styled.div`
  display: flex;
  column-gap: 10px;
`;

const AddImageToClosetButton = styled.button`
  cursor: pointer;
  ${({ disabled }) =>
    disabled && "background-color: light-grey; pointer-events: none;"}
`;

const UploadTagsAdded = styled.div`
  display: flex;
  column-gap: 10px;
  margin: 0 0 10px 0;
`;
