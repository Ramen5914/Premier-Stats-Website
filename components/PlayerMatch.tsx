import formatDuration from "@/functions/formatDuration";
import getRPS from "@/functions/rps";
import determineRPSColor from "@/functions/rpsColor";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const agentImageSize: number = 80;

export default async function PlayerMatch({
    playerMatchId,
}: Readonly<{ playerMatchId: number }>) {
    const [playerMatchData, teamMatchData]: [PlayerMatchType, TeamMatchType] =
        await getData(playerMatchId);

    let [date, time] = teamMatchData.playedAt.split("T");
    let [year, month, day] = date.split("-");
    let [hour, minute] = time.split(":");
    let timeOfDay: string = "a"; // default time in the AM

    if (hour == "00") {
        hour = "12";
    } else if (parseInt(hour) > 12) {
        hour = (parseInt(hour) - 12).toString();
        timeOfDay = "p";
    }

    let finalDuration = formatDuration(teamMatchData.duration);
    let finalDate = `${month}/${day}/${year.toString().substring(2)}`;
    let finalTime = `${hour}:${minute}${timeOfDay}`;

    let realRPS = getRPS(
        playerMatchData.placement,
        playerMatchData.trackerNetworkScore,
        playerMatchData.averageCombatScore,
        playerMatchData.kills,
        playerMatchData.deaths,
        playerMatchData.assists,
        playerMatchData.killDeathRatio,
        playerMatchData.plusMinus,
        playerMatchData.damageDelta,
        playerMatchData.averageDamagePerRound,
        playerMatchData.headshotPercentage,
        playerMatchData.killedAssistedSurvivedTraded,
        playerMatchData.firstKills,
        playerMatchData.firstDeaths,
        playerMatchData.threeK,
        playerMatchData.fourK,
        playerMatchData.fiveK,
        playerMatchData.sixK,
    );

    return (
        <Link
            key={playerMatchData.id}
            href={`/team/${teamMatchData.teamId}/match/${teamMatchData.id}#${playerMatchData.id}`}
            // href={`THIS IS TEMPORARY: Match ID = ${match.id}`}
        >
            <div className='text-slate-400 dark:bg-slate-900 shadow-xl hover:shadow-2xl p-3 rounded-2xl flex flex-row space-x-4 ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[350ms] hover:translate-x-1 hover:-translate-y-1'>
                <Image
                    className='rounded-md'
                    priority
                    src={`/images/agents/${playerMatchData.agent}.png`}
                    alt=''
                    width={agentImageSize}
                    height={agentImageSize}
                />
                <div className='dark:bg-slate-400 w-[2px]'></div>
                <div className='flex flex-col grow'>
                    <div className='flex flex-row h-min justify-between space-x-8'>
                        <div className='flex flex-row h-min space-x-2 items-center'>
                            <h1 className='text-2xl font-medium'>
                                {/* {teamMatchData.map} */}
                            </h1>
                            <span className='text-md px-2 py-[2px] bg-indigo-500 text-white rounded-md max-h-min'>
                                #{playerMatchData.placement}
                            </span>
                        </div>
                        <span className='text-lg text-slate-500 items-start h-min'>
                            {`${finalDate}@${finalTime} | ${finalDuration}`}
                        </span>
                    </div>
                    <div className='grid grid-cols-3 grow items-center'>
                        <h1 className='text-xl text-slate-500'>
                            {teamMatchData.map}
                            {/* {practiceText} */}
                        </h1>
                        <h1 className='text-2xl mx-auto flex flex-row space-x-1'>
                            <span className={`text-green-400`}>
                                {playerMatchData.kills}
                            </span>
                            <span className='font-bold'>
                                {playerMatchData.deaths}
                            </span>
                            <span className={`text-red-500`}>
                                {playerMatchData.assists}
                            </span>
                        </h1>
                        <div
                            className={`${determineRPSColor(realRPS)} rounded-lg px-2 py-1 max-w-min ml-auto`}
                        >
                            <h1 className='text-xl font-normal text-slate-900'>
                                +{realRPS}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

async function getData(
    playerMatchId: number,
): Promise<[PlayerMatchType, TeamMatchType]> {
    const playerMatchResponse = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query PlayerMatchById {
                    playerMatchById(id: ${playerMatchId}) {
                        id
                        playerId
                        teamMatchId
                        createdAt
                        lastModifiedAt
                        agent
                        mvp
                        placement
                        trackerNetworkScore
                        averageCombatScore
                        kills
                        deaths
                        assists
                        killDeathRatio
                        plusMinus
                        damageDelta
                        averageDamagePerRound
                        headshotPercentage
                        killedAssistedSurvivedTraded
                        firstKills
                        firstDeaths
                        threeK
                        fourK
                        fiveK
                        sixK
                        multies
                    }
                }
            `,
        }),
    });

    if (!playerMatchResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    let playerMatchData: PlayerMatchType = (await playerMatchResponse.json())
        .data.playerMatchById;

    const teamMatchResponse = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamMatchById {
                    teamMatchById(id: ${playerMatchData.teamMatchId}) {
                        id
                        teamId
                        playedAt
                        duration
                        map
                    }
                }   
            `,
        }),
    });

    if (!teamMatchResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    let teamMatchData: TeamMatchType = (await teamMatchResponse.json()).data
        .teamMatchById;

    if (
        playerMatchSchema.parse(playerMatchData) &&
        teamMatchSchema.parse(teamMatchData)
    ) {
        return [playerMatchData, teamMatchData];
    } else {
        throw new Error("Response data is incorrect.");
    }
}

const agent = z.enum([
    "Astra",
    "Breach",
    "Brimstone",
    "Chamber",
    "Cypher",
    "Deadlock",
    "Fade",
    "Gekko",
    "Harbor",
    "Iso",
    "Jett",
    "KAY_O",
    "Killjoy",
    "Neon",
    "Omen",
    "Phoenix",
    "Raze",
    "Reyna",
    "Sage",
    "Skye",
    "Sova",
    "Viper",
    "Yoru",
]);
const mvp = z.enum(["None", "Team MVP", "Match MVP"]);
const rank = z.enum([
    "Unranked",
    "Iron 1",
    "Iron 2",
    "Iron 3",
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Ascendant 1",
    "Ascendant 2",
    "Ascendant 3",
    "Immortal 1",
    "Immortal 2",
    "Immortal 3",
    "Radiant",
]);
const playerMatchSchema = z.object({
    id: z.coerce.number(),
    playerId: z.number(),
    teamMatchId: z.number(),
    createdAt: z.string(),
    lastModifiedAt: z.string(),
    agent: agent,
    mvp: mvp,
    placement: z.number(),
    trackerNetworkScore: z.number(),
    averageCombatScore: z.number(),
    kills: z.number(),
    deaths: z.number(),
    assists: z.number(),
    killDeathRatio: z.number(),
    plusMinus: z.number(),
    damageDelta: z.number(),
    averageDamagePerRound: z.number(),
    killedAssistedSurvivedTraded: z.number(),
    headshotPercentage: z.number(),
    firstKills: z.number(),
    firstDeaths: z.number(),
    threeK: z.number(),
    fourK: z.number(),
    fiveK: z.number(),
    sixK: z.number(),
    multies: z.number(),
});
const playerSchema = z.object({
    id: z.coerce.number(),
    displayName: z.string(),
    name: z.string(),
    tag: z.string(),
    peakRank: rank,
    currentRank: rank,
    link: z.string(),
    imageLink: z.string(),
    playerMatches: z.array(playerMatchSchema),
    playerMatchCount: z.number(),
    teamId: z.coerce.number(),
    quote: z.string(),
});
const map = z.enum([
    "Ascent",
    "Bind",
    "Breeze",
    "Fracture",
    "Haven",
    "Icebox",
    "Lotus",
    "Pearl",
    "Split",
    "Sunset",
]);
const teamMatchSchema = z.object({
    id: z.coerce.number(),
    playedAt: z.string(),
    duration: z.string(),
    // practice: z.boolean(),
    map: map,
    // enemyName: z.string(),
    // enemyTag: z.string(),
    // enemyImageLink: z.string(),
    // teamScore: z.number(),
    // enemyScore: z.number(),
    teamId: z.number(),
    // score: z.number(),
});

type TeamMatchType = z.infer<typeof teamMatchSchema>;
type PlayerType = z.infer<typeof playerSchema>;
type PlayerMatchType = z.infer<typeof playerMatchSchema>;
