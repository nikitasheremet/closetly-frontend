import "./css/Modal.css"

const Modal = ({children}) => {
  return (
    <div id="modal">
      <div id="inner-modal">{children}</div>
    </div>
  );
};

export default Modal;
