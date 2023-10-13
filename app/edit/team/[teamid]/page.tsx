import { Division } from "@/app/(types)/GraphQLStructures";
import { stringify } from "querystring";

export default async function Page({ params }: { params: { teamid: number } }) {
    const data = await getTeamData(params.teamid);

    const team = data.data.teamById;

    return (
        <div className="flex flex-col items-center space-y-4">
            <p>{stringify(data.error)}</p>
            <p>{stringify(data.data.teamById)}</p>
            <h1 className="text-3xl">Team {params.teamid}</h1>
            <form method="POST" className="flex flex-col space-y-2">
                <div>
                    <label>Team Name: </label>
                    <input type="text" name="team-name"></input>
                    <span>#</span>
                    <input type="text" name="team-tag" maxLength={5} />
                </div>
                <div>
                    <label>Episode: </label>
                    <input type="number" name="episode" min={1} max={7} />
                    <label>Act: </label>
                    <input type="number" name="act" min={1} max={3} />
                </div>
                <div>
                    <label itemType="number">Division: </label>
                    <select itemType="number">
                        <option value={0}>Unranked</option>
                        <option value={1}>Open 1</option>
                        <option value={2}>Open 2</option>
                        <option value={3}>Open 3</option>
                        <option value={4}>Open 4</option>
                        <option value={5}>Open 5</option>
                        <option value={6}>Intermediate 1</option>
                        <option value={7}>Intermediate 2</option>
                        <option value={8}>Intermediate 3</option>
                        <option value={9}>Intermediate 4</option>
                        <option value={10}>Intermediate 5</option>
                        <option value={11}>Advanced 1</option>
                        <option value={12}>Advanced 2</option>
                        <option value={13}>Advanced 3</option>
                        <option value={14}>Advanced 4</option>
                        <option value={15}>Advanced 5</option>
                        <option value={16}>Elite 1</option>
                        <option value={17}>Elite 2</option>
                        <option value={18}>Elite 3</option>
                        <option value={19}>Elite 4</option>
                        <option value={20}>Elite 5</option>
                        <option value={21}>Contender</option>
                    </select>
                </div>
                <div>
                    <label>Tracker Network Link: </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Tracker Network Image Link: </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Region: </label>
                    <select itemType="number">
                        <option value={0}>US West</option>
                        <option value={1}>US East</option>
                        <option value={2}>Western Europe</option>
                        <option value={3}>Central And Eastern Europe</option>
                        <option value={4}>Middle East</option>
                        <option value={5}>Turkiye</option>
                        <option value={6}>Asia</option>
                        <option value={7}>Japan</option>
                        <option value={8}>Oceania</option>
                        <option value={9}>South Asia</option>
                        <option value={10}>Korea</option>
                        <option value={11}>Latin America North</option>
                        <option value={12}>Latin America South</option>
                        <option value={13}>Brazil</option>
                    </select>
                </div>

                <button className="px-3 py-2 bg-indigo-500 text-white hover:bg-indigo-400 w-fit mx-auto shadow-sm font-semibold text-sm rounded-md inline-flex items-center gap-x-1.5" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12 2h-2v3h2V2Z"/><path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0H1.5ZM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1H4ZM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1Z"/></svg>
                    Save Changes
                </button>
            </form>
        </div>
    )
}

async function getTeamData(id: number) {
    const response = await fetch(`http://192.168.220.60:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            query GetTeamByTeamID {
                teamById(teamId: ${id}) {
                  id
                  createdAt
                  lastModifiedAt
                  name
                  tag
                  episode
                  act
                  division
                  link
                  imageLink
                  region
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