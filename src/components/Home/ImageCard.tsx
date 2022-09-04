import "./css/ImageCard.css";
function ImageCard({
  imageDetails,
  toggleIsImageDetailsShown,
  setImageDetails,
}) {
  const { _id, title, url } = imageDetails;
  return (
    <div
      onClick={() => {
        setImageDetails(imageDetails);
        toggleIsImageDetailsShown(true);
      }}
      className="image-card"
    >
      <div className="photo-title">{title}</div>
      <img className="image-photo" src={url} alt={_id} />
    </div>
  );
}

export default ImageCard;
