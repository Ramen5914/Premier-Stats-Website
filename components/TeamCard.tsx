import { Team } from '@/app/(types)/GraphQLStructures'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamCard({ team }: { team: Team }) {
    return (
        <Link href={"/team/" + team.id}>
            <div className='dark:bg-slate-900 shadow-2xl p-4 rounded-2xl flex flex-row space-x-4'>
                <Image src={team.imageLink} alt="" width={128} height={128} />
                <div className='dark:bg-current w-[2px]'></div>
                <div className='flex flex-col'>
                    <div className='flex flex-row h-min'>
                        <h1 className='text-3xl font-medium'>{team.name}</h1>
                        <span className='text-xl ml-2 px-2 py-1 bg-indigo-500 text-white rounded-md'>#{team.tag}</span>
                    </div>
                    <span>HELLO</span>
                    <span>HELLO</span>
                </div>
                {/* <Link href={"/edit/team/" + team.id}>EDIT</Link> */}
            </div>
        </Link>
    )
}
