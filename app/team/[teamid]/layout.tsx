export default function Layout({
    children,
    players,
    team
}: { children: React.ReactNode, players: React.ReactNode, team: React.ReactNode, teamMatches: React.ReactNode }
) {
    return (
        <main className="grow flex flex-row px-4">
            <div className="grow">{players}</div>
            <div className="grow-0">{children}</div>
            <div className="grow">{team}</div>
        </main>
    )
}