import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios"
import {
    Link,
    useHistory
  } from "react-router-dom";
import "./ImageUpload.css"

function ImageUpload() {
    function uploadImage(e) {
        e.preventDefault()
        console.log(e)
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