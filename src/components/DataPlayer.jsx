import {Link} from "react-router-dom";

export default function DataPlayer({playerData}) {
    return (<>
            <div className="player-card">
                <h1>{playerData.first_name} {playerData.last_name}</h1>
                <p>Jersey number : <span>{playerData.jersey_number ? playerData.jersey_number : "N/A"}</span></p>
                <p>Position : <span>{playerData.position ? playerData.position : "N/A"}</span></p>
                <p>Country of origin : <span>{playerData.country ? playerData.country : "N/A"}</span></p>
                <p>Height : <span>{playerData.height ? playerData.height : "N/A"}</span></p>
                <p>Weight : <span>{playerData.weight ? playerData.weight : "N/A"}</span></p>
                <p>College : <span>{playerData.college ? playerData.college : "N/A"}</span></p>
                <p>Draft year : <span>{playerData.draft_year ? playerData.draft_year : "N/A"}</span></p>
                <p>Draft round : <span>{playerData.draft_round ? playerData.draft_round : "N/A"}</span></p>
                <p>Draft number : <span>{playerData.draft_number ? playerData.draft_number : "N/A"}</span></p>
                <div className="center-link">
                    <Link to={`/team/${playerData.team.id}`}>
                        <img
                            src={`/shooters/img/teams/${playerData.team.id}.png`}
                            alt={playerData.team.full_name}
                            width={150}
                        />
                    </Link>
                </div>
            </div>
        </>)
}