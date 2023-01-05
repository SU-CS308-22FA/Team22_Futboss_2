import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";

export default function AdminProfilePage() {

  window.scrollTo(0, 0);
  const { admin } = useContext(adminContext);
  const { adminusername } = useParams();

  const [username, setUserName] = useState("");
  const [userList, setUserList] = useState([]);

   const getUser = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/user`).then((response) => {
      setUserList(response.data);
    });
  };

   const deleteUser = (username, setUserList, userList) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/delete/${username}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.username != username;
        })
      );
    });
  };
  
  
  return (
    <div>
        <div className="users">
        <button onClick={getUser}>Show Users</button>
        {userList.map((val, key) => {
          return (
            <div className="user">
              <div>
                <h3>username: {val.username}</h3>
              </div>
              <div>
                {" "}
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
      </div>
      <Link to="/">
        <button>
          Logout
        </button>
      </Link>
      <Link to="adminbugreports">
      </Link>
    </div>
  );
}
