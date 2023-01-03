import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import { deleteUser } from "./login.component";
import { userContext } from "../store/context";
import Axios from "axios";
import "./teamoftheweek.css";



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
  const [playerGk, setPlayerGk] = useState({})
  const [playerDefense, setPlayerDefense] = useState([]);
  const [playerMidfield, setPlayerMidfield] = useState([]);
  const [playerForward, setPlayerForward] = useState([]);


  const [followedPlayers, setFollowedPlayers] = useState([])

  //const [playerrating, setPlayerRating] = useState(1)
  const [newplayerrating, updateUserRating] = useState(user?.rating ?? "");

  
  
  const getGk = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/totw/gk`).then((response) => {
      console.log(response.data);
      console.log("selam");
      setPlayerName(response.data[0].playername);
      setPlayerPosition(response.data[0].playerposition);
      setPlayerTeam(response.data[0].playerteam);
    });
    //getFollowedPlayers()
  };

  const getDefense = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/totw/defense`).then((response) => {
      console.log(response.data)
      setPlayerDefense(response.data);
    });
    //getFollowedPlayers()
  };

  const getMidfield = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/totw/midfield`).then((response) => {
      console.log(response.data)
      setPlayerMidfield(response.data);
    });
    //getFollowedPlayers()
  };

  const getForward = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/totw/forward`).then((response) => {
      console.log(response.data)
      setPlayerForward(response.data);
    });
    //getFollowedPlayers()
  };

  //const [newEmail, setNewEmail] = useState(user?.email ?? "");
  //const [newName, setNewName] = useState(user?.name ?? "");
  //const [newSurname, setNewSurname] = useState(user?.surname ?? "");
  //const [newAge, setNewAge] = useState(user?.surname ?? 1);

  

  window.scrollTo(0, 0);
  
  
  useEffect(() => {
    getGk();
  },[]);
  
  useEffect(() => {
    getDefense();
  },[]);
  
  useEffect(() => {
    getMidfield();
  },[]);

  useEffect(() => {
    getForward();
  },[]);


  return (
    <center>
  <div class="wrapper">
  <div class="campo">
     <div class="semi1"></div>
     <div class="semi2"></div>
     <div class="divisoria"></div>
     <div class="interior"></div>
     <div class="penalty"></div>           
     <div class="gk">
     <a href={process.env.REACT_APP_API_URL}>link text</a>
      <text>{playername}</text>
     </div>
     <div class="lb">
      <text>{playerDefense[0]?.playername}</text>
     </div>
     <div class="leftcb">
      <text>{playerDefense[1]?.playername}</text>
     </div>
     <div class="rightcb">
      <text>{playerDefense[2]?.playername}</text>
     </div>
     <div class="rb">
      <text>{playerDefense[3]?.playername}</text>
     </div>
     <div class="lm">
      <text>{playerMidfield[0]?.playername}</text>
     </div>
     <div class="lcm">
      <text>{playerMidfield[1]?.playername}</text>
     </div>
     <div class="rcm">
      <text>{playerMidfield[2]?.playername}</text>
     </div>
     <div class="rm">
      <text>{playerMidfield[3]?.playername}</text>
     </div>
     <div class="lst">
       <text>{playerForward[0]?.playername}</text>
     </div>
     <div class="rst">
       <text>{playerForward[1]?.playername}</text>
     </div>
  
  </div>
 </div>
</center>

  );
}


/*<div>
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
</div>*/