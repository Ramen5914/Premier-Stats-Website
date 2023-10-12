import Image from 'next/image'
import Link from 'next/link'
import TeamCard from './(components)/TeamCard'

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
        </main>
    )
}

function teamCardRenderer(data) {
    // const teams = data.allTeams;
    const teams = [
        1, 2, 3
    ]
    
    const region = {
        "US_West": ["US West", "united_states"]
    }

    var teamCards = [];

    for (let contact  of teams) {
        teamCards.push(
            <TeamCard id={team} />
        )
    }   

    return (
        teamCards
    )
}
