import { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [newEmail, setNewEmail] = useState("");

 const signUp = () => {
  Axios.post('http://localhost:3001/create', {
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
  Axios.get("http://localhost:3001/user").then((response) => {
    setUserList(response.data);
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
          </div>
         </div>
         );
       })}
      </div>
    </div>
    
  );
}

export default App;
