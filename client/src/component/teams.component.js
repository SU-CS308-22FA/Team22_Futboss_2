import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function Teams(){
    const [teamList, setTeamList] = useState([]);
    const { username } = useParams();
 

    const getTeam = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/team`).then((response) => {
          setTeamList(response.data);
        });
      };
    return(
        <div className="teams">
        <button onClick={getTeam}>Show Teams</button>
        {teamList.map((val, key) => {
          return (
            <div className="team">
              <div>
                <button onClick={()=> {
                window.location = `/profilepage/${username}/teams/${val._id.teamname}`;
                }}>{val._id.teamname}</button>
              </div>
              <div>

              </div>
             
            </div>
          );
        })}
      </div>


    );




}