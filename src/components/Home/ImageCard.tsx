import "./css/ImageCard.css";
function ImageCard({
  imageDetails,
  toggleIsImageDetailsShown,
  setImageDetails,
}) {
  const { name, description, url } = imageDetails;
  return (
    <div
      onClick={() => {
        setImageDetails(imageDetails);
        toggleIsImageDetailsShown(true);
      }}
      className="image-card"
    >
      <img className="image-photo" src={url} alt={name} />
      <div className="photo-description">{description}</div>
    </div>
  );
}

export default ImageCard;
