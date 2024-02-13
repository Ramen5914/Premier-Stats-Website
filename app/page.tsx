import Link from "next/link";
import { teamSchema, type TeamSchemaType } from "./schemas";
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
        return data;
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
                    <div className='dark:bg-current w-[2px]' />
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
                                    className='p-3 h-16 w-auto'
                                    width='144.43359'
                                    height='69.140633'
                                    viewBox='0 0 140 69'
                                    version='1.1'
                                    id='svg1'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <defs id='defs1' />
                                    <path
                                        className='text-blue-500'
                                        fill='currentColor'
                                        id='path57'
                                        d='m 28.12498,34.375 c 7.1289,0 13.4278,-6.4941 13.4278,-14.7949 0,-8.3985 -6.2989,-14.3555 -13.4278,-14.3555 -7.0801,0 -13.4277,6.1524 -13.4277,14.4043 0,8.252 6.3476,14.7461 13.4277,14.7461 z m 2e-5,5.859375 C 10.839917,40.234375 0,53.076197 0,63.623047 c 0,3.466786 1.9043115,5.517578 7.1289062,5.517578 H 35.505859 c -0.868634,-1.547164 -1.326171,-3.325945 -1.326171,-5.224609 0,-6.482675 3.643383,-13.669393 10.074218,-19.304688 C 39.875341,41.939472 34.433076,40.234375 28.125,40.234375 Z'
                                    />
                                    <path
                                        className='text-blue-700'
                                        fill='currentColor'
                                        id='path55'
                                        d='m 116.2596,34.375 c 7.129,0 13.428,-6.4941 13.428,-14.7949 0,-8.3985 -6.348,-14.3555 -13.428,-14.3555 -7.08,0 -13.427,6.1524 -13.427,14.4043 0,8.252 6.347,14.7461 13.427,14.7461 z m 1.7e-4,5.859375 c -6.29822,0 -11.73524,1.709016 -16.10938,4.386719 6.41771,5.633747 10.05469,12.816216 10.05469,19.294922 0,1.898664 -0.45555,3.677445 -1.32422,5.224609 h 28.42383 c 5.22499,0 7.1289,-2.050792 7.1289,-5.517578 0,-10.54685 -10.83984,-23.388672 -28.17382,-23.388672 z'
                                    />
                                    <path
                                        className='text-blue-800'
                                        fill='currentColor'
                                        id='path53'
                                        d='m 72.2172,33.4961 c 8.1543,0 15.3809,-7.4219 15.3809,-16.9922 C 87.5981,6.9336 80.3715,0 72.2172,0 64.0629,0 56.7875,7.0801 56.7875,16.6016 c 0,9.4726 7.2266,16.8945 15.4297,16.8945 z M 97.7057,69.140634 H 46.68 c -4.248,0 -6.787,-1.953124 -6.787,-5.224614 0,-9.91212 12.403,-23.58402 32.2756,-23.58402 19.9219,0 32.3242,13.6719 32.3242,23.58402 0,3.27149 -2.5391,5.224614 -6.7871,5.224614 z'
                                    />
                                </svg>

                                <span className='text-xl'>
                                    {team.playerCount}
                                </span>
                            </div>
                            <div className='flex flex-row items-center m-auto'>
                                <svg
                                    className='p-3 h-16 w-auto'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='77.1'
                                    height='85.352'
                                    viewBox='0 0 77.1 85.352'
                                    version='1.1'
                                >
                                    <path
                                        className='text-yellow-300'
                                        fill='currentColor'
                                        fillOpacity='1'
                                        stroke='none'
                                        d='M0 13.135c0 16.308 8.057 26.758 24.17 31.2 2.148 2.442 4.443 4.444 6.738 5.91v16.894h-5.566c-5.81 0-8.79 3.369-8.79 8.789v6.152c0 1.953 1.563 3.272 3.37 3.272h37.256c1.806 0 3.369-1.319 3.369-3.272v-6.152c0-5.42-2.979-8.79-8.79-8.79h-5.566V50.245c2.295-1.465 4.59-3.467 6.787-5.908C69.043 39.893 77.1 29.443 77.1 13.135c0-4.2-2.54-6.69-6.885-6.69h-7.862C61.621 2.393 58.74 0 53.81 0H23.29c-4.932 0-7.813 2.393-8.545 6.445H6.885C2.539 6.445 0 8.935 0 13.135zm6.201.683c0-.44.342-.78.781-.78h7.52v6.884c0 5.957 1.562 11.475 4.004 16.162C10.4 32.227 6.2 24.707 6.2 13.818zm52.393 22.266c2.441-4.688 4.004-10.205 4.004-16.162v-6.885h7.52c.439 0 .78.342.78.781 0 10.889-4.199 18.409-12.304 22.266z'
                                        strokeOpacity='1'
                                    ></path>
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
