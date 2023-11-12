import { Team } from "@/app/(types)/GraphQLStructures";
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    params: { teamid: number }
}

export default async function Page({ params }: Props) {
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
    var barPercent: number = (team.score / qualifyReq) * 100
    if (barPercent > 100) {
        barPercent = 100;
    }

    const barFill: string = `${barPercent}%`

    return (
        <div className="max-w-min">
            <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col mr-auto min-w-max space-y-2'>
                <div className="flex flex-row justify-between">
                    <Image priority src={team.imageLink} alt="" width={teamIconSize} height={teamIconSize} />
                    <div className='flex flex-row space-x-2 items-center h-min'>
                        <span className="text-xl">{team.division}</span>
                        <Image className='h-min' priority src={`/images/premier/${team.division}.png`} alt="" width={divisionSize} height={divisionSize} />
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <h1 className="text-3xl">
                        {team.name}
                        <span className='ml-2 text-xl font-normal text-white bg-indigo-500 px-2 py-1 rounded-lg'>#{team.tag}</span>
                    </h1>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <label className="text-lg">{team.score}/600</label>
                    <div className="bg-slate-700 w-96 h-5 rounded-lg">
                        <div style={{ width: barFill, height: "100%" }} className="bg-amber-400 rounded-lg" />
                    </div>
                </div>
                {/* <div className="flex flex-col grow">
                        <div className="flex flex-row justify-between items-center space-x-8">
                            <div className="flex flex-row items-center space-x-2">
                                <h1 className="text-2xl">{team.name}</h1>
                                <span className='text-sm font-normal text-white bg-indigo-500 px-[0.4rem] rounded-lg'>{team.name}#{team.tag}</span>
                            </div>
                            <div>
                                <Image src={'/images/premier/' + team.division + '.png'} alt='' width={rankSize} height={rankSize} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <span className="italic text-slate-700">{`"${team.playerCount}"`}</span>
                        </div>
                    </div> */}
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
                        playerCount
                        teamMatchCount
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