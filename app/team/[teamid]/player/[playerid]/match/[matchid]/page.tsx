export default function Page({ params }: { params: { teamid: string, playerid: string, matchid: string } }) {
    return <h1>Hello, player {params.playerid} from team {params.teamid}, this is match {params.matchid}</h1>
}