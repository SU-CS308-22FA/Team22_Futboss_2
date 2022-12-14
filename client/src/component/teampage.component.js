import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function TeamPage(){
    const [foundation, setFoundation] = useState("");
    const [numberoftrophies, setNumberOfTrophies] = useState(1);
    const [president, setPresident] = useState("");
    const [summary, setSummary] = useState({});
    const [teamList,setTeamList] = useState([]);
    /*const [playerrating, setPlayerRating] = useState(1)*/
    const { username,teamname } = useParams();
 

    /**
 * This function returns the team with name written in input.
 * @param {string} input A team name
 * @returns {object} returns the team information as a json object.
 */
    const getTeam = (teamname) => {
        Axios.get(`${process.env.REACT_APP_API_URL}/specificteam/${teamname}`).then((response) => {
          setSummary(response.data);
        });
      };

      useEffect(() => {
        getTeam(teamname);
      }, []);
    return(
    <div>
      <h1>{teamname}</h1>
     
    <div>
        <h2>Foundation Year: {summary.foundation}</h2>
        <h2>Number Of Trophies: {summary.numberoftrophies}</h2>
        <h2>President: {summary.president}</h2>
        <h3>Summary: {summary.summary}</h3>


    </div>
      {teamList.map((val, key) => {
          return (
            <div className="team">
              <div>
                <h3>Team Name:{val._id.teamname}</h3>
                <h3>Foundation Year:{val.foundation}</h3>
                <h3>Number of Trophies:{val.numberoftrophies}</h3>
                <h3>President:{val.president}</h3>
                <text>Summary: {val.summary}</text>



              </div>
              <div>

              </div>
             
            </div>
          );
        })}
    </div>
    
    );




}