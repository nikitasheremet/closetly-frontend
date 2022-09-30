import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authContext } from "../../../../hooks/authContent/authContext";
import Navbar from "../../../../components/Navbar";
const LandingPage = () => {
  const history = useHistory();
  const authToken = useContext(authContext);
  console.log(authToken);

  useEffect(() => {
    if (authToken) {
      history.push("/home");
    }
  }, [authToken, history]);
  return (
    <LandingPageWrapper>
      <Navbar />
      <LandingPageWelcomeMessage>
        Welcome to Closetly! <br /> Welcome to a more organized you!
      </LandingPageWelcomeMessage>
      <CtaButtonWrapper>
        <button onClick={() => history.push("/login")}>Login</button>
        <button onClick={() => history.push("/register")}>Register</button>
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
const CtaButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  justify-content: center;
`;

export default LandingPage;
