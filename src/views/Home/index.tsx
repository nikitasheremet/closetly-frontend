import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../components/Home/ImageUpload";
import ImageCard from "../../components/Home/ImageCard";
import ImageDetails from "../../components/Home/ImageDetails";
import serverRequest from "../../helpers/serverRequest";
import Navbar from "../../components/Navbar";
import { ImageDetailsInterface } from "../../components/Home/types/ImageTypes";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import TagFilters from "./components/TagFilters";
function Main() {
  let history = useHistory();
  const [userImages, setUserImages] = useState<ImageDetailsInterface[]>([]);
  const [isUploadModalShown, toggleUploadModalShownState] = useState(false);
  const [isImageDetailsShown, togglIsImageDetailsShown] = useState(false);
  const [selectedImageDetails, setImageDetails] = useState<
    ImageDetailsInterface | {}
  >({});
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const addPictureClick = (): void => {
    toggleUploadModalShownState(true);
  };
  const addTag = (tagName: string) => {
    setSelectedTags((currentSelectedTagState) => [
      ...currentSelectedTagState,
      tagName,
    ]);
  };
  function removeTag(tagNameToRemove: string) {
    setSelectedTags((currentSelectedTags) =>
      currentSelectedTags.filter(
        (selectedTag) => selectedTag !== tagNameToRemove
      )
    );
  }

  useEffect(() => {
    const arrayOfTags = userImages.reduce((allTags, userImage) => {
      if (userImage.tags) {
        return [...allTags, ...userImage.tags];
      } else {
        return allTags;
      }
    }, [] as string[]);

    setTags(Array.from(new Set(arrayOfTags)));
  }, [userImages]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const result = await serverRequest(
          "get",
          `image/showPictures`,
          {},
          history
        );
        if (result) {
          console.log(result);
          setUserImages(result);
        }
      } catch (err) {
        console.log("Could not fetch images", err);
      }
    }
    fetchImages();
  }, [history]);
  function filterBasedOnSearchInput(image: ImageDetailsInterface) {
    if (
      image.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      image.description.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return true;
    }
    return false;
  }
  const filterImagesBasedOnTags = (image: ImageDetailsInterface) => {
    const imageTagsSet = new Set(image.tags);
    // if no selected tags return true, check if every selected tag is present in the images tags array
    return (
      !selectedTags.length ||
      !!selectedTags.every((selectedTag) => imageTagsSet.has(selectedTag))
    );
  };
  return (
    <>
      <Navbar />
      <div>
        <SearchSortDiv>
          <SearchBar onChange={setSearchInput} value={searchInput} />
          <TagFilters
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            selectedTags={selectedTags}
          />
        </SearchSortDiv>
        <ClosetImagesContainer>
          {userImages
            ?.filter(filterImagesBasedOnTags)
            .filter(filterBasedOnSearchInput)
            .map((image) => (
              <ImageCard
                toggleIsImageDetailsShown={togglIsImageDetailsShown}
                setImageDetails={setImageDetails}
                key={image._id}
                imageDetails={image}
              />
            ))}
        </ClosetImagesContainer>
        <div>
          {isImageDetailsShown && (
            <ImageDetails
              setUserImages={setUserImages}
              toggleIsImageDetailsShown={togglIsImageDetailsShown}
              selectedImageDetails={selectedImageDetails}
              setImageDetails={setImageDetails}
            ></ImageDetails>
          )}
        </div>
      </div>
      <AddImageButton onClick={addPictureClick}>
        <ImageIcon className="material-symbols-outlined">add</ImageIcon>
      </AddImageButton>
      {isUploadModalShown && (
        <ImageUpload
          toggleUploadModalShownState={toggleUploadModalShownState}
          setUserImages={setUserImages}
        ></ImageUpload>
      )}
    </>
  );
}

export default Main;

const ClosetImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: calc(100vh - 51px + 68px);
  overflow: auto;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  column-gap: 10px;
`;

const AddImageButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50px;
  height: 70px;
  width: 70px;
  font-size: 60px;
  font-weight: lighter;
  background-color: white;
  border: 2px solid #393939;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 5px 0px #393939;
`;
const ImageIcon = styled.span`
  font-size: 80px;
  color: #393939;
`;
const SearchSortDiv = styled.div`
  display: flex;
  padding: 15px;
`;
