import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";


export default function AdminProfilePage() {

  window.scrollTo(0, 0);
  const { admin } = useContext(adminContext);
  const { adminusername } = useParams();

  const [playerid, setPlayerId] = useState("");
  const [playername, setPlayerName] = useState("");
  const [playerposition, setPlayerPosition] = useState("");
  const [playerteam, setPlayerTeam] = useState("");
  const [playerrating, setPlayerRating] = useState(1)
  const [playernationality, setPlayerNationality] = useState("")
  const [playerList, setPlayerList] = useState([]);
 

  const addPlayer = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/createplayer`, {
    playerid: playerid,
    playername: playername, 
    playerposition: playerposition, 
    playerteam: playerteam,
    playerrating: playerrating,
    playernationality: playernationality
    }).then(()=> {
      setPlayerList([...playerList,{
        playerid: playerid,
        playername: playername, 
        playerposition: playerposition, 
        playerteam: playerteam,
        playerrating:playerrating,
        playernationality:playernationality
      },
    ])
    });
   };

   const getPlayer = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/player`).then((response) => {
      setPlayerList(response.data);
    });
  };

   const deletePlayer = (playerid, setPlayerList, playerList) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/deleteplayer/${playerid}`).then((response) => {
      setPlayerList(
        playerList.filter((val) => {
          return val.playerid != playerid;
        })
      );
    });
  };

  
  
  
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
          <label>Player Rating</label>
          <input type="number" 
          onChange={(event)=>{
            setPlayerRating(event.target.value);
          } } 
          />
          <label>Player Nationality</label>
          <input type="text"
          onChange={(event)=>{
            setPlayerNationality(event.target.value)
          }}
          />
          <button onClick={addPlayer}>Add Player</button>
        </div>
        <div className="players">
        <button onClick={getPlayer}>Show Players</button>
        <Link to="adminplayerrating">
        <button>
          Adjust Player Ratings
        </button>
      </Link>
        {playerList.map((val, key) => {
          return (
            <div className="player">
              <div key={val.playerrating}>
                <h3>playername: {val.playername}</h3>
                <h3>playerposition: {val.playerposition}</h3>
                <h3>playerteam: {val.playerteam}</h3>
                <h3>playerrating: {val.playerrating}</h3>
                <h3>playernationality: {val.playernationality}</h3>
                
              </div> 
              <div>
                {" "}
                <button
                  onClick={() => {
                    deletePlayer(val.playerid, setPlayerList, playerList);
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
        <button>
          Bug Reports
        </button>
      </Link>
    </div>
  );
}
