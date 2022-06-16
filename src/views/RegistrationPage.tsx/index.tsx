import { useState } from "react";
import Navbar from "../../components/Navbar";
import UserInput from "../../components/Utility/Input/UserInput";
import styled, { css } from "styled-components";

const RegistrationPage = () => {
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

  const registerUser = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    const { password, reEnterPassword } = registrationDetails;
    if (password !== reEnterPassword) {
      console.log("passwords don't match");
      return;
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ width: "50%", padding: "20px" }}>
        <form onSubmit={registerUser}>
          <UserInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.email}
            name="email"
            type="email"
            label="Email Address*"
            required
          />
          <UserInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.password}
            name="password"
            type="password"
            label="Password*"
            required
          />
          <UserInput
            onChange={onRegistrationDetailsChange}
            value={registrationDetails.reEnterPassword}
            name="reEnterPassword"
            type="password"
            label="Re-Enter Password*"
            required
          />
          <RegisterButton
            style={{ marginTop: "10px" }}
            disabled={isRegisterButtonDisabled()}
            type="submit"
          >
            Register
          </RegisterButton>
        </form>
      </div>
    </>
  );
};

const RegisterButton = styled.button`
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 70%;
    `}
`;

export default RegistrationPage;
