import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { adminContext } from "../store/context";

export function LoginAdmin() {
  window.scrollTo(0, 0);
  const { setAdmin } = useContext(adminContext);
  const [adminloginStatus, setAdminLoginStatus] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [adminusername, setAdminUsername] = useState("");
  const navigate = useNavigate();

  const loginadmin = () => {

    Axios.post(`${process.env.REACT_APP_API_URL}/loginadmin`, {
      adminusername: adminusername,
      adminpassword: adminpassword,
    }).then((response) => {
      if (response.data.message) {
        setAdminLoginStatus(response.data.message);
      } else {
        //setAdminLoginStatus(response.data[0].adminusername)
        console.log(response.data);
        setAdmin(response.data[0]);
        window.location = `/adminprofilepage/${adminusername}`;
      }
    });
  };
  return (
    <div>
      <div className="loginadmin">
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setAdminUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setAdminPassword(event.target.value);
          }}
        />
        <button onClick={loginadmin}> Login </button>
        <h1>{adminloginStatus}</h1>
      </div>
    </div>
  );
}
