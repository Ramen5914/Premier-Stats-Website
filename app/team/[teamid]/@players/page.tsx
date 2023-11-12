import { Player } from "@/app/(types)/GraphQLStructures"
import Link from "next/link";
import Image from "next/image"

type Props = {
    params: { teamid: number }
}

export default async function Players({ params }: Props) {
    return (
        <div className='dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col max-w-min'>
            <h1 className="text-3xl self-center">Players:</h1>
            <div className="flex flex-col space-y-2">
                {await playerCardRenderer(params.teamid)}
            </div>
        </div>
    )
}

async function playerCardRenderer(teamId: number) {
    const rankSize: number = 35;
    const bannerSize: number = 64;
    const roleSize: number = 20;

    let players: Player[] = await getPlayers(teamId);

    let playerCards: React.ReactNode[] = [];
    let subCards: React.ReactNode[] = [];
    let exCards: React.ReactNode[] = [];

    for (let player of players) {
        const captain: boolean = (player.role == "Captain")
        const substitute: boolean = (player.role == "Substitute")
        const exPlayer: boolean = (player.role == "Ex-Player")

        let tempCard = (
            <Link key={player.id} href={`/team/${teamId}/player/${player.id}`}>
                <div className="rounded-lg border-slate-800 hover:border-slate-600 duration-[350ms] border-2 p-1 flex flex-row min-w-max space-x-2">
                    <Image priority className='rounded-md' src={player.imageLink} alt="" width={bannerSize} height={bannerSize} />
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
                            <div>
                                <Image src={'/images/rank/' + player.peakRank + '.png'} alt='' width={rankSize} height={rankSize} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <span className="italic text-slate-700">&quot;{player.title}&quot;</span>
                        </div>
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

    return cards;
}

async function getPlayers(teamid: number): Promise<Player[]> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamById {
                    teamById(id: ${teamid}) {
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

    let resJson = await response.json();

    return await resJson.data.teamById.players;
}