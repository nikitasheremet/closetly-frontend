import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ImageCard from "./ImageCard";
import ImageDetails from "./ImageDetails";
import serverRequest from "../../helpers/serverRequest";

function Main() {
  let history = useHistory();
  const [userImages, setUserImages] = useState([]);
  const [isUploadModalShown, toggleUploadModalShownState] = useState(false);
  const [isImageDetailsShown, togglIsImageDetailsShown] = useState(false);
  const [selectedImageDetails, setImageDetails] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const addPictureClick = () => {
    toggleUploadModalShownState(true);
  };
  const handleTagChange = (e) => {
    if (e.target.checked) {
      setSelectedTags((state) => [...state, e.target.name]);
    } else {
      setSelectedTags((state) =>
        state.filter((selectedTag) => selectedTag !== e.target.name)
      );
    }
  };

  useEffect(() => {
    const arrayOfTags = userImages.reduce((allTags, userImage) => {
      if (userImage.tags) {
        return [...allTags, ...userImage.tags];
      } else {
        return allTags;
      }
    }, []);

    setTags(Array.from(new Set(arrayOfTags)));
  }, [userImages]);
 
  
  useEffect(() => {
    async function fetchImages() {
      try {
        const result = await serverRequest(
          "get",
          "http://localhost:3000/image/showPictures",
          {},
          history
        );
        if (result) {
          setUserImages(result);
        }
      } catch (err) {
        console.log("Could not fetch images", err);
      }
    }
    fetchImages();
  }, [history]);
  const filterImagesBasedOnTags = (image) => {
    if (!selectedTags.length) {
      return true;
    }
    const selectedTagsPresentInImageTag = image.tags
      ?.map((imageTag) => {
        if (selectedTags.includes(imageTag)) {
          return imageTag;
        } else {
          return undefined
        }
      })
      .filter((tag) => tag);
    if (selectedTagsPresentInImageTag?.length) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
        </ul>
      </nav>
      <div>
        <div>
          <button onClick={addPictureClick}>Add Picture</button>
          {isUploadModalShown && (
            <ImageUpload
              toggleUploadModalShownState={toggleUploadModalShownState}
              setUserImages={setUserImages}
            ></ImageUpload>
          )}
        </div>
        {tags.map((tag) => {
          return (
            <div key={tag + Number(tag)}>
              <input
                type="checkbox"
                onChange={handleTagChange}
                checked={selectedTags.includes(tag)}
                id={tag}
                className="tag-checkbox-filter"
                name={tag}
              ></input>
              <label htmlFor={tag}>{tag}</label>
            </div>
          );
        })}
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {userImages?.map((image) => {
            if (filterImagesBasedOnTags(image)) {
              return (
                <ImageCard
                  togglIsImageDetailsShown={togglIsImageDetailsShown}
                  setImageDetails={setImageDetails}
                  key={image.name}
                  imageDetails={image}
                />
              );
            } else {
              return undefined
            }
          })}
        </div>
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
    </Fragment>
  );
}

export default Main;
