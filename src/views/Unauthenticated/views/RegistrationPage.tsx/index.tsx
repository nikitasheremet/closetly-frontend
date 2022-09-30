import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import UserInput from "../../../../components/Utility/Input/UserInput";
import styled, { css } from "styled-components";
import serverRequest from "../../../../helpers/serverRequest";
import { Link, useHistory } from "react-router-dom";
import {
  DataIntakeInput,
  ParentPageDiv,
  SecondaryCTA,
  UnathenticatedContentDiv,
  UnauthencticatedPrimaryButtonCTA,
  UnautheticatedFormDiv,
} from "../../styledComponents";
import MidPageTitleAndSubtitle from "../../components/MidPageTitleSubtitle";

const RegistrationPage = () => {
  const history = useHistory();
  const [registrationDetails, setRegistrationDetails] = useState<{
    email: string;
    password: string;
    reEnterPassword: string;
  }>({ email: "", password: "", reEnterPassword: "" });

  const onRegistrationDetailsChange = (onChangeEvent) => {
    setRegistrationDetails((prevRegistrationDetails) => {
      return {
        ...prevRegistrationDetails,
        [onChangeEvent.target.name]: onChangeEvent.target.value,
      };
    });
  };

  const isRegisterButtonDisabled = () => {
    const { email, password, reEnterPassword } = registrationDetails;
    return !Boolean(email && password && reEnterPassword);
  };

  const registerUser = async (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    const { email, password, reEnterPassword } = registrationDetails;
    if (password !== reEnterPassword) {
      console.log("passwords don't match");
      return;
    }
    try {
      await serverRequest(
        "post",
        "user/createUser",
        { email, password },
        history,
        true
      );
    } catch (err) {
      console.error("Error creating a user", err);
    }
  };
  return (
    <ParentPageDiv>
      <Navbar />
      <MidPageTitleAndSubtitle
        title="Get Organizing with Closetly"
        subtitle="Create your account"
      />
      <UnathenticatedContentDiv>
        <UnautheticatedFormDiv>
          <DataIntakeInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.email}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <DataIntakeInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <DataIntakeInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.reEnterPassword}
            name="reEnterPassword"
            type="password"
            placeholder="Required Password"
            required
          />
          <RegisterButton disabled={isRegisterButtonDisabled()} type="submit">
            Register
          </RegisterButton>
        </UnautheticatedFormDiv>
        <AlreadyHaveAccountText>
          Already have an account?{" "}
          <SecondaryCTA to="/login">Login</SecondaryCTA>
        </AlreadyHaveAccountText>
      </UnathenticatedContentDiv>
    </ParentPageDiv>
  );
};

export default RegistrationPage;

const RegisterButton = styled(UnauthencticatedPrimaryButtonCTA)`
  margin-top: 20px;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 40%;
    `}
`;

const AlreadyHaveAccountText = styled.p``;
