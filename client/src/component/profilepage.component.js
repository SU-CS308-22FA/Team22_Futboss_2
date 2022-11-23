import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteUser } from "./login.component";
import { userContext } from "../store/context";
import Axios from "axios";

const updateEmail = (username, email) => {
  Axios.put(`${process.env.REACT_APP_API_URL}/update`, {
    username,
    email,
  }).then((response) => {
    console.log(response);
  });
};

const updatePassword = (username, password) => {
<<<<<<< Updated upstream
  Axios.put(`${process.env.REACT_APP_API_URL}/updatepass`, {
=======
  Axios.put(`${process.env.REACT_APP_API_URL}/update`, {
>>>>>>> Stashed changes
    username,
    password,
  }).then((response) => {
    console.log(response);
  });
};

export default function ProfilePage() {
  const { user } = useContext(userContext);
  const { username } = useParams();

  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [newPassword, setNewPassword] = useState(user?.password ?? "");
  window.scrollTo(0, 0);
  return (
    <div>
      <div>{username}</div>
      <Link to="/">
        <button
          onClick={() => {
            deleteUser(username);
          }}
        >
          Delete
        </button>
      </Link>
      <br />
      <input
        type="text"
        placeholder="New Email"
        value={newEmail}
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateEmail(username, newEmail);
        }}
      >
        Update
      </button>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updatePassword(username, newPassword);
        }}
      >
        Update
      </button>
    </div>
  );
}
