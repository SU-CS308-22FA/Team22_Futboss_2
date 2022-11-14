import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { userContext } from "../store/context";

export const deleteUser = (username, setUserList, userList) => {
  Axios.delete(`${process.env_API_URL}/delete/${username}`).then((response) => {
    setUserList(
      userList.filter((val) => {
        return val.username != username;
      })
    );
  });
};

export const getUser = (setUserList) => {
  Axios.get(`${process.env_API_URL}/user`).then((response) => {
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
    
    Axios.post(`${process.env_API_URL}/login`, {
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
    Axios.put(`${process.env_API_URL}/update`, {
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
        <h1>Login</h1>
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
        <span>
          First time on Futboss?<Link to="/signup">Register</Link>
        </span>
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
                <input
                  type="text"
                  placeholder="...@gmail.com"
                  onChange={(event) => {
                    setNewEmail(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateUserEmail(val.username);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteUser(val.username, setUserList, userList);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <h1>{loginStatus}</h1>
      </div>
    </div>
  );
}
