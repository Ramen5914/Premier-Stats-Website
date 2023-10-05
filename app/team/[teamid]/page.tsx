export default function Page({ params }: { params: { teamid: string } }) {
    return <h1>Hello, team #{params.teamid}</h1>
}