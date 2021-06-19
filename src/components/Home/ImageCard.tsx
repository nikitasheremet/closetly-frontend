import "./css/ImageCard.css"
function ImageCard({imageDetails}) {
    const {name, description, url} = imageDetails
    return (
        <div className="image-card" key={name}>
            <img className="image-photo" src={url}/>
            <div className="photo-description">{description}</div>
            <div className="delete-photo-icon"></div>
        </div>
    )
}

export default ImageCard