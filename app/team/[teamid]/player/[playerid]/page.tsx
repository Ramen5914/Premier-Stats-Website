import { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
    params: {
        teamid: number,
        playerid: number
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.playerid

    const data = await getPlayerName(id);

    return {
        title: `${data.name}#${data.tag}`
    }
}

export default function Page({ params }: Props) {
    return (
        <>
            <h1 className="text-3xl">Player view:</h1>
            <h2 className="text-xl">{`Team ${params.teamid} Player ${params.playerid}`}</h2>
        </>
    )
}

async function getPlayerName(id: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query PlayerById {
                    playerById(id: ${id}) {
                        name
                        tag
                    }
                }              
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let resJson = await response.json();

    return await resJson.data.playerById;
}