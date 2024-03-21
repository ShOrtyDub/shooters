import {Link} from "react-router-dom";

export default function DataPlayer({playerData}) {
    return (
        <>
            <div>
                <h1>{playerData.first_name} {playerData.last_name}</h1>
                <p>jersey number : {playerData.jersey_number}</p>
                <p>position : {playerData.position}</p>
                <p>country : {playerData.country}</p>
                <p>height : {playerData.height}</p>
                <p>weight : {playerData.weight}</p>
                <p>college : {playerData.college}</p>
                <p>draft year : {playerData.draft_year}</p>
                <p>draft round : {playerData.draft_round}</p>
                <p>draft number : {playerData.draft_number}</p>
                <Link to={`/team/${playerData.team.id}`}>
                    <p>{playerData.team.full_name}</p>
                </Link>
                <p>city : {playerData.team.city}</p>
            </div>
        </>
    )
}