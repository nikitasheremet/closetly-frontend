import "./css/ImageCard.css";
function ImageCard({
  imageDetails,
  toggleIsImageDetailsShown,
  setImageDetails,
}) {
  const { _id, description, url } = imageDetails;
  return (
    <div
      onClick={() => {
        setImageDetails(imageDetails);
        toggleIsImageDetailsShown(true);
      }}
      className="image-card"
    >
      <img className="image-photo" src={url} alt={_id} />
      <div className="photo-description">{description}</div>
    </div>
  );
}

export default ImageCard;
