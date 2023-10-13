import { Division, Team } from "@/app/(types)/GraphQLStructures";
import { stringify } from "querystring";

export default async function Page({ params }: { params: { teamid: number } }) {
    const data = await getTeamData(params.teamid);

    if (data.data.teamById == null) {
        throw new Error(data.errors[0].message)
    }

    const team: Team = data.data.teamById;

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl">Team {params.teamid}</h1>
            <form method="POST" className="flex flex-col space-y-2">
                <div>
                    <label>Team Name: </label>
                    <input type="text" name="team-name" defaultValue={team.name}></input>
                    <span>#</span>
                    <input type="text" name="team-tag" defaultValue={team.tag} maxLength={5} />
                </div>
                <div>
                    <label>Episode: </label>
                    <input type="number" name="episode" defaultValue={team.episode} min={1} max={7} />
                    <label>Act: </label>
                    <input type="number" name="act" defaultValue={team.act} min={1} max={3} />
                </div>
                <div>
                    <label itemType="number">Division: </label>
                    <select itemType="text" defaultValue={team.division}>
                        <option value={"Unranked"}>Unranked</option>
                        <option value={"Open_1"}>Open 1</option>
                        <option value={"Open_2"}>Open 2</option>
                        <option value={"Open_3"}>Open 3</option>
                        <option value={"Open_4"}>Open 4</option>
                        <option value={"Open_5"}>Open 5</option>
                        <option value={"Intermediate_1"}>Intermediate 1</option>
                        <option value={"Intermediate_2"}>Intermediate 2</option>
                        <option value={"Intermediate_3"}>Intermediate 3</option>
                        <option value={"Intermediate_4"}>Intermediate 4</option>
                        <option value={"Intermediate_5"}>Intermediate 5</option>
                        <option value={"Advanced_1"}>Advanced 1</option>
                        <option value={"Advanced_2"}>Advanced 2</option>
                        <option value="Advanced_3">Advanced 3</option>
                        <option value={"Advanced_4"}>Advanced 4</option>
                        <option value={"Advanced_5"}>Advanced 5</option>
                        <option value={"Elite_1"}>Elite 1</option>
                        <option value={"Elite_2"}>Elite 2</option>
                        <option value={"Elite_3"}>Elite 3</option>
                        <option value={"Elite_4"}>Elite 4</option>
                        <option value={"Elite_5"}>Elite 5</option>
                        <option value={"Contender"}>Contender</option>
                    </select>
                </div>
                <div>
                    <label>Tracker Network Link: </label>
                    <input type="text" defaultValue={team.link}></input>
                </div>
                <div>
                    <label>Tracker Network Image Link: </label>
                    <input type="text" defaultValue={team.imageLink}></input>
                </div>
                <div>
                    <label>Region: </label>
                    <select itemType="number">
                        <option value={"US_West"}>US West</option>
                        <option value={"US_East"}>US East</option>
                        <option value={"Western_Europe"}>Western Europe</option>
                        <option value={"Central_And_Eastern_Europe"}>Central And Eastern Europe</option>
                        <option value={"Middle_East"}>Middle East</option>
                        <option value={"Turkiye"}>Turkiye</option>
                        <option value={"Asia"}>Asia</option>
                        <option value={"Japan"}>Japan</option>
                        <option value={"Oceania"}>Oceania</option>
                        <option value={"South_Asia"}>South Asia</option>
                        <option value={"Korea"}>Korea</option>
                        <option value={"Latin_America_North"}>Latin America North</option>
                        <option value={"Latin_America_South"}>Latin America South</option>
                        <option value={"Brazil"}>Brazil</option>

                    </select>
                </div>

                <button className="px-3 py-2 bg-indigo-500 text-white hover:bg-indigo-400 w-fit mx-auto shadow-sm font-semibold text-sm rounded-md inline-flex items-center gap-x-1.5" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12 2h-2v3h2V2Z" /><path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0H1.5ZM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1H4ZM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1Z" /></svg>
                    Save Changes
                </button>
            </form>
        </div>
    )
}

async function getTeamData(id: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
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