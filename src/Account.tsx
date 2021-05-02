// import React, {useEffect, useState} from 'react';
import {
    Link
  } from "react-router-dom";

function Account() {
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