import TeamCard from '../components/TeamCard'
import type { Team } from './(types)/GraphQLStructures'

export const dynamic = 'force-dynamic'

export default async function Page() {
    const { data } = await getData();

    return (
        <>
            {teamCardRenderer(data.allTeams)}
        </>
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
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

function teamCardRenderer(teams: Team[]) {
    var teamCards = [];

    for (let team of teams) {
        teamCards.push(
            <TeamCard team={team} key={team.id} />
        )
    }

    return (
        teamCards
    )
}
