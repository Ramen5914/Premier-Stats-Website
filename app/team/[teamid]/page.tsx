import type { Team as TeamType, TeamMatch as TeamMatchType, Tournament as TournamentType, Player as PlayerType, Team } from '@/app/(types)/GraphQLStructures'
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
    const teamData: TeamType = await getAllData(params.teamid);

    if (teamData.record == undefined) {
        throw new Error('Missing Team Record');
    }
    if (teamData.roundRecord == undefined) {
        throw new Error('Missing Team Round Record.')
    }
    if (teamData.players == undefined) {
        throw new Error('Missing Players.')
    }
    if (teamData.teamMatches == undefined) {
        throw new Error('Missing Team Matches.')
    }
    // if (teamData.tournament == undefined) {
    //     throw new Error('Missing Tournament.')
    // }

    const team: TeamType = {
        id: teamData.id,
        name: teamData.name,
        tag: teamData.tag,
        episode: teamData.episode,
        act: teamData.act,
        division: teamData.division,
        score: teamData.score,
        record: {
            wins: teamData.record.wins,
            losses: teamData.record.losses
        },
        roundRecord: {
            wins: teamData.roundRecord.wins,
            losses: teamData.roundRecord.losses
        },
        rank: teamData.rank,
        link: teamData.link,
        imageLink: teamData.imageLink,
        region: teamData.region
    }


    const players: PlayerType[] = teamData.players;
    const teamMatches: TeamMatchType[] = teamData.teamMatches;
    const tourmanent: TournamentType | undefined = teamData.tournament;

    return (
        <main className="grow grid grid-cols-7 mx-auto">
            <div className='col-span-2'>
                {await playerCardRenderer(players)}
                <Players params={{ teamid: params.teamid }} />
            </div>
            <div className="flex flex-col space-y-4 col-span-3 mx-8">
                {await teamMatchCardRenderer(teamMatches, tourmanent)}
            </div>
            <div className='col-span-2'>
                {await teamCardRenderer(team)}
                {/* <Team params={{ teamid: params.teamid }} /> */}
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
                            enemyName
                            enemyTag
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

    return data;
}

function playerCardRenderer(players: PlayerType[]): React.ReactNode {
    const rankSize: number = 40;
    const bannerSize: number = 64;
    const roleSize: number = 20;

    let playerCards: React.ReactNode[] = [];
    let subCards: React.ReactNode[] = [];
    let exCards: React.ReactNode[] = [];

    for (let player of players) {
        const captain: boolean = (player.role == "Captain")
        const substitute: boolean = (player.role == "Substitute")
        const exPlayer: boolean = (player.role == "Ex-Player")

        let tempCard: React.ReactNode = (
            <Link key={player.id} href={`/team/${player.teamId}/player/${player.id}`}>
                <div className="rounded-lg border-slate-800 hover:border-slate-600 duration-[350ms] border-2 p-1 flex flex-row min-w-max space-x-2">
                    <Image priority className='rounded-sm' src={player.imageLink} alt="" width={bannerSize} height={bannerSize} />
                    <div className="my-1 w-[2px] bg-slate-800"></div>
                    <div className="flex flex-col grow">
                        <div className="flex flex-row justify-between items-center space-x-8">
                            <div className="flex flex-row items-center space-x-2">
                                <h1 className="text-2xl">{player.displayName}</h1>
                                <span className='text-sm font-normal text-white bg-indigo-500 px-[0.4rem] rounded-lg'>{player.name}#{player.tag}</span>
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
                            <span className="italic text-slate-700">{player.title}</span>
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

        return <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col min-w-max mr-2'>
        <h1 className="text-3xl self-center">Players:</h1>
            <div className="flex flex-col space-y-2">
                {cards}
            </div>
        </div>
    }
}

    async function teamCardRenderer(team: TeamType) {
        return (<h1>Hello</h1>)
    }

    async function teamMatchCardRenderer(teamMatches: TeamMatchType[], tournament: TournamentType | undefined) {
        const enemyImageSize: number = 80;

        let compiledMatches: React.ReactNode[] = [];

        if (undefined != tournament) {
            compiledMatches.push(<h1>Tourney?</h1>)
        }

        for (let teamMatch of teamMatches) {
            if (teamMatch.teamScore == null) {
                throw new Error('Team score not found.')
            }
            if (teamMatch.enemyScore == null) {
                throw new Error('Enemy score not found.')
            }
            if (teamMatch.playedAt == null) {
                throw new Error('Match date/time not found.')
            }
            if (teamMatch.duration == null) {
                throw new Error('Match duration not found.')
            }
            if (teamMatch.enemyImageLink == null) {
                throw new Error('Enemy image not found.')
            }

            let win: boolean = teamMatch.teamScore > teamMatch.enemyScore;
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
                    <div className='text-slate-300 dark:bg-slate-900 shadow-xl hover:shadow-2xl p-3 rounded-2xl flex flex-row space-x-4 ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[300ms] hover:translate-x-1 hover:-translate-y-1'>
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
