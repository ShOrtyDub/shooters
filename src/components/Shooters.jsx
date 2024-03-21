import {useEffect, useState} from "react";
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
    };

    // TODO améliorer "no player found"
    const renderPlayers = () => {
        if (!players.length) {
            return <div>No player found</div>;
        }
        return players.map((player) => (
            <Link to={`/player/${player.id}`}
                  key={player.id}
            >
                <div key={player.id}>
                    {player.first_name} {player.last_name}
                </div>
            </Link>
        ));
    }

    useEffect(() => {
        if (search) {
            fetchPlayers(search);
        }
    }, [search]);

    return (
        <>
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
        </>
    )
}