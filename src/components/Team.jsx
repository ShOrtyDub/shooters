import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import DataTeam from "./DataTeam.jsx";
import ReactLoading from "react-loading";
import Footer from "./Footer.jsx";
import {API_KEY} from "/config.js";

/**
 * Le composant Team affiche les informations sur une équipe et tous ses joueurs.
 * Il fait appel au composant DataTeam.
 * @returns {JSX.Element}
 */
export default function Team() {
    const {id} = useParams();
    const [teamData, setTeamData] = useState()
    const fetchTeamData = async () => {
        try {
            const options = {
                method: 'GET',
                url: `https://api.balldontlie.io/v1/teams/${id}`,
                headers: {
                    'Authorization': API_KEY
                },
            };

            const response = await axios(options);
            setTeamData(response.data.data);
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    };

    const renderTeam = () => {
        return <>
            <DataTeam teamData={teamData}/>
        </>
    }

    useEffect(() => {
        fetchTeamData();
    }, []);

    return (
        <>
            {teamData ?
                (renderTeam())
                :
                (<div className="spin-loading">
                    <ReactLoading type="spin" color="#fafafa" height={50} width={50}/>
                </div>)
            }

            <div className="center-button">
                <Link to="/shooters" className="link-button">Search</Link>
            </div>

            <Footer/>
        </>
    )
}