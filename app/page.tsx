import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
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
                  imageLink
                  region
                  players {
                    id
                  }
                }
              }
              
            `
        })
    })

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const { data } = await response.json()

    return (
        <main className="grow max-w-7xl flex flex-col space-y-4">
            {teamCardRenderer(data)}
            {/* <Image src={data.allTeams[0].imageLink} alt='' width={256} height={256} priority={true} quality={100}/> */}
            {/* <img src={data.allTeams[0].imageLink} /> */}
            {/* <p>{JSON.stringify(data.allTeams[0].imageLink)}</p> */}
        </main>
    )
}

export function teamCardRenderer(data) {
    const teams = data.allTeams;
    
    const region = {
        "US_West": ["US West", "united_states"]
    }

    var teamCards = [];

    for (const [i, team] of teams.entries()) {
        teamCards.push(
            // <Link href={'/team/' + team.id}>
                <div className='bg-gray-200 dark:bg-gray-900 p-4 rounded-xl flex flex-row justify-between shadow-xl w-full'>
                    {/* <img src={team.imageLink} height="128px" width="128"/> */}
                    <div>
                        <Image src={team.imageLink} alt='' width={128} height={128}></Image>
                    </div>
                    <div className='flex flex-col grow items-center'>
                        <h1 className='text-gray-300 font-semibold text-2xl'>{team.name}<span className='ml-2 px-2 py-1 rounded-lg bg-indigo-600 text-white'>#{team.tag}</span></h1>
                        <h1>{team.episode}:{team.act}</h1>
                        <h1>{team.division}</h1>
                        <Image src={"/images/region/" + region[team.region as keyof typeof region][1] + ".png"} alt='' width={64} height={64} />
                        <h1>{region[team.region as keyof typeof region][0]}</h1>
                    </div>
                </div>
            // </Link>
        )
    }

    return (
        teamCards
    )
}
