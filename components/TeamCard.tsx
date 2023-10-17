import { Region, Team } from '@/app/(types)/GraphQLStructures'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamCard({ team }: { team: Team }) {
    const imageMap = new Map<string, string>([
        // Regions
        ["Asia", 'asia.png'],
        ["Brazil", 'brazil.png'],
        ["Central_And_Eastern_Europe", 'europe.png'],
        ["Japan", 'japan.png'],
        ["Korea", 'korea.png'],
        ["Latin_America_North", 'latin_america.png'],
        ["Latin_America_South", 'latin_america.png'],
        ["Middle_East", 'middle_east.png'],
        ["Oceania", 'oceania.png'],
        ["South_Asia", 'south_asia.png'],
        ["Turkiye", 'turkiye.png'],
        ["US_East", 'united_states.png'],
        ["US_West", 'united_states.png'],
        ["Western_Europe", 'europe.png'],
        // Divisions
        ['Unranked', '0.png'],
        ['Open_1', '1.png'],
        ['Open_2', '1.png'],
        ['Open_3', '1.png'],
        ['Open_4', '1.png'],
        ['Open_5', '1.png'],
        ['Intermediate_1', '2.png'],
        ['Intermediate_2', '2.png'],
        ['Intermediate_3', '2.png'],
        ['Intermediate_4', '2.png'],
        ['Intermediate_5', '2.png'],
        ['Advanced_1', '3.png'],
        ['Advanced_2', '3.png'],
        ['Advanced_3', '3.png'],
        ['Advanced_4', '3.png'],
        ['Advanced_5', '3.png'],
        ['Elite_1', '4.png'],
        ['Elite_2', '4.png'],
        ['Elite_3', '4.png'],
        ['Elite_4', '4.png'],
        ['Elite_5', '4.png'],
        ['Contender', '5.png']
    ]);

    const nameMap = new Map<string, string>([
        // Regions
        ['US_West', 'US West'],
        ['US_East', 'US East'],
        ['Western_Europe', 'Western Europe'],
        ['Central_And_Eastern_Europe', 'Central & Eastern Europe'],
        ['Middle_East', 'Middle East'],
        ['Turkiye', 'Türkiye'],
        ['Asia', 'Asia'],
        ['Japan', 'Japan'],
        ['Oceania', 'Oceania'],
        ['South_Asia', 'South Asia'],
        ['Korea', 'Korea'],
        ['Latin_America_North', 'Latin America North'],
        ['Latin_America_South', 'Latin America South'],
        ['Brazil', 'Brazil'],
        // Divisions
        ['Unranked', 'Unranked'],
        ['Open_1', 'Open 1'],
        ['Open_2', 'Open 2'],
        ['Open_3', 'Open 3'],
        ['Open_4', 'Open 4'],
        ['Open_5', 'Open 5'],
        ['Intermediate_1', 'Intermediate 1'],
        ['Intermediate_2', 'Intermediate 2'],
        ['Intermediate_3', 'Intermediate 3'],
        ['Intermediate_4', 'Intermediate 4'],
        ['Intermediate_5', 'Intermediate 5'],
        ['Advanced_1', 'Advanced 1'],
        ['Advanced_2', 'Advanced 2'],
        ['Advanced_3', 'Advanced 3'],
        ['Advanced_4', 'Advanced 4'],
        ['Advanced_5', 'Advanced 5'],
        ['Elite_1', 'Elite 1'],
        ['Elite_2', 'Elite 2'],
        ['Elite_3', 'Elite 3'],
        ['Elite_4', 'Elite 4'],
        ['Elite_5', 'Elite 5'],
        ['Contender', 'Contender']
    ]);

    return (
        <Link href={"/team/" + team.id}>
            <div className='dark:bg-slate-900 shadow-2xl p-4 rounded-2xl flex flex-row space-x-4 xl:w-[76rem]'>
                <Image src={team.imageLink} alt="" width={128} height={128} />
                <div className='dark:bg-current w-[2px]'></div>
                <div className='flex flex-col grow'>
                    <div className='flex flex-row h-min'>
                        <h1 className='text-3xl font-medium'>{team.name}</h1>
                        <span className='text-xl ml-2 px-2 py-1 bg-indigo-500 text-white rounded-md'>#{team.tag}</span>
                    </div>
                    <div className='flex flex-row justify-between grow items-center'>
                        
                        <div>
                            <span>{nameMap.get(team.division.toString())}</span>
                            <Image src={'/images/premier/' + imageMap.get(team.division.toString())} alt='' width={64} height={64} />
                        </div>
                        <div>
                            <span>{nameMap.get(team.region.toString())}</span>
                            <Image src={'/images/region/' + imageMap.get(team.region.toString())} alt='' width={64} height={64} />
                        </div>
                        <span>{team.episode}</span>
                        <span>{team.act}</span>
                        <span>{team.players.length}</span>
                    </div>
                </div>
                {/* <Link href={"/edit/team/" + team.id}>EDIT</Link> */}
            </div>
        </Link>
    )
}
