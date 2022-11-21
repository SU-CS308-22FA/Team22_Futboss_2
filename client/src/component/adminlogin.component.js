import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { userContext } from "../store/context";

export const deleteAdmin = (adminusername, setAdminList, adminList) => {
  Axios.delete(`${process.env.REACT_APP_API_URL}/deleteadmin/${adminusername}`).then((response) => {
    setAdminList(
      adminList.filter((val) => {
        return val.adminusername != adminusername;
      })
    );
  });
};

export const getAdmin = (setAdminList) => {
  Axios.get(`${process.env.REACT_APP_API_URL}/admin`).then((response) => {
    setAdminList(response.data);
  });
};

export function LoginAdmin() {
  window.scrollTo(0, 0);
  const { setAdmin } = useContext(userContext);
  const [adminloginStatus, setAdminLoginStatus] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [adminusername, setAdminUsername] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const navigate = useNavigate();

  const adminlogin = () => {

    Axios.post(`${process.env.REACT_APP_API_URL}/adminlogin`, {
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
  const updateAdminEmail = (adminusername) => {
    Axios.put(`${process.env.REACT_APP_API_URL}/adminupdate`, {
      adminemail: newAdminEmail,
      adminusername: adminusername,
    }).then((response) => {
      setAdminList(
        adminList.map((val) => {
          return val.adminusername == adminusername
            ? {
              adminusername: val.adminusername,
              adminpassword: val.adminpassword,
              adminemail: newAdminEmail,
            }
            : val;
        })
      );
    });
  };

  return (
    <div>
      <div className="adminlogin">
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
        <button onClick={adminlogin}> Login </button>
      </div>
      <div className="users">
        {adminList.map((val, key) => {
          return (
            <div className="admin">
              <div>
                <h3>Username: {val.adminusername}</h3>
                <h3>Email: {val.adminemail}</h3>
                <h3>Password: {val.adminpassword}</h3>
              </div>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="...@gmail.com"
                  onChange={(event) => {
                    setNewAdminEmail(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateAdminEmail(val.adminusername);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteAdmin(val.adminusername, setAdminList, adminList);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <h1>{adminloginStatus}</h1>
      </div>
    </div>
  );
}
