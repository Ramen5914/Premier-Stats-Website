import { newTeam, type NewTeam } from "@/app/(types)/gqlTypes";
import { redirect } from "next/navigation";

export default async function Page() {
    async function validate(formData: FormData) {
        "use server";

        const team: NewTeam = newTeam.parse({
            name: formData.get("team-name"),
            tag: formData.get("team-tag"),
            episode: formData.get("episode"),
            act: formData.get("act"),
            division: formData.get("division"),
            rank: formData.get("rank"),
            link: formData.get("link"),
            imageLink: formData.get("image-link"),
            region: formData.get("region"),
        });

        if (await createNewTeam(team)) {
            redirect("/");
        } else {
            return false;
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl">Create New Team</h1>
            <form
                method="GET"
                className="flex flex-col space-y-2"
                action={validate}
            >
                <div>
                    <label>Team Name: </label>
                    <input
                        required
                        type="text"
                        name="team-name"
                        size={17}
                        maxLength={15}
                        minLength={5}
                    />
                    <span>#</span>
                    <input
                        required
                        type="text"
                        name="team-tag"
                        size={6}
                        maxLength={5}
                        minLength={1}
                    />
                </div>
                <div>
                    <label>Episode: </label>
                    <input required type="number" name="episode" min={7} />
                    <label>Act: </label>
                    <input required type="number" name="act" min={1} max={3} />
                </div>
                <div>
                    <label>Division: </label>
                    <select required itemType="text" name="division">
                        <option value={"null"}>--Select Division--</option>
                        <option value={"Unranked"}>Unranked</option>
                        <option value={"Open 1"}>Open 1</option>
                        <option value={"Open 2"}>Open 2</option>
                        <option value={"Open 3"}>Open 3</option>
                        <option value={"Open 4"}>Open 4</option>
                        <option value={"Open 5"}>Open 5</option>
                        <option value={"Intermediate 1"}>Intermediate 1</option>
                        <option value={"Intermediate 2"}>Intermediate 2</option>
                        <option value={"Intermediate 3"}>Intermediate 3</option>
                        <option value={"Intermediate 4"}>Intermediate 4</option>
                        <option value={"Intermediate 5"}>Intermediate 5</option>
                        <option value={"Advanced 1"}>Advanced 1</option>
                        <option value={"Advanced 2"}>Advanced 2</option>
                        <option value="Advanced 3">Advanced 3</option>
                        <option value={"Advanced 4"}>Advanced 4</option>
                        <option value={"Advanced 5"}>Advanced 5</option>
                        <option value={"Elite 1"}>Elite 1</option>
                        <option value={"Elite 2"}>Elite 2</option>
                        <option value={"Elite 3"}>Elite 3</option>
                        <option value={"Elite 4"}>Elite 4</option>
                        <option value={"Elite 5"}>Elite 5</option>
                        <option value={"Contender"}>Contender</option>
                    </select>
                    <label>Rank: </label>
                    <input
                        required
                        type="number"
                        name="rank"
                        min={1}
                        max={999}
                    />
                </div>
                <div>
                    <label>Tracker Network Link: </label>
                    <input required type="url" name="link" />
                </div>
                <div>
                    <label>Tracker Network Image Link: </label>
                    <input required type="url" name="image-link" />
                </div>
                <div>
                    <label>Region: </label>
                    <select required itemType="number" name="region">
                        <option value={"null"}>--Select Region--</option>
                        <option value={"US West"}>US West</option>
                        <option value={"US East"}>US East</option>
                        <option value={"Western Europe"}>Western Europe</option>
                        <option value={"Central & Eastern Europe"}>
                            Central And Eastern Europe
                        </option>
                        <option value={"Middle East"}>Middle East</option>
                        <option value={"Turkiye"}>Turkiye</option>
                        <option value={"Asia"}>Asia</option>
                        <option value={"Japan"}>Japan</option>
                        <option value={"Oceania"}>Oceania</option>
                        <option value={"South Asia"}>South Asia</option>
                        <option value={"Korea"}>Korea</option>
                        <option value={"Latin America North"}>
                            Latin America North
                        </option>
                        <option value={"Latin America South"}>
                            Latin America South
                        </option>
                        <option value={"Brazil"}>Brazil</option>
                    </select>
                </div>

                <button
                    className="px-3 py-2 bg-indigo-500 text-white hover:bg-indigo-400 w-fit mx-auto shadow-sm font-semibold text-sm rounded-md inline-flex items-center gap-x-1.5"
                    type="submit"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12 2h-2v3h2V2Z" />
                        <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0H1.5ZM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1H4ZM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1Z" />
                    </svg>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

async function createNewTeam(newTeam: NewTeam) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation CreateTeam {
                    createTeam(
                        newTeam: {
                            name: "${newTeam.name}"
                            tag: "${newTeam.tag}"
                            episode: ${newTeam.episode}
                            act: ${newTeam.act}
                            division: "${newTeam.division}"
                            rank: ${newTeam.rank}
                            link: "${newTeam.link}"
                            imageLink: "${newTeam.imageLink}"
                            region: "${newTeam.region}"
                        }
                    ) {
                        id
                    }
                }
            `,
        }),
    });

    if (response.ok) {
        return true;
    } else {
        throw new Error("Failed to create team.");
    }
}
