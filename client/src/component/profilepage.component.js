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
        Update
      </button>
    </div>

  );
}
