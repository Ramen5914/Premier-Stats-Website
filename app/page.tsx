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
                  link
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
        <main className="grow mx-auto">
            <h1>Hello World</h1>
            <p>{JSON.stringify(data.allTeams)}</p>
        </main>
    )
}
