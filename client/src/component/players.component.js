import Axios from "axios";
import React, { useContext, useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


export default function Players(){
    const [playerList, setPlayerList] = useState([]);
    const { username } = useParams();
 

    const getPlayers = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/player`).then((response) => {
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