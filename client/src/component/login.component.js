import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { userContext } from "../store/context";
import "../style/loginpage.css";

export const deleteUser = (username, setUserList, userList) => {
  Axios.delete(`${process.env.REACT_APP_API_URL}/delete/${username}`).then((response) => {
    setUserList(
      userList.filter((val) => {
        return val.username != username;
      })
    );
  });
};

export const getUser = (setUserList) => {
  Axios.get(`${process.env.REACT_APP_API_URL}/user`).then((response) => {
    setUserList(response.data);
  });
};

export function Login() {
  window.scrollTo(0, 0);
  const { setUser } = useContext(userContext);
  const [loginStatus, setLoginStatus] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  const login = () => {
    console.log(username);
    Axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        //setLoginStatus(response.data[0].username)
        console.log(response.data);
        setUser(response.data[0]);
        window.location = `/profilepage/${username}`;
      }
    });
  };
  const updateUserEmail = (username) => {
    Axios.put(`${process.env.REACT_APP_API_URL}/update`, {
      email: newEmail,
      username: username,
    }).then((response) => {
      setUserList(
        userList.map((val) => {
          return val.username == username
            ? {
                username: val.username,
                password: val.password,
                email: newEmail,
              }
            : val;
        })
      );
    });
  };

  
  return (
    <div>
      <div className="login">
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login </button>
        <h1>{loginStatus}</h1>
        <span>
          First time on Futboss?<Link to="/signup">Register</Link>
        </span>
        <span>
          Login as<Link to="/loginadmin">Admin</Link>
        </span>
      </div>
    </div>
  );
}
