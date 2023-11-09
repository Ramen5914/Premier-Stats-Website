export default function Layout({
    children,
    players,
    team,
    teamMatches
}: {children: React.ReactNode, players: React.ReactNode, team: React.ReactNode, teamMatches: React.ReactNode}
) {
    console.log(team)
    return (
        <>
            {children}
            {players}
            {team}
            {teamMatches}
        </>
    )
}