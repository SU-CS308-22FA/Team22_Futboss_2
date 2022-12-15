import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

export function PlayerPage(){
    const [summary, setSummary] = useState({});
    /*const [playerrating, setPlayerRating] = useState(1)*/
    const { username,playerid,playername } = useParams();
    const [playerposition,setPlayerPosition] = useState("");
    const [comment, setComment] = useState("");
    const [commentList,setCommentList] = useState([]);
    const str2 = "";


    const getPlayer = (playerid,playername) => {
        Axios.get(`${process.env.REACT_APP_API_URL}/specificplayer/${playerid}/${playername}`).then((response) => {
          setSummary(response.data);
          setPlayerPosition(response.data.playerposition);
          setCommentList(response.data.comment);
        });
      };
    
     /* const postComment = (comment) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/specificplayer/${playerid}/${playername}/comment`).then(() => {
            getPlayer(playerid,playername);
        }) 
      }*/

      const postComment = (comment) => {
        console.log(comment);
        Axios.post(`${process.env.REACT_APP_API_URL}/specificplayer/${playerid}/${playername}/comment`, {
            comment: comment,
            username:username
        }).then(() => {
            console.log("selam");
            getPlayer(playerid,playername);
        });
        };

      useEffect(() => {
        getPlayer(playerid,playername);
       
      }, []);
    return(
    <div>
      <h1>{playername}</h1>
     
    <div>
        <h2>Player Position: {playerposition.charAt(0).toUpperCase() + playerposition.slice(1)}</h2>
        <h2>Player Team: {summary.playerteam}</h2>
        <h2>Player Rating: {summary.playerrating}</h2>
        <h3>Player Nationality: {summary.playernationality}</h3> 
        <div>
        <input type="text" placeholder="Your comment" onChange={(event) => {
            setComment(event.target.value);
          }}
          />
         <button onClick={() => {
                    postComment(comment);
                  }}>Comment</button> 

        </div>
        <div>
        {commentList?.map((val, key) => {
          return (
            <div className="comments">
              <div>
                <h3>Username: {val.username} Comment: {val.commentmessage}</h3>
                
              </div>
              
            </div>
          );
        })}
        </div>
    </div>
      
    </div>
    
    );




}