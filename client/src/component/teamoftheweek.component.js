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
  const [playerGk, setPlayerGk] = useState([])
  const [playerDefense, setPlayerDefense] = useState([]);
  const [playerMidfield, setPlayerMidfield] = useState([]);
  const [playerForward, setPlayerForward] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);


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
      setPlayerGk(response.data);

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

  const buttonevent = () => {
    console.log("hereeee");
    
  };

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

  function toggleText(position) {
    var text = document.getElementById(position);
    console.log(position);
  
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }

  const postRating = (rating, inputplayerid) => {
    console.log(rating);
    console.log(inputplayerid);
    Axios.post(`${process.env.REACT_APP_API_URL}/totw/${inputplayerid}/rating`, {
        rating: rating,
        username:username
    }).then((response) => {
        console.log(response);
        setAvgRating(response.data);
        console.log("selam");
        getGk();
        getDefense();
        getForward();
        getMidfield();
    });
    };

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
     <button class="btninfo" onClick={() => {toggleText("demo")}}>{playername}</button>
     </div>
     <div class="lb">
      <button class="btnlb" onClick={() => {toggleText("demolb")}}>{playerDefense[0]?.playername}</button>
     </div>
     <div class="leftcb">
      <button class="btnlcb" onClick={() => {toggleText("demolcb")}}>{playerDefense[1]?.playername}</button>
     </div>
     <div class="rightcb">
      <button class="btnrcb" onClick={() => {toggleText("demorcb")}}>{playerDefense[2]?.playername}</button>
     </div>
     <div class="rb">
     <button class="btnrb" onClick={() => {toggleText("demorb")}}>{playerDefense[3]?.playername}</button>
     </div>
     <div class="lm">
     <button class="btnrb" onClick={() => {toggleText("demolm")}}>{playerMidfield[0]?.playername}</button>
     </div>
     <div class="lcm">
     <button class="btnrb" onClick={() => {toggleText("demolcm")}}>{playerMidfield[1]?.playername}</button>
     </div>
     <div class="rcm">
      <button class="btnrb" onClick={() => {toggleText("demorcm")}}>{playerMidfield[2]?.playername}</button>

     </div>
     <div class="rm">
     <button class="btnrb" onClick={() => {toggleText("demorm")}}>{playerMidfield[3]?.playername}</button>
     </div>
     <div class="lst">
     <button class="btnrb" onClick={() => {toggleText("demolst")}}>{playerForward[0]?.playername}</button>
     </div>
     <div class="rst">
     <button class="btnrb" onClick={() => {toggleText("demorst")}}>{playerForward[1]?.playername}</button>
     </div>


  </div>
</div>
<div class="demo" id="demo">
 <h3>Player Name: {playername}</h3>
 <h3>Player Team: {playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerGk[0]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demolb" id="demolb">
 <h3>Player Name: {playerDefense[0]?.playername}</h3>
 <h3>Player Team: {playerDefense[0]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerDefense[0]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demolcb" id="demolcb">
 <h3>Player Name: {playerDefense[1]?.playername}</h3>
 <h3>Player Team: {playerDefense[1]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerDefense[1]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demorcb" id="demorcb">
 <h3>Player Name: {playerDefense[2]?.playername}</h3>
 <h3>Player Team: {playerDefense[2]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerDefense[2]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demorb" id="demorb">
 <h3>Player Name: {playerDefense[3]?.playername}</h3>
 <h3>Player Team: {playerDefense[3]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerDefense[3]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demolm" id="demolm">
 <h3>Player Name: {playerMidfield[0]?.playername}</h3>
 <h3>Player Team: {playerMidfield[0]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerMidfield[0]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demolcm" id="demolcm">
 <h3>Player Name: {playerMidfield[1]?.playername}</h3>
 <h3>Player Team: {playerMidfield[1]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerMidfield[1]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demorcm" id="demorcm">
 <h3>Player Name: {playerMidfield[2]?.playername}</h3>
 <h3>Player Team: {playerMidfield[2]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerMidfield[2]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demorm" id="demorm">
 <h3>Player Name: {playerMidfield[3]?.playername}</h3>
 <h3>Player Team: {playerMidfield[3]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerMidfield[3]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demolst" id="demolst">
 <h3>Player Name: {playerForward[0]?.playername}</h3>
 <h3>Player Team: {playerForward[0]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerForward[0]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

        </div>
</div>
<div class="demorst" id="demorst">
 <h3>Player Name: {playerForward[1]?.playername}</h3>
 <h3>Player Team: {playerForward[1]?.playerteam} </h3>
 <div>
        <input type="number" placeholder="Your rating" onChange={(event) => {
            setUserRating(event.target.value);
          }}
          />
         <button onClick={() => { 
                    console.log(userRating);
                    setPlayerId(playerForward[1]?._id.playerid);
                    console.log(playerid);
                    postRating(userRating, playerid);
                    
                  }}>Add My Rating</button> 

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