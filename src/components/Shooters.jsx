import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Shooters() {
    const [players, setPlayers] = useState()

    const fetchPlayers = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://api.balldontlie.io/v1/players',
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                }
            }
            const response = await axios(options);
            setPlayers(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const renderPlayers = () => {
        if (!players) {
            return null;
        }
        return players.map((player) => (
            <div key={player.id}>{player.first_name}</div>
        ));
    }

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <Fragment>
            <div>
                {renderPlayers()}
            </div>
            <Link to="/shooter">test</Link>
        </Fragment>
    )
}