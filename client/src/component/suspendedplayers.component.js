import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import { deleteUser } from "./login.component";
import { userContext } from "../store/context";
import Axios from "axios";

export default function SuspendedPlayersPage() {
    const { user } = useContext(userContext);

    const [players, setPlayers] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_URL}/suspended-players`)
                setPlayers(result.data)
            } catch (e) {
                setError('Could not load suspended players.')
            }
        }
        getPlayers()
    }, [])

    return (

        <div>
            <div>
                {error && <p>error</p>}
                <h1>Suspended Players List</h1>
                {players.map((val, key) => {
                    return (
                        <div style={{ borderStyle: 'solid', borderWidth: 5, margin: 5, backgroundColor: 'white', padding: 10 }}>
                            <h3>playername: {val.playername}</h3>
                            <h3>playerposition: {val.playerposition}</h3>
                            <h3>playerteam: {val.playerteam}</h3>
                            <h3>playerrating: {val.playerrating}</h3>
                            <h3>playernationality: {val.playernationality}</h3>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}
