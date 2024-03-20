import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Shooters() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchPlayers = async (name) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://api.balldontlie.io/v1/players',
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                },
                params: {
                    last_name: name,
                    per_page: 100
                },
            }
            const response = await axios(options);
            setPlayers(response.data.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const renderPlayers = () => {
        if (!players.length) {
            return <div>No player found</div>;
        }
        return players.map((player) => (
            <div key={player.id}>{player.first_name} {player.last_name}</div>
        ));
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        if (search) {
            fetchPlayers(search);
        }
    }, [search]);

    return (
        <Fragment>
            <div>
                <input type="text"
                       placeholder="Search a player by name"
                       value={search}
                       onChange={handleSearchChange}
                />
            </div>
            <div>
                {renderPlayers()}
            </div>
            <Link to="/shooter">test</Link>
        </Fragment>
    )
}