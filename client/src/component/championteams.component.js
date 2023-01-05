import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';


export default function ChampionTeams(){
    const [teamList, setTeamList] = useState([]);
    const { username } = useParams();
 

    const getChampTeam = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/champteam`).then((response) => {
          setTeamList(response.data);
        });
      };


    return(
        <div className="championteams">
        <button onClick={getChampTeam}>Show Champ Teams</button>
        
        {teamList.map((val, key) => {
          return (
            <div className="championteams">
              <div>
              <Container>
                <h2>Team Name:{val._id.teamname}</h2>
                <h3>Year:{val.year}</h3>
                <h3>Manager:{val.manager}</h3>
                <h3>-----------------------------</h3>
                </Container>
              </div>
            </div>
          );
        })}
      </div>


    );




}
