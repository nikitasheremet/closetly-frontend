import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [formData, setFormData] = useState({username: '', password: ''})
  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('closetlyToken')
    const {username, password} = formData
    const loginResult = await axios.post("http://localhost:3000/login", {
      username, password, token
    })
    if (loginResult.data.createdToken) {
      localStorage.setItem('closetlyToken', JSON.stringify(loginResult.data.createdToken))
    }
    if (loginResult.data.loggedIn) {
      console.log("Redirect the user please!!")
    }
  }
  
  const updateData = (updateEvent: React.FormEvent<HTMLInputElement>): void => {
    const {currentTarget: {name: formKey, value}} = updateEvent
    setFormData(formData => ({...formData, [formKey]: value}))
  }
 return (
   <form style={{margin: 10}} onSubmit={handleSubmit} action="http://localhost:3000/login" method="post"> 
     <label htmlFor="username">Username</label>
     <input id="username" name="username" type="text" value={formData.username} onChange={updateData}/>
     <label htmlFor="password">Password</label>
     <input id="password" name="password" type="password" value={formData.password} onChange={updateData}/>
     <button type="submit">Submit</button>
   </form>
 )
}

export default App;
