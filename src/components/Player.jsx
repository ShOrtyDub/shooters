import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import DataPlayer from "./DataPlayer.jsx";
import ReactLoading from "react-loading";
import Footer from "./Footer.jsx";
import {API_KEY} from "/config.js";


export default function Player() {
    const {id} = useParams();
    const [playerData, setPlayerData] = useState()

    const fetchPlayerData = async () => {
        try {
            const options = {
                method: 'GET',
                url: `https://api.balldontlie.io/v1/players/${id}`,
                headers: {
                    'Authorization': API_KEY
                },
            };

            const response = await axios(options);
            setPlayerData(response.data.data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const renderPlayer = () => {
        return <>
            <DataPlayer playerData={playerData}/>
        </>
    }

    useEffect(() => {
        fetchPlayerData()
    }, []);

    return (
        <>
            <div className="search">
                {playerData ?
                    (renderPlayer())
                    :
                    (<div>
                        <ReactLoading
                            type="spin"
                            color="#fafafa"
                            height={50}
                            width={50}
                        />
                    </div>)
                }
            </div>

            <div className="center-link">
                <Link to="/shooters" className="link-button">
                    Home
                </Link>
            </div>

            <Footer/>
        </>
    )
}