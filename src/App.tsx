import {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Account from "./Account"
import Login from "./Login"
import Main from "./Main"

function App() {
  return (
  <BrowserRouter
  >
    {console.log("@@")}
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
  </BrowserRouter>)
}

export default App;
