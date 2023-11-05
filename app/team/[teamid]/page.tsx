import PlayerCard from '@/components/PlayerCard'
import type { Player } from '@/app/(types)/GraphQLStructures'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { teamid: number} }) {
    const { data } = await getData(params.teamid);

    return (
        <>
            {playerCardRenderer(data.teamById.players)}
        </>
    )
}

async function getData(teamid: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        // next: { revalidate: 10 },
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            query TeamById {
                teamById(id: ${teamid}) {
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
                        teamId
                        createdAt
                        lastModifiedAt
                        datePlayedAt
                        tournamentGames {
                            id
                            tournamentId
                            createdAt
                            lastModifiedAt
                            playedAt
                            duration
                            team1 {
                                id
                                tournamentId
                                createdAt
                                lastModifiedAt
                                name
                                tag
                                rank
                                link
                                imageLink
                            }
                            team1Score
                            team2 {
                                id
                                tournamentId
                                createdAt
                                lastModifiedAt
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
                            tournamentId
                            createdAt
                            lastModifiedAt
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
                        createdAt
                        lastModifiedAt
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
                            playerId
                            teamMatchId
                            createdAt
                            lastModifiedAt
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
                        teamId
                        createdAt
                        lastModifiedAt
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