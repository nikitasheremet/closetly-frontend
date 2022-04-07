import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  // let history = useHistory();
  // const [formData, setFormData] = useState({ username: "", password: "" });
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const token = localStorage.getItem("closetlyToken");
  //   const { username, password } = formData;
  //   const loginResult = await axios.post(
  //     `${process.env.REACT_APP_BACKEND_URL}/user/login`,
  //     {
  //       username,
  //       password,
  //       token,
  //     }
  //   );
  //   if (loginResult.data.createdToken) {
  //     localStorage.setItem(
  //       "closetlyToken",
  //       JSON.stringify(loginResult.data.createdToken)
  //     );
  //   }
  //   if (loginResult.data.loggedIn) {
  //     history.push("/");
  //   }
  // };

  // const updateData = (updateEvent: React.FormEvent<HTMLInputElement>): void => {
  //   const {
  //     currentTarget: { name: formKey, value },
  //   } = updateEvent;
  //   setFormData((formData) => ({ ...formData, [formKey]: value }));
  // };
  // useEffect(() => {
  //   (async () => {
  //     const token = localStorage.getItem("closetlyToken");
  //     if (token) {
  //       try {
  //         await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, {
  //           headers: { Authorization: `Basic ${token}` },
  //         });
  //         history.push("/");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   })();
  // }, [history]);
  // return (
  //   <div>
  //     <form
  //       style={{ margin: 10 }}
  //       onSubmit={handleSubmit}
  //       action={`${process.env.BACKEND_URL}/login`}
  //       method="post"
  //     >
  //       <label htmlFor="username">Username</label>
  //       <input
  //         id="username"
  //         name="username"
  //         type="text"
  //         value={formData.username}
  //         onChange={updateData}
  //       />
  //       <label htmlFor="password">Password</label>
  //       <input
  //         id="password"
  //         name="password"
  //         type="password"
  //         value={formData.password}
  //         onChange={updateData}
  //       />
  //       <button type="submit">Submit</button>
  //     </form>
  //   </div>
  // );
  // Declare a new state variable, which we'll call "count"
  console.log("1");
  const [count, setCount] = useState(0);
  console.log("2", count);
  useLayoutEffect(() => {
    console.log("3", count);
    return () => {
      console.log("In cleanup", count);
    };
  });
  console.log("4");

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log("0");
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default Login;
