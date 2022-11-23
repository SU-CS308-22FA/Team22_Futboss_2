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
  Axios.put(`${process.env.REACT_APP_API_URL}/updatepass`, {
    username,
    password,


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
  const { username } = useParams();
  const [playerid, setPlayerId] = useState("");
  const [playername, setPlayerName] = useState("");
  const [playerposition, setPlayerPosition] = useState("");
  const [playerteam, setPlayerTeam] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [followedPlayers, setFollowedPlayers] = useState([])

  const getPlayer = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/player`).then((response) => {
      console.log(response.data)
      setPlayerList(response.data);
    });
    getFollowedPlayers()
  };

  const getFollowedPlayers = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/relationships/${username}`).then((res) => {
      console.log(res.data)
      setFollowedPlayers(res.data)
    })
  }


  const handleFollow = (playerId) => {
    Axios.post(`${process.env.REACT_APP_API_URL}/relationships`, {
      username: username,
      playerId: playerId,
    }).then((response) => {
      getFollowedPlayers()
    });
  };

  const handleUnfollow = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/relationships/${id}`).then((response) => {
      getFollowedPlayers()
    });
  }

  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [newPassword, setNewPassword] = useState(user?.password ?? "");

  const [newName, setNewName] = useState(user?.name ?? "");
  const [newSurname, setNewSurname] = useState(user?.surname ?? "");
  const [newAge, setNewAge] = useState(user?.surname ?? 1);

  

  window.scrollTo(0, 0);

  return (

    <div>
      <div className="players">
        <button onClick={getPlayer}>Show Players</button>
        {playerList.map((val, key) => {
          return (
            <div className="player">
              <div>
                <h3>playerid: {val.playerid}</h3>
                <h3>playername: {val.playername}</h3>
                <h3>playerposition: {val.playerposition}</h3>
                <h3>playerteam: {val.playerteam}</h3>
              </div>
              <div>
                {" "}
                <button onClick={() =>
                  followedPlayers.some(player => player.followedPlayerId == val.playerid)
                    ? handleUnfollow(followedPlayers.find(player => player.followedPlayerId == val.playerid).id)
                    : handleFollow(val.playerid)}>
                  {followedPlayers.some(player => player.followedPlayerId == val.playerid)
                    ? "Following"
                    : "Follow"}
                </button>

              </div>
            </div>
          );
        })}
      </div>
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

