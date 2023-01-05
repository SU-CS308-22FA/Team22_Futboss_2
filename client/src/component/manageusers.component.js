import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";

export default function manageusers() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [newEmail, setNewEmail] = useState("");

 const signUp = () => {
  Axios.post(`${process.env.REACT_APP_API_URL}/player`, {
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

 const getUser = () => {
  Axios.get(`${process.env.REACT_APP_API_URL}/user`).then((response) => {
    setUserList(response.data);
 });
};


const deleteUser = (username) => {
  Axios.delete('${process.env.REACT_APP_API_URL}/delete/${username}');
}
  Axios.delete(`${process.env.REACT_APP_API_URL}/delete/${username}`).then((response) => {
    setUserList(userList.filter((val => {
      return val.username != username;
    })
    )
    );
  });
};

  return (
    <div className="App">
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
        <input type="text" 
        onChange={(event)=>{
          setPassword(event.target.value);
        } } 
        />
        <button onClick={signUp}>Sign Up</button>
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
      </div>
    </div>
    
  );
