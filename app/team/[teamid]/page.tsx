import type { TeamMatch, Tournament } from '@/app/(types)/GraphQLStructures'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

type Props = {
    params: { teamid: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query TeamById {
                    teamById(id: ${params.teamid}) {
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

    let data = (await response.json()).data.teamById;

    return {
        title: `${data.name}#${data.tag}`
    }
}

export default async function Page({ params }: Props) {
    return (
        <main className="grow flex flex-row px-4">
            <div className="grow">
                <div>

                </div>
            </div>
            <div className="grow max-w-7xl flex flex-col space-y-4 mx-auto px-1">
                {await teamMatchCardRenderer(params.teamid)}
            </div>
            <div className="grow">
                <div>

                </div>
            </div>
        </main>
    )
}

async function teamMatchCardRenderer(teamid: number) {
    let data: [TeamMatch[], Tournament | null] = await getTeamMatches(teamid);

    let compiledMatches: React.ReactNode[] = [];

    let teamMatches: TeamMatch[] = data[0];
    let tournament: Tournament | null = data[1]

    if (null != tournament) {
        compiledMatches.push(<h1>Tourney?</h1>)
    }

    for (let teamMatch of teamMatches) {
        let win: boolean = teamMatch.teamScore > teamMatch.enemyScore;
        let [date, time] = teamMatch.playedAt.split('T');
        let [year, month, day] = date.split('-');
        let [hour, minute] = time.split(':');
        let timeOfDay: String = "AM";

        if (hour == '00') {
            hour = "12";
        } else if (parseInt(hour) > 12) {
            hour = (parseInt(hour) - 12).toString();
            timeOfDay = "PM"
        }

        compiledMatches.push(
            <Link href={`/team/${teamid}/match/${teamMatch.id}`}>
                <div className='dark:bg-slate-900 shadow-lg hover:shadow-2xl p-4 rounded-2xl flex flex-row space-x-4 xl:w-[76rem] ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[300ms] hover:translate-x-1 hover:-translate-y-1'>
                    <Image className='rounded-md' priority src={teamMatch.enemyImageLink} alt="" width={128} height={128} />
                    <div className='dark:bg-current w-[2px]'></div>
                    <div className='flex flex-col grow'>
                        <div className='flex flex-row h-min justify-between items-center'>
                            <div className='flex flex-row h-min'>
                                <h1 className='text-3xl font-medium'>{teamMatch.enemyName}</h1>
                                <span className='text-xl ml-2 px-2 py-1 bg-indigo-500 text-white rounded-md'>#{teamMatch.enemyTag}</span>
                            </div>
                            <div className='flex flex-row h-min'>
                                <span className='text-xl'>
                                    {`${month}/${day}/${year}, ${hour}:${minute} ${timeOfDay}`}
                                </span>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 min-w-max grow'>
                            {
                                (
                                    win
                                    &&
                                    <div className='flex flex-row items-center space-x-2 max-w-min'>
                                        <span className='text-3xl font-bold text-green-600'>{teamMatch.teamScore}</span>
                                        <span className='font-bold text-3xl'>-</span>
                                        <span className='text-2xl font-normal text-red-700'>{teamMatch.enemyScore}</span>
                                    </div>

                                )
                                ||
                                (
                                    !win
                                    &&
                                    <div className='flex flex-row items-center space-x-2 max-w-min'>
                                        <span className='text-2xl font-normal text-green-600'>{teamMatch.teamScore}</span>
                                        <span className='font-bold text-3xl'>-</span>
                                        <span className='text-3xl font-bold text-red-700'>{teamMatch.enemyScore}</span>
                                    </div>
                                )
                            }
                            <div>
                                <span className='text-3xl'>{teamMatch.map}</span>
                            </div>
                            <div className='rounded-lg bg-green-600 px-2 py-1 max-w-min h-min my-auto ml-auto'>
                                <h1 className='text-xl font-normal text-slate-900'>+{teamMatch.score}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return compiledMatches;
}

async function getTeamMatches(teamid: number): Promise<[TeamMatch[], Tournament | null]> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamById {
                    teamById(id: ${teamid}) {
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
                            score
                        }
                    }
                }
                            
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let data = (await response.json()).data.teamById;

    return await [data.teamMatches, data.tournament];
}