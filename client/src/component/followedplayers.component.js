import Axios from "axios";
import React, { useContext, useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


export default function FollowedPlayers(){
    const [playerList, setPlayerList] = useState([]);
    const { username } = useParams();
 

    /**
 * This function gets all of its players from the db.
 * 
 * @returns {object} returns all the players from the database as an array of json object.
 */
    const getPlayers = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/followedplayers/${username}`).then((response) => {
          setPlayerList(response.data);
        });
      };

      useEffect(() => {
        getPlayers();
      }, []);
    return(
        <div className="players">
        {playerList.map((val, key) => {
          return (
            <div className="player">
              <div>
                <button onClick={()=> {
                window.location = `/profilepage/${username}/players/${val._id.playerid}/${val.playername}`;
                }}>{val.playername}</button>
              </div>
              <div>

              </div>
             
            </div>
          );
        })}
      </div>


    );




}