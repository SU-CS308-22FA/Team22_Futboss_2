import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";

export default function AdminProfilePage() {
  const { admin } = useContext(adminContext);
  const { adminusername } = useParams();

  const [playerid, setPlayerId] = useState("");
  const [playername, setPlayerName] = useState("");
  const [playerposition, setPlayerPosition] = useState("");
  const [playerteam, setPlayerTeam] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const addPlayer = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createplayer`, {
    playerid: playerid,
    playername: playername, 
    playerposition: playerposition, 
    playerteam: playerteam
    }).then(()=> {
      setPlayerList([...playerList,{
        playerid: playerid,
        playername: playername, 
        playerposition: playerposition, 
        playerteam: playerteam
      },
    ])
    });
   };

  window.scrollTo(0, 0);
  return (
    <div>
       <div className="reg_information">
          <label>Player Id</label>
          <input type="text"
            onChange={(event)=>{
            setPlayerId(event.target.value);
          } }
          />
          <label>Player Name</label>
          <input type="text" 
          onChange={(event)=>{
            setPlayerName(event.target.value);
          } }
          />
          <label>Player Position</label>
          <input type="text" 
          onChange={(event)=>{
            setPlayerPosition(event.target.value);
          } } 
          />
          <label>Player Team</label>
          <input type="text" 
          onChange={(event)=>{
            setPlayerTeam(event.target.value);
          } } 
          />
          <button onClick={addPlayer}>Add Player</button>
        </div>
        
    </div>
  );
}
