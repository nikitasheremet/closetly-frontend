import React from "react";
import styled from "styled-components";
const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <LandingPageWelcomeMessage>
        Welcome to Closetly! <br /> Welcome to a more organized closet!
      </LandingPageWelcomeMessage>
      <CtaButtonWrapper>
        <button>Login</button>
        <button>Register</button>
      </CtaButtonWrapper>
    </LandingPageWrapper>
  );
};

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
`;
const LandingPageWelcomeMessage = styled.h1`
  text-align: center;
  line-height: 50px;
`;
const CtaButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  justify-content: center;
`;

export default LandingPage;
