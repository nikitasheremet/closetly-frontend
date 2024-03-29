import { BrowserRouter, Switch, Route } from "react-router-dom";
import Account from "./views/Account/Account";
import Login from "./views/Unauthenticated/views/Login/Login";
import Main from "./views/Home";
import LandingPage from "./views/Unauthenticated/views/LandingPage/LandingPage";
import { useState } from "react";
import { authContext } from "./hooks/authContent/authContext";
import { useEffect } from "react";
import RegistrationPage from "./views/Unauthenticated/views/RegistrationPage.tsx";

function App() {
  const authTokenFetch = () => {
    try {
      return window.localStorage.getItem("closetlyToken");
    } catch (_) {
      return "";
    }
  };
  let [authToken, updateAuthToken] = useState(authTokenFetch());

  useEffect(() => {
    updateAuthToken(authTokenFetch());
  }, []);

  return (
    <authContext.Provider value={authToken}>
      <BrowserRouter>
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <RegistrationPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
