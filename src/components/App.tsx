import '../css/App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Account from "./Account/Account"
import Login from "./Login/Login"
import Main from "./Home/Main"

function App() {
  return (
  <BrowserRouter
  >
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
