import axios from "axios";
import {useEffect, useState} from "react";

export default function DataTeam({teamData}) {
    const [teamPlayers, setTeamPlayers] = useState([]);

    // TODO fetchPlayersTeam fonctionne mais il faut réussir à ramener TOUTES les pages de joueurs dans teamPlayers[]
    const fetchPlayersTeam = async (teamData) => {
        try {
            let url = `https://api.balldontlie.io/v1/players`;

            if (teamData){
                url += `?team_ids[]=${teamData.id}`;
            }

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                },
                params: {
                    per_page: 100
                },
            };
            const response = await axios(url, options);
            // setTeamPlayers(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    useEffect(() => {
        fetchPlayersTeam();
    }, []);

    return (
        <>
            <div>
                <p>{teamData.full_name}</p>
                <p>city : {teamData.city}</p>
                <p>abbreviation : {teamData.abbreviation}</p>
                <p>conference : {teamData.conference}</p>
                <p>division : {teamData.division}</p>
            </div>
        </>
    )
}