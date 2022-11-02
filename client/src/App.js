import { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [newEmail, setNewEmail] = useState("");
  
  const [loginStatus, setLoginStatus] = useState("");

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

const deleteUser = (username) => {
  Axios.delete(`http://localhost:3001/delete/${username}`).then((response) => {
    setUserList(userList.filter((val => {
      return val.username != username;
    })
    )
    );
  });
};

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
      setLoginStatus(response.data[0].username)
    }
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
        <input type="password" 
        onChange={(event)=>{
          setPassword(event.target.value);
        } } 
        />
        <button onClick={signUp}>Sign Up</button>
      </div>
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
        <button style={{position:'absolute', left:700, top:400}} onClick={login}> Login </button>
      </div>
      <div className="users">
        <button style={{position:'absolute', left:1050, top:400}} onClick={getUser}>Show User</button>
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
      
      <h1>{loginStatus}</h1>
      
    </div>
    
  );
}

export default App;
