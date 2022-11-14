import React, {Component, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

export default function SignUp () {
    window.scrollTo(0, 0)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);
    const signUp = () => {
    Axios.post('https://team22-futboss-2-o8ww.vercel.app/create', {
    username: username, 
    email: email, 
    password: password
    }).then(()=> {
      setUserList([...userList,{
      username: username, 
      email: email, 
      password: password
      },
    ])
    });
   };
  
    return(
        <div className="reg_information">
          <label>Username</label>
          <input type="text" 
            onChange={(event)=>{
            setUsername(event.target.value);
          } }
          />
          <label>Email</label>
          <input type="text" 
          onChange={(event)=>{
            setEmail(event.target.value);
          } }
          />
          <label>Password</label>
          <input type="password" 
          onChange={(event)=>{
            setPassword(event.target.value);
          } } 
          />
          <Link to= "/"><button onClick={signUp}>Sign Up</button></Link>
        </div>
        
    )
}
