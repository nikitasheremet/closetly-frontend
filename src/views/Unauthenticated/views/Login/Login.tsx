import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import serverRequest from "../../../../helpers/serverRequest";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  ParentPageDiv,
  DataIntakeInput,
  UnathenticatedContentDiv,
  UnautheticatedFormDiv,
  SecondaryCTA,
  UnauthencticatedPrimaryButtonCTA,
} from "../../styledComponents";
import MidPageTitleAndSubtitle from "../../components/MidPageTitleSubtitle";

function Login() {
  let history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    const loginResult = await serverRequest(
      "POST",
      "user/login",
      {
        email,
        password,
      },
      history,
      true
    );
    if (loginResult.createdToken) {
      localStorage.setItem(
        "closetlyToken",
        JSON.stringify(loginResult.createdToken)
      );
    }
    if (loginResult.loggedIn) {
      console.log("1");
      history.push("/home");
    }
  };

  const updateData = (updateEvent: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { name: formKey, value },
    } = updateEvent;
    setFormData((formData) => ({ ...formData, [formKey]: value }));
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("closetlyToken");
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, {
            headers: { Authorization: `Basic ${token}` },
          });
          console.log("pushing to '/'");
          history.push("/");
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [history]);
  return (
    <ParentPageDiv>
      <Navbar />
      <MidPageTitleAndSubtitle
        title="Sign In"
        subtitle="Enter your email and password"
      />
      <UnathenticatedContentDiv>
        <UnautheticatedFormDiv>
          <DataIntakeInput
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={updateData}
            placeholder="Email"
          />
          <PasswordInputDiv>
            <DataIntakeInput
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={updateData}
              placeholder="Password"
            />
            <ForgotPasswordButton>Forgot Password?</ForgotPasswordButton>
          </PasswordInputDiv>
          <SignUpButton onClick={handleSubmit}>LOGIN</SignUpButton>
        </UnautheticatedFormDiv>
        <DontHaveAccountText>
          Don't have an account?{" "}
          <SecondaryCTA to="/register">Sign Up</SecondaryCTA>
        </DontHaveAccountText>
      </UnathenticatedContentDiv>
    </ParentPageDiv>
  );
}

export default Login;

const PasswordInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`;

const ForgotPasswordButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-weight: bold;
  color: rgba(0, 89, 38, 0.4);
  font-size: 16px;
`;

const DontHaveAccountText = styled.p``;

const SignUpButton = styled(UnauthencticatedPrimaryButtonCTA)``;
