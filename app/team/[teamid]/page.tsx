import type { TeamMatch, Tournament } from '@/app/(types)/GraphQLStructures'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Players from './@players/page'
import Team from './@team/page'

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
        <main className="grow grid grid-cols-8 mx-auto">
            <div className='col-span-2'>
                <Players params={{teamid: params.teamid}} />
            </div>
            <div className="flex flex-col space-y-4 col-span-4 mx-12">
                {await teamMatchCardRenderer(params.teamid)}
            </div>
            <div className='col-span-2'>
                <Team params={{teamid: params.teamid}} />
            </div>
        </main>
    )
}

async function teamMatchCardRenderer(teamid: number) {
    const enemyImageSize: number = 80;
    const mapColors: { [key: string]: string } = {
        Ascent: "#B86368",
        Bind: "#93735F",
        Breeze: "#F4ECD2",
        Fracture: "#678258",
        Haven: "#B47D79",
        Icebox: "#5A8EE4",
        Lotus: "#AA7993",
        Pearl: "#3A9FA9",
        Split: "#638B76",
        Sunset: "#98403A"
    }

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
        let duration = formatDuration(teamMatch.duration);

        console.log(formatDuration(''))

        let mapColor = mapColors[teamMatch.map];

        if (hour == '00') {
            hour = "12";
        } else if (parseInt(hour) > 12) {
            hour = (parseInt(hour) - 12).toString();
            timeOfDay = "PM"
        }

        compiledMatches.push(
            <Link key={teamMatch.id} href={`/team/${teamid}/match/${teamMatch.id}`}>
                <div className='text-slate-300 dark:bg-slate-900 shadow-xl hover:shadow-2xl p-3 rounded-2xl flex flex-row space-x-4 ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[300ms] hover:translate-x-1 hover:-translate-y-1'>
                    <Image className='rounded-md' priority src={teamMatch.enemyImageLink} alt="" width={enemyImageSize} height={enemyImageSize} />
                    <div className='dark:bg-slate-200 w-[2px]'></div>
                    <div className='flex flex-col grow'>
                        <div className='flex flex-row h-min justify-between'>
                            <div className='flex flex-row h-min space-x-2 items-center'>
                                <h1 className='text-2xl font-medium'>{teamMatch.enemyName}</h1>
                                <span className='text-md px-2 py-[2px] bg-indigo-500 text-white rounded-md max-h-min'>#{teamMatch.enemyTag}</span>
                            </div>
                            <span className='text-lg text-slate-500 items-start h-min'>
                                {`${month}/${day}/${year}, ${hour}:${minute} ${timeOfDay} | ${duration}`}
                            </span>
                        </div>
                        <div className='grid grid-cols-3 grow items-center'>
                            <h1 className='text-xl'>{teamMatch.map}
                                {
                                    teamMatch.practice
                                    &&
                                    <span className='ml-1 text-sm text-orange-400'>(Practice)</span>
                                }
                            </h1>
                            <h1 className='text-3xl mx-auto flex flex-row space-x-1'>
                                {
                                    (
                                        win
                                        &&
                                        <>
                                            <span className='font-bold text-green-400'>{teamMatch.teamScore}</span>
                                            <span className='font-bold'>-</span>
                                            <span className='font-normal text-red-500'>{teamMatch.enemyScore}</span>
                                        </>
                                    )
                                    ||
                                    (
                                        !win
                                        &&
                                        <>
                                            <span className='font-normal text-green-400'>{teamMatch.teamScore}</span>
                                            <span className='font-bold'>-</span>
                                            <span className='font-bold text-red-500'>{teamMatch.enemyScore}</span>
                                        </>
                                    )
                                }
                            </h1>

                            {
                                (
                                    win
                                    &&
                                    !teamMatch.practice
                                    &&
                                    <div className='rounded-lg bg-green-400 px-2 py-1 max-w-min ml-auto'>
                                        <h1 className='text-xl font-normal text-slate-900'>+{teamMatch.score}</h1>
                                    </div>
                                )
                                ||
                                (
                                    !win
                                    &&
                                    !teamMatch.practice
                                    &&
                                    <div className='rounded-lg bg-red-500 px-2 py-1 max-w-min ml-auto'>
                                        <h1 className='text-xl font-normal text-slate-900'>+{teamMatch.score}</h1>
                                    </div>
                                )
                                ||
                                (
                                    teamMatch.practice
                                    &&
                                    <div className='rounded-lg bg-orange-400 px-2 py-1 max-w-min ml-auto'>
                                        <h1 className='text-xl font-normal text-slate-900'>+{teamMatch.score}</h1>
                                    </div>
                                )
                            }
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

function formatDuration(duration: string): string {
    // Regular expression to extract hours, minutes, and seconds
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

    // Extracting hours, minutes, and seconds using regex
    const match = duration.match(regex);

    if (!match) {
        throw new Error('Invalid duration format');
    }

    // Helper function to pad a number with leading zeros
    const padWithZeros = (num: string | number, targetLength: number): string => {
        let paddedNum = String(num);
        while (paddedNum.length < targetLength) {
            paddedNum = '0' + paddedNum;
        }
        return paddedNum;
    };

    // Extracted values for hours, minutes, and seconds
    const hours = match[1] ? padWithZeros(match[1], 2) + 'h' : '';
    const minutes = match[2] ? padWithZeros(match[2], 2) + 'm' : '00m';
    const seconds = match[3] ? padWithZeros(match[3], 2) + 's' : '00s';

    // Formatting the result
    const formattedDuration = [hours, minutes, seconds].join(' ').trim();

    return formattedDuration || '00s'; // Return '00s' if the duration is empty
}