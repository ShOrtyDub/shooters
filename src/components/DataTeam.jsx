import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactLoading from "react-loading";
import {API_KEY} from "/config.js";

/**
 * Le composant DataTeam affiche les informations d'une équipe et tous ses joueurs.
 * Il utilise le props teamData.
 * @param teamData
 * @returns {JSX.Element}
 */
export default function DataTeam({teamData}) {
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);

    const fetchPlayersTeam = async (cursor) => {
        setLoading(true);
        try {
            let url = `https://api.balldontlie.io/v1/players`;

            if (teamData) {
                url += `?team_ids[]=${teamData.id}`;
                if (cursor) {
                    url += `&cursor=${cursor}`;
                }
            }

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': API_KEY
                },
                params: {
                    per_page: 100,
                },
            };

            const response = await axios(url, options);
            setTeamPlayers(response.data.data);
            setCursor(response.data.meta.next_cursor);
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
        return teamPlayers.map(player => (
            <>
                <Link to={`/shooters/player/${player.id}`} key={player.id} className="player">
                    <div key={player.id}><p>{player.first_name} {player.last_name}</p></div>
                </Link>
            </>
        ));
    }

    useEffect(() => {
        fetchPlayersTeam(cursor);
    }, []);

    return (
        <>
            <div className="box">
                <div className="team-card">
                    <div>
                        <img src={`/shooters/img/teams/${teamData.id}.png`} alt={teamData.full_name} width={150}/>
                    </div>
                    <h1>{teamData.full_name}</h1>
                    <p>City : <span>{teamData.city ? teamData.city : "N/A"}</span></p>
                    <p>Abbreviation : <span>{teamData.abbreviation ? teamData.abbreviation : "N/A"}</span></p>
                    <p>Conference : <span>{teamData.conference ? teamData.conference : "N/A"}</span></p>
                    <p>Division : <span>{teamData.division ? teamData.division : "N/A"}</span></p>
                </div>
            </div>


            {loading ?
                (<div className="box">
                    <div className="spin-loading">
                        <ReactLoading type="spin" color="#fafafa" height={50} width={50}/>
                    </div>
                </div>)
                :
                (<div className="box">
                    <div className="render-players">
                        {renderAllPlayers()}
                    </div>
                </div>)
            }

            <div className="center-link">
                <button onClick={handleNextPage} className="link-button">Next</button>
            </div>
        </>
    )
}