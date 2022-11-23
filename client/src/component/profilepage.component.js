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

export default function ProfilePage() {
  const { user } = useContext(userContext);
  const { username } = useParams();

  const showPlayer = (playername) => {
    Axios.get(`${process.env.REACT_APP_API_URL}/showplayer/${playername}`).then((response) => {
      console.log(response);
      console.log(playername);
      setPlayerList(response.data);
    });
  };

  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [playername, setPlayerName] = useState("");
  const[playerList, setPlayerList] = useState([]);
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
        type="text"
        placeholder="Name"
        value={playername}
        onChange={(event) => {
          setPlayerName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          showPlayer(playername);
        }}
      >
        Search
      </button>
    </div>
  );
}
