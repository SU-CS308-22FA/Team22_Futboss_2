import React, {Component, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

export default function Login () {
    
  window.scrollTo(0, 0)
  
  const [loginStatus, setLoginStatus] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [userList, setUserList] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const navigate = useNavigate();

    const login = () => {
        Axios.post("http://localhost:3001/login", {
          username: username,
          password: password,
        }).then((response)=> {
          if(response.data.message)
          {
            setLoginStatus(response.data.message)
          }
          else{
            //setLoginStatus(response.data[0].username)
            window.location = `/profilepage/${username}`;
          }
        });
      };
      const updateUserEmail = (username) => {
        Axios.put("http://localhost:3001/update", {email: newEmail, username: username}).then(
          (response) => {
            setUserList(userList.map((val) => {
              return val.username == username ? {username: val.username, password: val.password, email: newEmail} : val
            }))
        });
      };
      const getUser = () => {
        Axios.get("http://localhost:3001/user").then((response) => {
          setUserList(response.data);
       });
      };
      
      const deleteUser = (username) => {
        Axios.delete(`http://localhost:3001/delete/${username}`).then((response) => {
          setUserList(userList.filter((val => {
            return val.username != username;
          })
          )
          );
        });
      };
    
    return(
        <div>
        <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder='Username...'
        onChange={(event)=>{
          setUsername(event.target.value);
        } }
        />
        <input type="password" placeholder='Password...'
        onChange={(event)=>{
          setPassword(event.target.value);
        } }
        />
        <button onClick={login}> Login </button>
        <span>First time on Futboss?<Link to= "/signup">Register</Link></span>
      </div>
      <div className="users">
      <button onClick={getUser}>Show User</button>
      {userList.map((val, key) => {
       return (
       <div className="user"> 
        <div>
          <h3>Username: {val.username}</h3> 
          <h3>Email: {val.email}</h3> 
          <h3>Password: {val.password}</h3> 
        </div>
        <div>
          {" "}
          <input type="text" placeholder="...@gmail.com"
          onChange={(event)=>{
            setNewEmail(event.target.value);
          } }
          /> 
          <button onClick={() => {updateUserEmail(val.username)}}>Update</button>
          <button onClick={() => {deleteUser(val.username)}}>Delete</button>
        </div>
       </div>
       );
     })}
    
    
    <h1>{loginStatus}</h1>
    </div>
    </div>
    )
}