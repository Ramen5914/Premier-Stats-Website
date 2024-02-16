import { Metadata } from "next";
import { MetaType, metaSchema } from "./metaSchema";
import { TeamMatchType, teamMatchSchema } from "./schema";

type Props = {
    params: {
        teamid: number;
        matchid: number;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query TeamMatchById {
                    teamMatchById(id: ${params.matchid}) {
                        enemyName
                        enemyTag
                    }
                }              
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let data: MetaType = (await response.json()).data.teamMatchById;

    if (metaSchema.parse(data)) {
        return {
            title: `${data.enemyName}#${data.enemyTag}`,
        };
    } else {
        throw new Error("Response data is incorrect.");
    }
}

export default async function Page({ params }: Props) {
    let teamMatchData: TeamMatchType = await getTeamMatchData(params.matchid);

    return (
        <div>
            <h1 className='text-4xl text-white'>{`${teamMatchData.enemyName}#${teamMatchData.enemyTag}`}</h1>
            <h2 className='text-2xl text-white'>{`Player: ${teamMatchData.playerMatches[0].playerId}, ACS: ${teamMatchData.playerMatches[0].averageCombatScore}`}</h2>
            <h2 className='text-2xl text-white'>{`Player: ${teamMatchData.playerMatches[1].playerId}, ACS: ${teamMatchData.playerMatches[1].averageCombatScore}`}</h2>
            <h2 className='text-2xl text-white'>{`Player: ${teamMatchData.playerMatches[2].playerId}, ACS: ${teamMatchData.playerMatches[2].averageCombatScore}`}</h2>
            <h2 className='text-2xl text-white'>{`Player: ${teamMatchData.playerMatches[3].playerId}, ACS: ${teamMatchData.playerMatches[3].averageCombatScore}`}</h2>
            <h2 className='text-2xl text-white'>{`Player: ${teamMatchData.playerMatches[4].playerId}, ACS: ${teamMatchData.playerMatches[4].averageCombatScore}`}</h2>
        </div>
    );
}

async function getTeamMatchData(teamMatchId: number): Promise<TeamMatchType> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamMatchById {
                    teamMatchById(id: ${teamMatchId}) {
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
                        score
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
                    }
                }   
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let data: TeamMatchType = (await response.json()).data.teamMatchById;

    if (teamMatchSchema.parse(data)) {
        return data;
    } else {
        throw new Error("Response data is incorrect.");
    }
}
