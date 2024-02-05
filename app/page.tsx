import Link from "next/link";
import { teamSchema, type TeamType, type TeamSchemaType } from "./schemas";
import type { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Premier Teams",
    description: "List of all teams tracked by my website.",
};

export default async function Page() {
    const data = await getData();

    return (
        <main className='grow max-w-7xl flex flex-col space-y-4 mx-auto px-4 sm:px-6 md:px-8'>
            {teamCardRenderer(data)}
        </main>
    );
}

async function getData() {
    const response = await fetch(`http://localhost:8080/graphql`, {
        // next: { revalidate: 10 },
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            query AllTeams {
                allTeams {
                  id
                  name
                  tag
                  episode
                  act
                  division
                  rank
                  imageLink
                  region
                  playerCount
                }
              }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let data: TeamSchemaType = (await response.json()).data.allTeams;

    if (teamSchema.parse(data)) {
        return data as TeamSchemaType;
    } else {
        throw new Error("Response data is incorrect.");
    }
}

function teamCardRenderer(teams: TeamSchemaType) {
    let teamCards = [];

    for (let team of teams) {
        teamCards.push(
            <Link href={"/team/" + team.id} key={team.id}>
                <div className='dark:bg-slate-900 shadow-lg hover:shadow-2xl p-4 rounded-2xl flex flex-row space-x-4 xl:w-[76rem] ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[350ms] hover:translate-x-1 hover:-translate-y-1'>
                    <Image
                        priority
                        src={team.imageLink}
                        alt=''
                        width={128}
                        height={128}
                    />
                    <div className='dark:bg-current w-[2px]'></div>
                    <div className='flex flex-col justify-between grow'>
                        <div className='flex flex-row h-min justify-between items-center'>
                            <div className='flex flex-row h-min'>
                                <h1 className='text-3xl font-medium'>
                                    {team.name}
                                </h1>
                                <span className='text-xl ml-2 px-2 py-1 bg-indigo-500 text-white rounded-md'>
                                    #{team.tag}
                                </span>
                            </div>
                            <div className='flex flex-row h-min'>
                                <h1 className='text-xl font-normal'>
                                    Episode <span>{team.episode}</span>,{" "}
                                    <span>Act {team.act}</span>
                                </h1>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 items-center'>
                            <div className='flex flex-row items-center m-auto'>
                                <Image
                                    priority
                                    src={
                                        "/images/premier/" +
                                        team.division +
                                        ".png"
                                    }
                                    alt=''
                                    width={64}
                                    height={64}
                                />
                                <span className='text-xl'>{team.division}</span>
                            </div>
                            <div className='flex flex-row items-center m-auto'>
                                <Image
                                    priority
                                    src={
                                        "/images/region/" + team.region + ".png"
                                    }
                                    alt=''
                                    width={64}
                                    height={64}
                                />
                                <span className='text-xl'>{team.region}</span>
                            </div>
                            <div className='flex flex-row items-center m-auto'>
                                <svg
                                    className='p-3'
                                    width='64'
                                    height='64'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    version='1.1'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        id='path1'
                                        stroke='#29ffa6'
                                        d='m 18,18.72 a 9.094,9.094 0 0 0 3.741,-0.479 3,3 0 0 0 -4.682,-2.72 M 21,9.75 a 2.25,2.25 0 1 1 -4.5,0 2.25,2.25 0 0 1 4.5,0 z'
                                    />
                                    <path
                                        id='path8'
                                        stroke='#d059ff'
                                        d='m 6.942,15.522 a 3,3 0 0 0 -4.681,2.72 8.986,8.986 0 0 0 3.74,0.477 M 7.5,9.75 a 2.25,2.25 0 1 1 -4.5,0 2.25,2.25 0 0 1 4.5,0 z'
                                    />
                                    <path
                                        id='path6'
                                        stroke='#36d7ff'
                                        d='m 18,18.719 a 5.971,5.971 0 0 0 -0.941,-3.197 m 0,0 A 5.995,5.995 0 0 0 12,12.75 5.995,5.995 0 0 0 6.942,15.522 M 17.999,18.719 18,18.75 c 0,0.225 -0.012,0.447 -0.037,0.666 A 11.944,11.944 0 0 1 12,21 C 9.83,21 7.793,20.424 6.037,19.416 A 6.062,6.062 0 0 1 6,18.719 m 0.941,-3.197 a 5.971,5.971 0 0 0 -0.94,3.197 M 15,6.75 a 3,3 0 1 1 -6,0 3,3 0 0 1 6,0 z'
                                    />
                                </svg>
                                <span className='text-xl'>
                                    {team.playerCount}
                                </span>
                            </div>
                            <div className='flex flex-row items-center m-auto'>
                                <svg
                                    className='p-3'
                                    width='64'
                                    height='64'
                                    viewBox='0 0 24 24'
                                    version='1.1'
                                    xmlns='http://www.w3.org/2000/svg'
                                    strokeLinecap='round'
                                >
                                    <path
                                        stroke='#ff4d4d'
                                        d='M 21,16.5 16.5,21 m 0,0 L 12,16.5 M 16.5,21 V 7.5'
                                        id='path2'
                                    />
                                    <path
                                        stroke='#5eff6c'
                                        d='M 3,7.5 7.5,3 m 0,0 4.5,4.5 M 7.5,3 v 13.5'
                                        id='path1'
                                    />
                                </svg>
                                <span className='text-xl'>#{team.rank}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>,
        );
    }

    return teamCards;
}
