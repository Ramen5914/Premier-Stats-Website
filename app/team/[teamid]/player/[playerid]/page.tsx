import { Metadata } from "next";
import {
    type PlayerMatchType,
    type PlayerType,
    playerSchema,
    playerMatchSchema,
    TeamMatchType,
    teamMatchSchema,
} from "./schemas";
import Image from "next/image";
import Link from "next/link";
import PlayerMatch from "@/components/PlayerMatch";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        teamid: number;
        playerid: number;
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
                query PlayerById {
                    playerById(id: ${params.playerid}) {
                        name
                        tag
                    }
                }              
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let resJson = (await response.json()).data.playerById;

    return {
        title: `${resJson.name}#${resJson.tag}`,
    };
}

export default async function Page({ params }: Readonly<Props>) {
    const playerData: PlayerType = await getAllData(params.playerid);
    const playerMatches: PlayerMatchType[] = playerData.playerMatches;

    return (
        <main className='grow mx-auto flex'>
            <div className='grid-cols-3 grid gap-4'>
                <div className='col-span-1'>{createPlayerCard(playerData)}</div>
                <div className='col-span-2 flex flex-col space-y-4'>
                    {createPlayerMatchCards(playerMatches, playerData)}
                </div>
            </div>
        </main>
    );
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
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let data: PlayerType = (await response.json()).data.playerById;

    if (playerSchema.parse(data)) {
        return data;
    } else {
        throw new Error("Response data is incorrect.");
    }
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
                        playedAt
                        duration
                        map
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
        return data as TeamMatchType;
    } else {
        throw new Error("Response data is incorrect.");
    }
}

function createPlayerCard(player: PlayerType): React.ReactNode {
    const playerIconSize: number = 128;
    const rankSize: number = 56;

    return (
        <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col min-w-max space-y-2 ml-2'>
            <div className='flex flex-row justify-between'>
                <Image
                    priority
                    src={player.imageLink}
                    alt=''
                    width={playerIconSize}
                    height={playerIconSize}
                    className='rounded-lg border-2 border-slate-400'
                />
                <div className='flex flex-col justify-between items-end'>
                    <div className='flex flex-row space-x-2 items-center h-min'>
                        <span className='text-xl'>{player.peakRank}</span>
                        <Image
                            className='h-min'
                            priority
                            src={`/images/rank/${player.peakRank}.png`}
                            alt=''
                            width={rankSize}
                            height={rankSize}
                        />
                    </div>
                    <div className='flex flex-row space-x-2 items-center h-min'>
                        <span className='text-xl'>{player.currentRank}</span>
                        <Image
                            className='h-min'
                            priority
                            src={`/images/rank/${player.currentRank}.png`}
                            alt=''
                            width={rankSize}
                            height={rankSize}
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center space-x-2 justify-between'>
                <h1 className='text-3xl flex-row flex items-center mr-10 text-slate-400'>
                    {player.name}
                    <span className='ml-2 text-xl font-normal text-white bg-indigo-500 px-2 py-1 rounded-lg'>
                        #{player.tag}
                    </span>
                </h1>
                <Link
                    className='p-2 rounded-md bg-slate-800 hover:bg-slate-700 duration-[350ms]'
                    href={player.link}
                >
                    <svg
                        className='h-4 dark:text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        version='1.1'
                        viewBox='0 0 189.177 64.563'
                        xmlSpace='preserve'
                    >
                        <g transform='translate(-40.878 -103.185)'>
                            <g
                                fillOpacity='1'
                                transform='translate(-.132 13.232)'
                            >
                                <path
                                    fill='currentColor'
                                    d='M79.11 130.44v-24.078H99.483v48.155h17.727v-48.155h28.84v8.462l-12.766.069-12.766.068-.07 7.866-.07 7.866 5.482.072 5.482.071 6.324 11.84 6.323 11.84H163.226l-1.03-1.918c-.567-1.055-3.415-6.38-6.33-11.835l-5.298-9.916 1.992-.337c5.426-.916 9.627-5.179 10.441-10.594.182-1.213.254-5.226.193-10.848 0-7.46.342-19.11-10.939-18.977l-54.822-.069-56.423-.068v16.409H61.383v48.154H79.11z'
                                    display='inline'
                                />
                                <path
                                    fill='#e44020'
                                    d='M184.415 134.607v-19.91l13.272 19.91 13.272 19.91h19.228V89.958h-17.462v19.05c0 10.478-.09 19.047-.198 19.043-.11-.004-5.903-8.577-12.876-19.05l-12.676-19.043h-20.288v64.559h17.728z'
                                    display='inline'
                                />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
            <div>
                <i className='text-slate-500 text-xl'>{player.quote}</i>
            </div>
        </div>
    );
}

function createPlayerMatchCards(
    playerMatches: PlayerMatchType[],
    playerData: PlayerType,
): React.ReactNode {

    let compiledMatches: React.ReactNode[] = [];

    playerMatches.forEach((match) => {
        compiledMatches.push(
            <PlayerMatch key={match.id} playerMatchId={match.id}></PlayerMatch>
        );
    });
    
    return compiledMatches;
}