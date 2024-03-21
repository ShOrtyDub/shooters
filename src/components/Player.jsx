import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import DataPlayer from "./DataPlayer.jsx";

export default function Player() {
    const {id} = useParams();
    const [playerData, setPlayerData] = useState()

    const fetchPlayerData = async () => {
        try {
            const options = {
                method: 'GET',
                url: `https://api.balldontlie.io/v1/players/${id}`,
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                },
            };
            const response = await axios(options);
            setPlayerData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const renderPlayer = () => {
        return (
            <DataPlayer playerData={playerData}/>
        )
    }

    useEffect(() => {
        fetchPlayerData()
    }, []);

    // TODO afficher une roue de chargement.
    return (
        <>
            {playerData ? (
                renderPlayer()
            ) : (
                <p>searching...</p>
            )}

            <Link to="/">Home</Link>
        </>
    )
}