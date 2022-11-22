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



const updateName = (username, name) => {
  Axios.put(`${process.env.REACT_APP_API_URL}/updatename`,{
    username,
    name,
  }).then((response) => {
    console.log(response);
  });
};

const updateSurname = (username, surname) => {
  Axios.put(`${process.env.REACT_APP_API_URL}/updatesurname`,{
    username,
    surname,
  }).then((response) => {
    console.log(response);
  });
};

const updateAge = (username, age) => {
  Axios.put(`${process.env.REACT_APP_API_URL}/updateage`,{
    username,
    age,
  }).then((response) => {
    console.log(response);
  });
};

export default function ProfilePage() {
  const { user } = useContext(userContext);
  const { username} = useParams();

  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [newName, setNewName] = useState(user?.name ?? "");
  const [newSurname, setNewSurname] = useState(user?.surname ?? "");
  const [newAge, setNewAge] = useState(user?.surname ?? 1);

  

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
        Update Email
      </button>
      <br />
      <input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateName(username, newName);
        }}
      >
        Update Name
      </button>
      <br />
      <input
        type="text"
        placeholder="Surname"
        value={newSurname}
        onChange={(event) => {
          setNewSurname(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateSurname(username, newSurname);
        }}
      >
        Update Surname
      </button>
      <br />
      <input
        type="number"
        placeholder="Age"
        value={newAge}
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateAge(username, newAge);
        }}
      >
        Update Age
      </button>
    </div>
  );
}

