
import React, { useState } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";


export function LoginAdmin() {
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
                    <form >
                        Enter keyword
                        &nbsp;
                    <input type="text" onChange={handleChange}></input>
                    </form>
                &nbsp; &nbsp;
                <button className="search" onClick={getPlayer}>Show Players</button>
                </div>
                <p></p>
            </div>
            <div className="teamsList">


                {playerList.map((val, key) => {
                    if (val.playerteam === input) {
                        return (
                            <ol className="team" key={val.id} >
                                <h1 className="stadium">{val.p_num} - {val.playername}</h1>
                                <p className="playernationality">{val.playernationality}</p>
                                <p className="playerposition">{val.playerposition}</p>
                                <p className="playerposition">{val.playerposition}</p>
                                <p className="playerrating">Position: {val.playerrating}</p>
                                <p className="playerteam">Position: {val.playerteam}</p>

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