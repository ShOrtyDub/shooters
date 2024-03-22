import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function DataTeam({teamData}) {
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);

// TODO pas de possibilité de faire un bouton previous, les données meta ne le permette pas à ce jour.
    const fetchPlayersTeam = async (cursor) => {
        setLoading(true);
        try {
            let url = `https://api.balldontlie.io/v1/players`;

            if (teamData) {
                url += `?team_ids[]=${teamData.id}`;
                if (cursor) {
                    console.log('cursor du fetch : ' + cursor);
                    url += `&cursor=${cursor}`;
                }
            }

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                },
                params: {
                    per_page: 100,
                },
            };

            const response = await axios(url, options);
            setTeamPlayers(response.data.data);
            setCursor(response.data.meta.next_cursor);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        fetchPlayersTeam(cursor);
    };

    const renderAllPlayers = () => {
        if (!teamPlayers.length) {
            return <div>Searching...</div>
        }
        return teamPlayers.map(player => (
            <Link to={`/player/${player.id}`} key={player.id}>
                <div key={player.id}>
                    <p>{player.last_name} {player.team.name}</p>
                </div>
            </Link>
        ));
    }

    useEffect(() => {
        fetchPlayersTeam(cursor);
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

            <div>
                Players of {teamData.full_name} team
                {loading ? <div>Loading</div> : renderAllPlayers()}
            </div>

            <div>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>
    )
}