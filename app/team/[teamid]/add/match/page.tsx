import { NewTeamMatch } from "@/app/(types)/gqlTypes";
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { teamid: number } }) {
    async function validate(formData: FormData) {
        'use server'

        const displayName = formData.get('display-name')?.toString();
        if (displayName == undefined) {
            return false;
        }
        const playerName = formData.get('player-name')?.toString();
        if (playerName == undefined) {
            return false;
        }
        const playerTag = formData.get('player-tag')?.toString();
        if (playerTag == undefined) {
            return false;
        }
        const currentRankName = formData.get('current-rank')?.toString();
        const currentRankValue = formData.get('current-level')?.toString();
        let currentRank: string;
        if (currentRankName != undefined && currentRankName != "null") {
            if (currentRankName == "Radiant" || currentRankName == "Unranked") {
                currentRank = currentRankName;
            } else {
                currentRank = `${currentRankName} ${currentRankValue}`
            }
        } else {
            return false;
        }
        const peakRankName = formData.get('peak-rank')?.toString();
        const peakRankValue = formData.get('peak-level')?.toString();
        let peakRank: string;
        if (peakRankName != undefined && peakRankName != "null") {
            if (peakRankName == "Radiant") {
                peakRank = peakRankName;
            } else {
                peakRank = `${peakRankName} ${peakRankValue}`
            }
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
        const role = formData.get('role')?.toString();
        if (role == undefined || role == "null") {
            return false;
        }

        // const newTeamMatch: NewTeamMatch = {
        //     name: playerName,
        //     tag: playerTag,
        //     teamId: params.teamid,
        //     displayName: displayName,
        //     currentRank: currentRank,
        //     peakRank: peakRank,
        //     link: link,
        //     imageLink: imageLink,
        //     role: role
        // }

        // if (await createNewTeamMatch(newTeamMatch)) {
        //     redirect(`/team/${params.teamid}`)
        // } else {
        //     return false
        // }
        return false;
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl">Add New Player</h1>
            <form method="POST" className="flex flex-col space-y-2" action={validate}>
                <div>
                    <label>Display Name: </label>
                    <input required type="text" name="display-name" />
                </div>
                <div>
                    <label>In-Game Name: </label>
                    <input required type="text" name="player-name" size={17} minLength={3} maxLength={16} />
                    <span>#</span>
                    <input required type="text" name="player-tag" size={6} minLength={3} maxLength={5} />
                </div>
                <div>
                    <label>Current Rank: </label>
                    <select required itemType="text" name="current-rank">
                        <option value={"null"}>--Select Rank--</option>
                        <option value={"Unranked"}>Unranked</option>
                        <option value={"Iron"}>Iron</option>
                        <option value={"Bronze"}>Bronze</option>
                        <option value={"Gold"}>Gold</option>
                        <option value={"Silver"}>Silver</option>
                        <option value={"Platinum"}>Platinum</option>
                        <option value={"Diamond"}>Diamond</option>
                        <option value={"Ascendant"}>Ascendant</option>
                        <option value={"Immortal"}>Immortal</option>
                        <option value={"Radiant"}>Radiant</option>
                    </select>
                    <input type="number" name="current-level" min={1} max={3} />
                </div>
                <div>
                    <label>Peak Rank: </label>
                    <select required itemType="text" name="peak-rank">
                        <option value={"null"}>--Select Rank--</option>
                        <option value={"Unranked"}>Unranked</option>
                        <option value={"Iron"}>Iron</option>
                        <option value={"Bronze"}>Bronze</option>
                        <option value={"Gold"}>Gold</option>
                        <option value={"Silver"}>Silver</option>
                        <option value={"Platinum"}>Platinum</option>
                        <option value={"Diamond"}>Diamond</option>
                        <option value={"Ascendant"}>Ascendant</option>
                        <option value={"Immortal"}>Immortal</option>
                        <option value={"Radiant"}>Radiant</option>
                    </select>
                    <input type="number" name="peak-level" min={1} max={3} />
                </div>
                <div>
                    <label>Profile Link: </label>
                    <input required type="url" name="link" />
                </div>
                <div>
                    <label>Image Link: </label>
                    <input required type="url" name="image-link" />
                </div>
                <div>
                    <label>Role: </label>
                    <select required itemType="text" name="role">
                        <option value={"null"}>--Select Role--</option>
                        <option value={"Captain"}>Captain</option>
                        <option value={"Member"}>Member</option>
                        <option value={"Substitute"}>Substitute</option>
                        <option value={"Ex-Partner"}>Substitute</option>
                    </select>
                </div>
                <button className="px-3 py-2 bg-indigo-500 text-white hover:bg-indigo-400 w-fit mx-auto shadow-sm font-semibold text-sm rounded-md inline-flex items-center gap-x-1.5" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12 2h-2v3h2V2Z" />
                        <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0H1.5ZM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1H4ZM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1Z" />
                    </svg>
                    Save Changes
                </button>
            </form>
        </div>
    )
}

async function createNewTeamMatch(newPlayer: NewTeamMatch) {
    // const response = await fetch(`http://localhost:8080/graphql`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         query: `
    //             mutation CreatePlayer {
    //                 createPlayer(
    //                     newPlayer: {
    //                         teamId: ${newPlayer.teamId}
    //                         displayName: "${newPlayer.displayName}"
    //                         name: "${newPlayer.name}"
    //                         tag: "${newPlayer.tag}"
    //                         currentRank: "${newPlayer.currentRank}"
    //                         peakRank: "${newPlayer.peakRank}"
    //                         link: "${newPlayer.link}"
    //                         imageLink: "${newPlayer.imageLink}"
    //                         role: "${newPlayer.role}"
    //                     }
    //                 ) {
    //                     id
    //                 }
    //             }
    //         `
    //     })
    // })

    // if (response.ok) {
    //     return true;
    // } else {
    //     throw new Error('Failed to create team.');
    // }
    return false;
}