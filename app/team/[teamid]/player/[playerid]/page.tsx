import { Metadata } from "next";
import { type PlayerMatchType, type PlayerType, playerSchema } from "./schemas";

export const dynamic = 'force-dynamic';

type Props = {
    params: {
        teamid: number,
        playerid: number
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query PlayerById {
                    playerById(id: ${params.playerid}) {
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

    let resJson = (await response.json()).data.playerById;

    return {
        title: `${resJson.name}#${resJson.tag}`
    }
}

export default async function Page({ params }: Props) {
    const playerData: PlayerType = await getAllData(params.playerid);
    const playerMatches: PlayerMatchType[] = playerData.playerMatches;


    return (
        <main className="grow mx-auto flex">
            <div className="w-96 h-5/6">
                <h1>Hello World</h1>
            </div>
        </main>
    )
}

async function getAllData(playerid: number): Promise<PlayerType> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamById {
                    playerById(id: ${playerid}) {
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
                        title
                        quote
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
                }   
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let data: PlayerType = (await response.json()).data.playerById;

    if (playerSchema.parse(data)) {
        return data as PlayerType;
    } else {
        throw new Error('Response data is incorrect.')
    }
}