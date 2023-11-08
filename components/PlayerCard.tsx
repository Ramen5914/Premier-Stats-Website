import { Player } from '@/app/(types)/GraphQLStructures'
import Image from 'next/image'
import Link from 'next/link'

export default async function PlayerCard({ player }: { player: Player }) {
    const rankSize: number = 45;
    var captain: boolean = (player.role == "Captain")

    return (
        <Link href={`/team/${player.teamId}/player/${player.id}`}>
            <div className='dark:bg-slate-900 shadow-lg hover:shadow-2xl p-4 rounded-2xl flex flex-row space-x-4 xl:w-[76rem] ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[300ms] hover:translate-x-1 hover:-translate-y-1'>
                <Image priority className='border-4 rounded-xl border-indigo-500' src={player.imageLink} alt="" width={128} height={128} />
                <div className='dark:bg-current w-[2px]'></div>
                <div className='flex flex-col justify-between grow'>
                    <div className='flex flex-row grow h-min justify-between items-center'>
                        <div className='flex flex-row h-min items-center'>
                            <h1 className='text-3xl font-medium'>{player.name}</h1>
                            <span className='text-xl ml-2 px-2 py-1 bg-indigo-500 text-white rounded-md'>#{player.tag}</span>
                            {captain && 
                                <svg className='w-6 h-6 ml-3 text-yellow-500' fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                                </svg>
                            }
                        </div>
                        <div className='flex flex-row h-min'>
                            <h1 className='text-xl font-normal'>
                                Episode Act
                            </h1>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 items-center'>
                        <div className='flex flex-row items-center m-auto space-x-2'>
                            <span className='text-xl'>Peak:</span>
                            <Image src={'/images/rank/' + player.peakRank + '.png'} alt='' width={rankSize} height={rankSize} />
                        </div>
                        <div className='flex flex-row items-center m-auto space-x-2'>
                            <span className='text-xl'>Current:</span>
                            <Image src={'/images/rank/' + player.currentRank + '.png'} alt='' width={rankSize} height={rankSize} />
                        </div>
                        <div className='flex flex-row items-center m-auto'>
                            <svg className="p-3" width="64" height="64" fill="none" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path id="path1" stroke='#29ffa6' d="m 18,18.72 a 9.094,9.094 0 0 0 3.741,-0.479 3,3 0 0 0 -4.682,-2.72 M 21,9.75 a 2.25,2.25 0 1 1 -4.5,0 2.25,2.25 0 0 1 4.5,0 z" />
                                <path id="path8" stroke='#d059ff' d="m 6.942,15.522 a 3,3 0 0 0 -4.681,2.72 8.986,8.986 0 0 0 3.74,0.477 M 7.5,9.75 a 2.25,2.25 0 1 1 -4.5,0 2.25,2.25 0 0 1 4.5,0 z" />
                                <path id="path6" stroke='#36d7ff' d="m 18,18.719 a 5.971,5.971 0 0 0 -0.941,-3.197 m 0,0 A 5.995,5.995 0 0 0 12,12.75 5.995,5.995 0 0 0 6.942,15.522 M 17.999,18.719 18,18.75 c 0,0.225 -0.012,0.447 -0.037,0.666 A 11.944,11.944 0 0 1 12,21 C 9.83,21 7.793,20.424 6.037,19.416 A 6.062,6.062 0 0 1 6,18.719 m 0.941,-3.197 a 5.971,5.971 0 0 0 -0.94,3.197 M 15,6.75 a 3,3 0 1 1 -6,0 3,3 0 0 1 6,0 z" />
                            </svg>
                            <span className='text-xl'>{player.playerMatchCount}</span>
                        </div>
                        <div className='flex flex-row items-center m-auto'>
                            <svg className="p-3" width="64" height="64" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path stroke="#ff4d4d" strokeLinejoin='round' d="M 21,16.5 16.5,21 m 0,0 L 12,16.5 M 16.5,21 V 7.5" id="path2" />
                                <path stroke="#5eff6c" strokeLinejoin='round' d="M 3,7.5 7.5,3 m 0,0 4.5,4.5 M 7.5,3 v 13.5" id="path1" />
                            </svg>
                            <span className='text-xl'>#{player.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
