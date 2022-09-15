import styled from "styled-components";
function ImageCard({
  imageDetails,
  toggleIsImageDetailsShown,
  setImageDetails,
}) {
  const { _id, title, url } = imageDetails;
  return (
    <ImageCardDiv
      onClick={() => {
        setImageDetails(imageDetails);
        toggleIsImageDetailsShown(true);
      }}
      className="image-card"
    >
      <CardTitle className="photo-title">{title}</CardTitle>
      <TitleImageDivider />
      <ImagePhoto className="image-photo" src={url} alt={_id} />
    </ImageCardDiv>
  );
}

export default ImageCard;
const ImageCardDiv = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const ImagePhoto = styled.img`
  width: 100%;
  max-height: 100%;
  padding: 10px;
`;

const CardTitle = styled.div`
  font-size: 1.2em;
  padding: 0 0 5px 0;
`;

const TitleImageDivider = styled.hr`
  width: 100%;
`;
