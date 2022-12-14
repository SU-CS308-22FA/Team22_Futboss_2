import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import { deleteUser } from "./login.component";
import { userContext } from "../store/context";
import Axios from "axios";


const updateUserRating = (username, userrating) => {
    Axios.put(`${process.env.REACT_APP_API_URL}/updaterating`, {
      username,
      userrating,
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

  //const [playerrating, setPlayerRating] = useState(1)
  const [newplayerrating, updateUserRating] = useState(user?.rating ?? "");

  
  
  const getPlayer = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/totw`).then((response) => {
      console.log(response.data)
      setPlayerList(response.data);
    });
    //getFollowedPlayers()
  };


  //const [newEmail, setNewEmail] = useState(user?.email ?? "");
  //const [newName, setNewName] = useState(user?.name ?? "");
  //const [newSurname, setNewSurname] = useState(user?.surname ?? "");
  //const [newAge, setNewAge] = useState(user?.surname ?? 1);

  

  window.scrollTo(0, 0);

  return (

    <div>
      <div className="totw">
        <button onClick={getPlayer}>Show Team Of The Week</button>
        {playerList.map((val, key) => {
          return (
            <><div className="totw">
                  <div>
                      <h3>playername: {val.playername}</h3>
                      <h3>playerposition: {val.playerposition}</h3>
                      <h3>playerteam: {val.playerteam}</h3>
                      <h3>playerrating: {val.playerrating}</h3>
                      <h3>playernationality: {val.playernationality}</h3>
                  </div>
              </div><div>
                      {" "}
                      <label>Rate Yourself</label>
          <input type="number" 
          onChange={(event)=>{
            updateUserRating(event.target.value);
          } } 
          />
                      <button
                          onClick={() => {
                              updateUserRating(username, newplayerrating);
                          } }
                      >
                          Rate
                      </button>

                  </div></>
          );
        })}
      </div>
    </div>

  );
}
