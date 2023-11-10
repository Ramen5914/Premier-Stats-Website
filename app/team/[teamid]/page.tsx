import PlayerCard from '@/components/PlayerCard'
import type { Player } from '@/app/(types)/GraphQLStructures'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
    params: { teamid: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.teamid

    const data = await getTeamName(id);

    return {
        title: `${data.name}#${data.tag}`
    }
}

export default async function Page({ params }: Props) {
    const { data } = await getData(params.teamid);

    return (
        <main className="grow flex flex-row px-4">
            <div className="grow">
                <div>

                </div>
            </div>
            <div className="grow max-w-7xl flex flex-col space-y-4 mx-auto px-1">
                {playerCardRenderer(data.teamById.players)}  
            </div>
            <div className="grow">
                <div>
                    
                </div>
            </div>
        </main>
    )
}

async function getTeamName(id: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query TeamById {
                    teamById(id: ${id}) {
                        name
                        tag
                    }
                }              
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    var resJson = await response.json();

    return await resJson.data.teamById;
}

async function getData(id: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query TeamById {
                    teamById(id: ${id}) {
                        id
                        name
                        tag
                        episode
                        act
                        division
                        score
                        rank
                        link
                        imageLink
                        region
                        tournament {
                            id
                            datePlayedAt
                            tournamentGames {
                                id
                                playedAt
                                duration
                                team1 {
                                    id
                                    name
                                    tag
                                    rank
                                    link
                                    imageLink
                                }
                                team1Score
                                team2 {
                                    id
                                    name
                                    tag
                                    rank
                                    link
                                    imageLink
                                }
                                team2Score
                            }
                            tournamentTeams {
                                id
                                name
                                tag
                                rank
                                link
                                imageLink
                            }
                        }
                        players {
                            id
                            teamId
                            displayName
                            name
                            tag
                            currentRank
                            peakRank
                            link
                            imageLink
                            role
                            playerMatches {
                                id
                                agent
                                mvp
                                placement
                                trackerNetworkScore
                                averageCombatScore
                                kills
                                deaths
                                assists
                                killDeathRatio
                                plusMinus
                                damageDelta
                                averageDamagePerRound
                                headshotPercentage
                                killedAssistedSurvivedTraded
                                firstKills
                                firstDeaths
                                threeK
                                fourK
                                fiveK
                                sixK
                                multies
                            }
                            playerMatchCount
                        }
                        teamMatches {
                            id
                            playedAt
                            duration
                            practice
                            map
                            enemyName
                            enemyTag
                            enemyLink
                            enemyImageLink
                            teamScore
                            enemyScore
                        }
                        teamMatchCount
                    }
                }              
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

function playerCardRenderer(players: Player[]) {
    var playerCards = [];

    for (let player of players) {
        playerCards.push(
            <PlayerCard player={player} key={player.id} />
        )
    }

    return (
        playerCards
    )
}