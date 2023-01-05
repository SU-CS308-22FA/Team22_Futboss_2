import React, { useState } from "react";
import Axios from 'axios';
import "../style/mainpage.css";

export default function MainPage() {
    window.scrollTo(0, 0);
    const [input, setInput] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const getPlayer = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/player`).then((response) => {
        console.log(response.data)
        setPlayerList(response.data);
      });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };


    return (
        <div>
            <div className="search">
                <p></p>
                <div className="toget">
                <div class="container-fluid">
                    <form >
                        &nbsp;
                    <input placeholder = "Search for Team" type="text" onChange={handleChange}></input>
                    </form>
                &nbsp; &nbsp;
                <button className="search" onClick={getPlayer}>Show Players</button>
                </div>
                </div>
                <p></p>
            </div>
            <div className="playerList">


                {playerList.map((val, key) => {
                    if (val.playerteam === input) {
                        return (
                            <ol className="players" key={val.id} >
                                <p className="playername">{val.playername} | Nationality: {val.playernationality} | Position: {val.playerposition} | Rating: {val.playerrating} | Team: {val.playerteam}</p>
                                <div>
                                </div>
                                
                            </ol>
                        );
                    }
                })}
            </div>
        </div>
    );
}