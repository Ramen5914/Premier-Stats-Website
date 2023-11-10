import TeamCard from '../components/TeamCard'
import type { Team } from './(types)/GraphQLStructures'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Premier Teams",
    description: "List of all teams tracked by my website."
}

export default async function Page() {
    const { data } = await getData();

    return (
        <main className="grow max-w-7xl flex flex-col space-y-4 mx-auto px-4 sm:px-6 md:px-8">
            {teamCardRenderer(data.allTeams)}
        </main>
    )
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
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

function teamCardRenderer(teams: Team[]) {
    let teamCards = [];

    for (let team of teams) {
        teamCards.push(
            <TeamCard team={team} key={team.id} />
        )
    }

    return (
        teamCards
    )
}
