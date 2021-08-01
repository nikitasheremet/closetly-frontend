import "./css/ImageCard.css"
function ImageCard({imageDetails, togglIsImageDetailsShown, setImageDetails}) {
    const {name, description, url} = imageDetails
    return (
        <div onClick={() => {
            setImageDetails(imageDetails)
            togglIsImageDetailsShown(true)}} className="image-card">
            <img className="image-photo" src={url} alt={name}/>
            <div className="photo-description">{description}</div>
        </div>
    )
}

export default ImageCard