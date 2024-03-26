import {Link} from "react-router-dom";

// TODO faire CSS DataPlayer
export default function DataPlayer({playerData}) {
    return (<>
            <div className="player-card">
                <h1>{playerData.first_name} {playerData.last_name}</h1>
                <p>Jersey number : <span>{playerData.jersey_number}</span></p>
                <p>Position : <span>{playerData.position}</span></p>
                <p>Country of origin : <span>{playerData.country}</span></p>
                <p>Height : <span>{playerData.height}</span></p>
                <p>Weight : <span>{playerData.weight}</span></p>
                <p>College : <span>{playerData.college}</span></p>
                <p>Draft year : <span>{playerData.draft_year}</span></p>
                <p>Draft round : <span>{playerData.draft_round}</span></p>
                <p>Draft number : <span>{playerData.draft_number}</span></p>

                <div className="center-link">
                    <Link to={`/team/${playerData.team.id}`}>
                        <img
                            src={`/public/img/teams/${playerData.team.id}.png`}
                            alt={playerData.team.full_name}
                            width={150}
                        />
                    </Link>
                </div>
            </div>
        </>)
}