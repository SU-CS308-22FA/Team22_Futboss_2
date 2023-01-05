import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";


export default function AdjustPlayerRating() {

  window.scrollTo(0, 0);
  const { admin } = useContext(adminContext);
  const { adminusername } = useParams();

  const [playerList, setPlayerList] = useState([]);
  const [newRating, setNewRating] = useState([])

  

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

  const updateRating = (playerid, playerrating) => {
    Axios.put(`${process.env.REACT_APP_API_URL}/updateplayerrating`,{
      playerid,
      playerrating,
    }).then((response) => {
      getPlayer();
    });
  };
  
  
  return (
    <div>
       
        <div className="players">
        <button onClick={getPlayer}>Show Players</button>
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
              <input type="number" placeholder="Rating..."
                    onChange={(event) => {
                        setNewRating(event.target.value);
                    }}></input>
                    <button onClick={() => {
                        updateRating(val._id.playerid, newRating);
                    }}>Update Rating</button>
              </div>  
            </div>
          );
        })}
      </div>
    </div>
  );
}
