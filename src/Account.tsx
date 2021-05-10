import { useEffect } from "react";
import {
    Link
  } from "react-router-dom";

function Account() {
  useEffect(() => {
    console.log("ACCOUNT")
})
 return (
  <div>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
          </ul>
        </nav>
  </div>
  </div>
 )
}

export default Account;