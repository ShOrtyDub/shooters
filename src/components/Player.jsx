import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

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
            console.log(response.data.data);
        } catch (error) {
            console.error("fetchPlayerData() n'a pas fonctionné.");
        }
    };

    useEffect(() => {
        fetchPlayerData()
    }, []);

    // TODO afficher les données nécessaires du joueur.
    return (
        <Fragment>
            <h1>{playerData.first_name} {playerData.last_name}</h1>
            number
            height
            weight
            team
            country
            college
            draft year
            draft round
            draft number
        </Fragment>
    )
}