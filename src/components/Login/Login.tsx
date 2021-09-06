import React, { useEffect, useState} from 'react';
import axios from 'axios'
import {
    Link,
    useHistory
  } from "react-router-dom";

function Login() {
    let history = useHistory();
    const [formData, setFormData] = useState({username: '', password: ''})
    const handleSubmit = async (event) => {
      event.preventDefault()
      const token = localStorage.getItem('closetlyToken')
      const {username, password} = formData
      const loginResult = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        username, password, token
      })
      if (loginResult.data.createdToken) {
        localStorage.setItem('closetlyToken', JSON.stringify(loginResult.data.createdToken))
      }
      if (loginResult.data.loggedIn) {
        history.push('/')
      }
    }
    
    const updateData = (updateEvent: React.FormEvent<HTMLInputElement>): void => {
      const {currentTarget: {name: formKey, value}} = updateEvent
      setFormData(formData => ({...formData, [formKey]: value}))
    }
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('closetlyToken')
        if (token) {
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, {headers: {'Authorization': `Basic ${token}`}})
                history.push('/')
            } catch (err) {
                console.log(err)
            }
        }
        })()
    }, [history])
   return (
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

     <form style={{margin: 10}} onSubmit={handleSubmit} action={`${process.env.BACKEND_URL}/login`} method="post"> 
       <label htmlFor="username">Username</label>
       <input id="username" name="username" type="text" value={formData.username} onChange={updateData}/>
       <label htmlFor="password">Password</label>
       <input id="password" name="password" type="password" value={formData.password} onChange={updateData}/>
       <button type="submit">Submit</button>
     </form>
     </div>
   )
}

export default Login;