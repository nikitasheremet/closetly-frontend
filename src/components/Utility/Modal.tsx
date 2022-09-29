import styled from "styled-components";
import React, { useEffect, useState } from "react";

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
        // stop propagation so that only clicking outside the inner modal can close the modal
        onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
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
  z-index: 100;
`;
const InnerModal = styled.div<{ innerHeight: number; innerWidth: number }>`
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
