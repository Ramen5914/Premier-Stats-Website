import { Team } from "@/app/(types)/GraphQLStructures";
import Image from 'next/image'
import Link from "next/link";


type Props = {
    params: { teamid: number }
}

export default async function Team({ params }: Props) {
    return (
        <>
            {await teamCardRenderer(params.teamid)}
        </>
    )
}

async function teamCardRenderer(teamId: number) {

    let team: Team = await getTeam(teamId);

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
                <Link className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 duration-300" href={team.link}>
                    <svg className="h-4 dark:text-white" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 189.177 64.563" xmlSpace="preserve">
                        <g transform="translate(-40.878 -103.185)">
                            <g fillOpacity="1" transform="translate(-.132 13.232)">
                                <path fill="#e44020" d="M184.415 134.607v-19.91l13.272 19.91 13.272 19.91h19.228V89.958h-17.462v19.05c0 10.478-.09 19.047-.198 19.043-.11-.004-5.903-8.577-12.876-19.05l-12.676-19.043h-20.288v64.559h17.728z" display="inline" />
                                <path fill="currentColor" d="M79.11 130.44v-24.078H99.483v48.155h17.727v-48.155h28.84v8.462l-12.766.069-12.766.068-.07 7.866-.07 7.866 5.482.072 5.482.071 6.324 11.84 6.323 11.84H163.226l-1.03-1.918c-.567-1.055-3.415-6.38-6.33-11.835l-5.298-9.916 1.992-.337c5.426-.916 9.627-5.179 10.441-10.594.182-1.213.254-5.226.193-10.848 0-7.46.342-19.11-10.939-18.977l-54.822-.069-56.423-.068v16.409H61.383v48.154H79.11z" display="inline" />
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

async function getTeam(teamid: number): Promise<Team> {
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
                            teamScore
                            enemyScore
                        }
                        record {
                            wins
                            losses
                        }
                        roundRecord {
                            wins
                            losses
                        }
                    }
                }   
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let resJson = await response.json();

    return await resJson.data.teamById;
}