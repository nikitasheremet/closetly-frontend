import { FunctionComponentElement } from "react"
import "./css/Modal.css"

const Modal = ({children}) => {
  return (
    <div id="image-upload-modal">
      <div id="inner-upload-modal">{children}</div>
    </div>
  );
};

export default Modal;
