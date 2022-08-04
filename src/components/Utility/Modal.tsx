import styled from "styled-components";
import { useEffect, useState } from "react";

const Modal = ({
  children,
  clickToClose,
}: {
  children: any;
  clickToClose?: Function;
}) => {
  const [innerHeight, setInnerHeight] = useState<undefined | number>(undefined);
  const [innerWidth, setInnerWidth] = useState<undefined | number>(undefined);
  useEffect(() => {
    const innerModal = document.getElementById("inner-modal");
    if (innerModal) {
      setInnerHeight(innerModal.clientHeight);
      setInnerWidth(innerModal.clientWidth);
    }
  }, []);

  return (
    <ModalWrapper id="modal" onClick={() => clickToClose && clickToClose()}>
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
  visibility: ${({ innerHeight, innerWidth }) =>
    innerHeight || innerWidth ? "visible" : "hidden"};
  z-index: 100;
  position: absolute;
  top: calc((100vh - ${({ innerHeight }) => innerHeight}px) / 2);
  left: calc((100vw - ${({ innerWidth }) => innerWidth}px) / 2);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80vw;
  max-height: 80vh;
  overflow: hidden;
`;

export default Modal;
