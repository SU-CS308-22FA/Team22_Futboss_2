import { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const signUp = () => {
  Axios.post('http://localhost:3001/create', {username: username, 
  email: email, 
  password: password
  }).then(()=> {
    console.log("success");
  });
 }

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
    </div>
  );
}

export default App;
