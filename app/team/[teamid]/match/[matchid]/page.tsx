export default function Page({ params }: { params: { teamid: string, matchid: string } }) {
    return <h1>Hello, team #{params.teamid}, this is match #{params.matchid}</h1>
}