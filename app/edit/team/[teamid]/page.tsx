import { Division, Region, Team, TeamChange } from "@/app/(types)/GraphQLStructures";
import { FormEvent } from "react";
import { redirect } from 'next/navigation'
import { isType } from "graphql";

export default async function Page({ params }: { params: { teamid: number } }) {
    const body = await getTeamData(params.teamid);

    if (body.data.teamById == null) {
        throw new Error(body.errors[0].message)
    }

    const team: Team = body.data.teamById;

    async function validate(formData: FormData) {
        'use server'
        
        const teamName = formData.get('team-name')?.toString();
        if (teamName == undefined) {
            return false;
        }
        const teamTag = formData.get('team-tag')?.toString();
        if (teamTag == undefined) {
            return false;
        }
        const episodeValue = formData.get('episode')?.toString();
        var episode: number
        if (episodeValue !== undefined && !isNaN(parseInt(episodeValue))) {
            episode = parseInt(episodeValue);
        } else {
            return false
        }

        const actValue = formData.get('act')?.toString();
        var act: number
        if (actValue !== undefined && !isNaN(parseInt(actValue))) {
            act = parseInt(actValue);
        } else {
            return false
        }
        const divisionValue = formData.get('division')?.toString();
        var division: Division
        if (divisionValue !== undefined && divisionValue in Division) {
            division = Division[divisionValue as keyof typeof Division];
        } else {
            return false;
        }
        const link = formData.get('link')?.toString();
        if (link == undefined) {
            return false;
        }
        const imageLink = formData.get('image-link')?.toString();
        if (imageLink == undefined) {
            return false;
        }

        const regionValue = formData.get('region')?.toString();
        var region: Region
        if (regionValue !== undefined && regionValue in Region) {
            region = Region[regionValue as keyof typeof Region];
        } else {
            return false;
        }

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl">Team {params.teamid}</h1>
            <form method="GET" className="flex flex-col space-y-2" action={validate}>
                <div>
                    <label>Team Name: </label>
                    <input required type="text" name="team-name" defaultValue={team.name} />
                    <span>#</span>
                    <input required type="text" name="team-tag" defaultValue={team.tag} maxLength={5} />
                </div>
                <div>
                    <label>Episode: </label>
                    <input required type="number" name="episode" defaultValue={team.episode} min={1} max={7} />
                    <label>Act: </label>
                    <input required type="number" name="act" defaultValue={team.act} min={1} max={3} />
                </div>
                <div>
                    <label>Division: </label>
                    <select required itemType="text" name="division" defaultValue={team.division}>
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
                    <input required type="text" name="link" defaultValue={team.link} />
                </div>
                <div>
                    <label>Tracker Network Image Link: </label>
                    <input required type="text" name="image-link" defaultValue={team.imageLink} />
                </div>
                <div>
                    <label>Region: </label>
                    <select required itemType="number" name="region" defaultValue={team.region}>
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

async function setTeamData(teamChange: TeamChange) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            mutation UpdateTeam {
                updateTeam(teamChange: {
                  teamId: ${teamChange.teamId}
              
                  name: "hello"
                  tag: "text"
                  episode: 1
                  act: 1
                  division: Unranked
                  link: "121312312"
                  imageLink: "114123134"
                  region: Brazil
                }) {
                  id
                }
              }
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to set data');
    }

    return await response.json();

    return true;
}