import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import DataTeam from "./DataTeam.jsx";

export default function Team() {
    const {id} = useParams();
    const [teamData, setTeamData] = useState()
    const fetchTeamData = async () => {
        try {
            const options = {
                method: 'GET',
                url: `https://api.balldontlie.io/v1/teams/${id}`,
                headers: {
                    'Authorization': '8b94bf84-fe70-4619-8d50-e307653da5fc'
                },
            };
            const response = await axios(options);
            setTeamData(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    };

    const renderTeam = () => {
        return (
                <DataTeam teamData={teamData}/>
        )
    }

    useEffect(() => {
        fetchTeamData();
    }, []);

    return (
        <>
                {teamData ? (
                    renderTeam()
                ) : (
                    <p>searching...</p>
                )}

                <Link to="/">Home</Link>
        </>
    )
}