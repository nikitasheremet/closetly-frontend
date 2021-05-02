import { useEffect } from "react";
import axios from "axios"
import {
    Link,
    useHistory
  } from "react-router-dom";

function Main() {
    let history = useHistory();
    const fetchImages = async () => {
        const authToken = localStorage.getItem('closetlyToken')
        if (authToken) {
            const pictureList = await axios.get('http://localhost:3000/showPictures', {headers: {'Authorization': `Basic ${authToken}`}}).catch(err => {
                if (err.response.status === 403) {
                    history.push('/login')
                } 
            })
            console.log(pictureList)
        } else {
            history.push('/login')
        }
        
    }

    useEffect(() => {
        fetchImages()
    }, [])
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
  </div>
 )
}

export default Main;