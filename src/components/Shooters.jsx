import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Title from "./Title.jsx";
import Footer from "./Footer.jsx";
import ReactLoading from 'react-loading';
import {API_KEY} from "/config.js";

/**
 * Ce composant est la vue principal de l'application, il permet de lancer une recherche de joueur en entrant son nom dans un input.
 * @returns {JSX.Element}
 */
export default function Shooters() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState(false);

    const fetchPlayers = async (name) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://api.balldontlie.io/v1/players',
                headers: {
                    'Authorization': API_KEY
                },
                params: {
                    search: name,
                    per_page: 100
                },
            }
            const response = await axios(options);
            setPlayers(response.data.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setIsActive(event.target.value.trim() !== "");
    };

    const renderPlayers = () => {
        return players.map((player) => (
            <>
                <Link to={`/shooters/player/${player.id}`} key={player.id} className="player">
                    <div key={player.id}>{player.first_name} {player.last_name}</div>
                </Link>
            </>
        ));
    }

    useEffect(() => {
        if (search) {
            fetchPlayers(search);
        }
    }, [search]);

    return (
        <>
            <div className={`search ${isActive ? "active" : ""}`}>
                <Title/>

                <input type="text" placeholder="Player's name..." value={search} onChange={handleSearchChange}/>
            </div>

            <div className="render-players">
                {players ?
                    (renderPlayers())
                    :
                    (<div>
                        <ReactLoading type="spin" color="#fafafa" height={50} width={50}/>
                    </div>)
                }
            </div>

            <Footer/>
        </>
    )
}