import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import serverRequest from "../../helpers/serverRequest";
import styled from "styled-components";

function Login() {
  let history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
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
    <LoginPageRootDiv>
      <Navbar />
      <SignInTitleDiv>
        <SignInTitle>Sign In</SignInTitle>
        <SignInSubtitle>Enter your email and password</SignInSubtitle>
      </SignInTitleDiv>
      <LoginInputDiv>
        <LoginInputFormDiv>
          {/* <label htmlFor="email">Username</label> */}
          <LoginInput
            id="email"
            name="email"
            type="text"
            value={formData.username}
            onChange={updateData}
            placeholder="Email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <LoginInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={updateData}
            placeholder="Password"
          />
          <SignUpButton onClick={handleSubmit}>LOGIN</SignUpButton>
        </LoginInputFormDiv>
        <AlreadyHaveAccountText>
          Don't have an account? <span>Sign Up</span>
        </AlreadyHaveAccountText>
      </LoginInputDiv>
    </LoginPageRootDiv>
  );
}

export default Login;

const LoginPageRootDiv = styled.div`
  background: #fff5f1;
`;

const SignInTitle = styled.h1`
  margin: 20px 0 10px 0;
`;

const SignInSubtitle = styled.p`
  margin: 0;
  color: #a8a6a7;
`;

const LoginInput = styled.input`
  border: none;
  border-bottom: 1px solid #a8a6a7;
  padding-bottom: 10px;
  margin-bottom: 10px;

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

const SignInTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30% 0 25% 0;
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
