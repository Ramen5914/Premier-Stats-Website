import { teamSchema, playerSchema, teamMatchSchema, tournamentSchema } from './schemas';
import type { TeamType, PlayerType, TeamMatchType, TournamentType } from './schemas'
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

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
    const teamData: TeamType = await getAllData(params.teamid);

    const players: PlayerType[] = teamData.players;
    const teamMatches: TeamMatchType[] = teamData.teamMatches;
    const tourmanent: TournamentType | undefined = teamData.tournament;

    return (
        <main className="grow grid grid-cols-7 mx-auto">
            <div className='col-span-2'>
                {playerCardRenderer(players)}
            </div>
            <div className="flex flex-col space-y-4 col-span-3 mx-8">
                {teamMatchCardRenderer(teamMatches, tourmanent)}
            </div>
            <div className='col-span-2'>
                {teamCardRenderer(teamData)}
            </div>
        </main>
    )
}

async function getAllData(teamid: number): Promise<TeamType> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamById {
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
                        teamMatches {
                            id
                            teamId
                            enemyName
                            enemyTag
                            practice
                            teamScore
                            enemyScore
                            playedAt
                            duration
                            enemyImageLink
                            score
                            map
                        }
                        record {
                            wins
                            losses
                        }
                        roundRecord {
                            wins
                            losses
                        }
                        players {
                            id
                            teamId
                            displayName
                            name
                            tag
                            peakRank
                            imageLink
                            role
                            title
                            playerMatchCount
                        }
                    }
                }   
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let data: TeamType = (await response.json()).data.teamById;

    if (teamSchema.parse(data)) {
        return data as TeamType;
    } else {
        throw new Error('Response data is incorrect.')
    }
}

function playerCardRenderer(players: PlayerType[]): React.ReactNode {
    const rankSize: number = 40;
    const bannerSize: number = 64;
    const roleSize: number = 20;

    let playerCards: React.ReactNode[] = [];
    let subCards: React.ReactNode[] = [];
    let exCards: React.ReactNode[] = [];

    for (let player of players) {
        if (!playerSchema.parse(player)) {
            throw new Error('Player incorrect');
        }

        const captain: boolean = (player.role == "Captain")
        const substitute: boolean = (player.role == "Substitute")
        const exPlayer: boolean = (player.role == "Ex-Member")

        let tempCard: React.ReactNode = (
            <Link key={player.id} href={`/team/${player.teamId}/player/${player.id}`}>
                <div className="rounded-lg border-slate-700 hover:border-slate-500 duration-[350ms] border-2 p-1 flex flex-row min-w-max space-x-2">
                    <Image priority className='rounded-sm' src={player.imageLink} alt="" width={bannerSize} height={bannerSize} />
                    <div className="my-1 w-[2px] bg-slate-700"></div>
                    <div className="flex flex-col grow">
                        <div className="flex flex-row justify-between items-center space-x-8">
                            <div className="flex flex-row items-center space-x-2">
                                <h1 className="text-2xl text-slate-400">{player.displayName}</h1>
                                {
                                    (
                                        captain
                                        &&
                                        <svg className='text-yellow-500' fill='currentColor' width={roleSize} height={roleSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                                        </svg>
                                    )
                                    ||
                                    (
                                        substitute
                                        &&
                                        <svg className='text-orange-400' width={roleSize} height={roleSize} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                            <path fill="none" fillOpacity="1" fillRule="evenodd" stroke="currentColor" strokeDasharray="none" strokeLinecap="round" strokeOpacity="1" strokeWidth="1.667" d="M2.29 16.95l6.694-6.217M2.29 16.95l6.695 6.217m13.294-6.217H2.29m19.422-9.9L15.016.833M21.71 7.05l-6.695 6.217M1.722 7.05H21.71" />
                                        </svg>
                                    )
                                    ||
                                    (
                                        exPlayer
                                        &&
                                        <svg className="text-red-600" width={roleSize} height={roleSize} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <span className="italic text-slate-500">{player.title}</span>
                        </div>
                    </div>
                    <div className="items-center flex">
                        <Image className="mr-2" src={'/images/rank/' + player.peakRank + '.png'} alt='' width={rankSize} height={rankSize} />
                    </div>
                </div>
            </Link>
        )

        if (substitute) {
            subCards.push(tempCard);
        } else if (exPlayer) {
            exCards.push(tempCard);
        } else {
            playerCards.push(tempCard);
        }
    }

    let cards: React.ReactNode = (
        <>
            <h1 className="text-lg border-b-[1px] border-current">Current Roster:</h1>
            {playerCards}
            {
                (subCards.length > 0) &&
                <>
                    <h1 className="text-lg border-b-[1px] border-current">Substitutes:</h1>
                    {subCards}
                </>
            }
            {
                (exCards.length > 0) &&
                <>
                    <h1 className="text-lg border-b-[1px] border-current">Ex-Players:</h1>
                    {exCards}
                </>
            }
        </>
    );

    return (
        <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col min-w-max mr-2'>
            <h1 className="text-3xl self-center">Players:</h1>
            <div className="flex flex-col space-y-2">
                {cards}
            </div>
        </div>
    )
}

function teamCardRenderer(team: TeamType) {
    const qualifyReq: number = 600;
    const divisionSize: number = 56;
    const teamIconSize: number = 128;
    var barPercent: number = (team.score / qualifyReq) * 100;
    if (barPercent > 100) {
        barPercent = 100;
    }

    const barFill: string = `${barPercent}%`

    // Chart Stuff:
    const datasetIdKey = 'id';
    let labels: string[] = [];
    let data: number[] = [];
    for (let teamMatch of team.teamMatches) {
        labels.push(teamMatch.enemyName);
        data.push(teamMatch.teamScore - teamMatch.enemyScore)
    }

    return (
        <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col min-w-max space-y-2 ml-2'>
            <div className="flex flex-row justify-between">
                <Image priority src={team.imageLink} alt="" width={teamIconSize} height={teamIconSize} />
                <div className="flex flex-col justify-between items-end">
                    <div className='flex flex-row space-x-2 items-center h-min'>
                        <span className="text-xl">{team.division}</span>
                        <Image className='h-min' priority src={`/images/premier/${team.division}.png`} alt="" width={divisionSize} height={divisionSize} />
                    </div>
                    <div className='flex flex-row space-x-2 items-center h-min'>
                        <span className="text-xl">{team.region}</span>
                        <Image className='h-min' priority src={`/images/region/${team.region}.png`} alt="" width={divisionSize} height={divisionSize} />
                    </div>
                </div>

            </div>
            <div className="flex flex-row items-center space-x-2 justify-between">
                <h1 className="text-3xl flex-row flex items-center">
                    {team.name}
                    <span className='ml-2 text-xl font-normal text-white bg-indigo-500 px-2 py-1 rounded-lg'>#{team.tag}</span>
                </h1>
                <Link className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 duration-[350ms]" href={team.link}>
                    <svg className="h-4 dark:text-white" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 189.177 64.563" xmlSpace="preserve">
                        <g transform="translate(-40.878 -103.185)">
                            <g fillOpacity="1" transform="translate(-.132 13.232)">
                                <path fill="currentColor" d="M79.11 130.44v-24.078H99.483v48.155h17.727v-48.155h28.84v8.462l-12.766.069-12.766.068-.07 7.866-.07 7.866 5.482.072 5.482.071 6.324 11.84 6.323 11.84H163.226l-1.03-1.918c-.567-1.055-3.415-6.38-6.33-11.835l-5.298-9.916 1.992-.337c5.426-.916 9.627-5.179 10.441-10.594.182-1.213.254-5.226.193-10.848 0-7.46.342-19.11-10.939-18.977l-54.822-.069-56.423-.068v16.409H61.383v48.154H79.11z" display="inline" />
                                <path fill="#e44020" d="M184.415 134.607v-19.91l13.272 19.91 13.272 19.91h19.228V89.958h-17.462v19.05c0 10.478-.09 19.047-.198 19.043-.11-.004-5.903-8.577-12.876-19.05l-12.676-19.043h-20.288v64.559h17.728z" display="inline" />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <label className="text-lg">{team.score}/600</label>
                <div className="bg-slate-700 h-5 rounded-lg" style={{ width: "100%" }}>
                    <div style={{ width: barFill, height: "100%" }} className="bg-amber-400 rounded-lg" />
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <h2 className="text-xl">
                    <span>Record: </span>
                    <span className="text-green-400">{team.record.wins}W</span>
                    <span className="font-bold m-1">-</span>
                    <span className="text-red-500">{team.record.losses}L</span>
                </h2>
                <h2 className="text-xl">
                    <span>Rounds: </span>
                    <span className="text-green-400">{team.roundRecord.wins}</span>
                    <span className="font-bold m-1">-</span>
                    <span className="text-red-500">{team.roundRecord.losses}</span>
                </h2>
            </div>
        </div>
    )
}

function teamMatchCardRenderer(teamMatches: TeamMatchType[], tournament: TournamentType | undefined) {
    const enemyImageSize: number = 80;

    let compiledMatches: React.ReactNode[] = [];

    if (undefined != tournament) {
        compiledMatches.push(<h1>Tourney?</h1>)
    }

    for (let teamMatch of teamMatches) {
        if (!teamMatchSchema.parse(teamMatch)) {
            throw new Error('Team match incorrect');
        }

        let win: boolean = teamMatch.score == 100;
        let [date, time] = teamMatch.playedAt.split('T');
        let [year, month, day] = date.split('-');
        let [hour, minute] = time.split(':');
        let timeOfDay: String = "a"; // default time in the AM


        if (hour == '00') {
            hour = "12";
        } else if (parseInt(hour) > 12) {
            hour = (parseInt(hour) - 12).toString();
            timeOfDay = "p"
        }

        let finalDuration = formatDuration(teamMatch.duration);
        let finalDate = `${month}/${day}/${year.toString().substring(2)}`;
        let finalTime = `${hour}:${minute}${timeOfDay}`;

        compiledMatches.push(
            <Link key={teamMatch.id} href={`/team/${teamMatch.teamId}/match/${teamMatch.id}`}>
                <div className='text-slate-400 dark:bg-slate-900 shadow-xl hover:shadow-2xl p-3 rounded-2xl flex flex-row space-x-4 ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[350ms] hover:translate-x-1 hover:-translate-y-1'>
                    <Image className='rounded-md' priority src={teamMatch.enemyImageLink} alt="" width={enemyImageSize} height={enemyImageSize} />
                    <div className='dark:bg-slate-200 w-[2px]'></div>
                    <div className='flex flex-col grow'>
                        <div className='flex flex-row h-min justify-between space-x-8'>
                            <div className='flex flex-row h-min space-x-2 items-center'>
                                <h1 className='text-2xl font-medium'>{teamMatch.enemyName}</h1>
                                <span className='text-md px-2 py-[2px] bg-indigo-500 text-white rounded-md max-h-min'>#{teamMatch.enemyTag}</span>
                            </div>
                            <span className='text-lg text-slate-500 items-start h-min'>
                                {`${finalDate}@${finalTime} | ${finalDuration}`}
                            </span>
                        </div>
                        <div className='grid grid-cols-3 grow items-center'>
                            <h1 className='text-xl text-slate-500'>{teamMatch.map}
                                {
                                    teamMatch.practice
                                    &&
                                    <span className='ml-1 text-sm text-orange-400'>(Practice)</span>
                                }
                            </h1>
                            <h1 className='text-2xl mx-auto flex flex-row space-x-1'>
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

function formatDuration(duration: string): string {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

    const match = duration.match(regex);

    if (match == null) {
        throw new Error(`RegEx match not found in ${duration}`)
    }

    let h: number = parseInt(match[1]);
    let hours: string;
    let m: number = parseInt(match[2]);
    let minutes: string;
    let s: number = parseInt(match[3]);
    let seconds: string;

    if (Number.isNaN(h) || h == 0) {
        hours = '';
    } else {
        if (h.toString().length > 2) {
            throw new Error('Hours in duration is too long.');
        } else if (h.toString().length == 2) {
            hours = `${h}h `;
        } else {
            hours = `0${h}h `;
        }
    }

    if (Number.isNaN(m) || m == 0) {
        minutes = '00m '
    } else {
        if (m.toString().length > 2) {
            throw new Error('Minutes in duration is too long.');
        } else if (m.toString().length == 2) {
            minutes = `${m}m `;
        } else {
            minutes = `0${m}m `;
        }
    }

    if (Number.isNaN(s) || s == 0) {
        seconds = '00s'
    } else {
        if (s.toString().length > 2) {
            throw new Error('Seconds in duration is too long.');
        } else if (m.toString().length == 2) {
            seconds = `${s}s`
        } else {
            seconds = `0${s}s`
        }
    }

    return `${hours}${minutes}${seconds}`;
}
