import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios"
import {
    Link,
    useHistory
  } from "react-router-dom";
import "./ImageUpload.css"

function ImageUpload({toggleUploadModalShownState}) {
    function uploadImage(e) {
        e.preventDefault()
        console.log(e)
        // make axios call to save the image
        // if successful close modal, if failure show error message and dont close modal
        // if successful update array of images shown on main page with new image
        toggleUploadModalShownState(false)
    }
 return (
  <div id='image-upload-modal'>
      <form onSubmit={uploadImage}>
          <label htmlFor='file-upload'>Select a file or take a picture</label>
          <input name="clothing-picture" id='file-upload' type="file"></input>
          
          <label htmlFor="clothing-description">OPTIONAL: Add a brief description</label>
          <textarea name="clothingDescription" id="clothing-description"></textarea>

          <button type="submit">Upload</button>
      </form>
  </div>
 )
}

export default ImageUpload;