import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import serverRequest from "../../helpers/serverRequest";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ParentPageDiv } from "../styles";
import MidPageTitleAndSubtitle from "../components/MidPageTitleSubtitle";

function Login() {
  let history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email: username, password } = formData;
    const loginResult = await serverRequest(
      "POST",
      "user/login",
      {
        username,
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
      <LoginInputDiv>
        <LoginInputFormDiv>
          <LoginInput
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={updateData}
            placeholder="Email"
          />
          <PasswordInputDiv>
            <LoginInput
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
        </LoginInputFormDiv>
        <AlreadyHaveAccountText>
          Don't have an account? <SignUpCTA to="/register">Sign Up</SignUpCTA>
        </AlreadyHaveAccountText>
      </LoginInputDiv>
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

const LoginInput = styled.input`
  border: none;
  border-bottom: 1px solid #a8a6a7;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background: transparent;
  width: 100%;

  &::placeholder {
    color: #a8a6a7;
  }
`;

const LoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginInputFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: stretch;
  justify-content: center;
  margin: auto;
`;

const AlreadyHaveAccountText = styled.p``;

const SignUpButton = styled.button`
  border-radius: 20px;
  height: 44px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: none;
  font-size: 22px;
  background: rgba(0, 89, 38, 0.4);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  color: #fff;
`;

const SignUpCTA = styled(Link)`
  color: rgba(0, 89, 38, 0.4);
  font-weight: bold;
`;
