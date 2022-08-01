import styled from "styled-components";
import { useEffect, useState } from "react";

const Modal = ({ children }) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const innerModal = document.getElementById("inner-modal");
    setInnerHeight(innerModal?.scrollHeight || 0);
    setInnerWidth(innerModal?.scrollWidth || 0);
  }, []);

  return (
    <ModalWrapper id="modal">
      <InnerModal
        id="inner-modal"
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      >
        {children}
      </InnerModal>
    </ModalWrapper>
  );
};

const ModalWrapper = styled("div")`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;
const InnerModal = styled("div")`
  z-index: 100;
  position: absolute;
  top: calc((100vh - ${({ innerHeight }) => innerHeight}px) / 2);
  left: calc((100vw - ${({ innerWidth }) => innerWidth}px) / 2);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80vw;
  max-height: 80vh;
`;

export default Modal;
