import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import DataTeam from "./DataTeam.jsx";
import ReactLoading from "react-loading";
import Footer from "./Footer.jsx";

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
                    <ReactLoading
                        type="spin"
                        color="#fafafa"
                        height={50}
                        width={50}
                    />
                </div>)
            }

            <div className="center-link">
                <Link to="/shooters" className="link-button">Home</Link>
            </div>

            <Footer/>
        </>
    )
}