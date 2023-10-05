export default function Page({ params }: { params: { playerid: string, teamid: string } }) {
    return <h1>Hello, player {params.playerid} from team {params.teamid}!</h1>
}