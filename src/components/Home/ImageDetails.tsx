import "./css/ImageDetails.css";
import Modal from "../Utility/Modal";

function ImageDetails({togglIsImageDetailsShown}) {
  return (
    <Modal>
      <div className="buttons"></div>
      <p className="image-name"></p>
      <img className="clothing-image"></img>
      <div className="additional-details"></div>
    </Modal>
  );
}

export default ImageDetails;
