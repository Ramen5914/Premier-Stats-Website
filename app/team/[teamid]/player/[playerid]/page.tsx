import { Metadata } from "next";
import {
    type PlayerMatchType,
    type PlayerType,
    playerSchema,
    playerMatchSchema,
} from "./schemas";
import Image from "next/image";
import Link from "next/link";
import { rps } from "@/app/(functions)/functions";

export const dynamic = "force-dynamic";

type Props = {
    params: {
        teamid: number;
        playerid: number;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query PlayerById {
                    playerById(id: ${params.playerid}) {
                        name
                        tag
                    }
                }              
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let resJson = (await response.json()).data.playerById;

    return {
        title: `${resJson.name}#${resJson.tag}`,
    };
}

export default async function Page({ params }: Props) {
    const playerData: PlayerType = await getAllData(params.playerid);
    const playerMatches: PlayerMatchType[] = playerData.playerMatches;

    return (
        <main className="grow mx-auto flex">
            <div className="grid-cols-3 grid gap-4">
                <div className="col-span-1">{createPlayerCard(playerData)}</div>
                <div className="col-span-2 flex flex-col space-y-4">
                    {createPlayerMatchCards(playerMatches)}
                </div>
            </div>
        </main>
    );
}

async function getAllData(playerid: number): Promise<PlayerType> {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetTeamById {
                    playerById(id: ${playerid}) {
                        id
                        teamId
                        createdAt
                        lastModifiedAt
                        displayName
                        name
                        tag
                        currentRank
                        peakRank
                        link
                        imageLink
                        quote
                        playerMatches {
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
                        playerMatchCount
                    }
                }   
            `,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    let data: PlayerType = (await response.json()).data.playerById;

    if (playerSchema.parse(data)) {
        return data as PlayerType;
    } else {
        throw new Error("Response data is incorrect.");
    }
}

function createPlayerCard(player: PlayerType): React.ReactNode {
    const playerIconSize: number = 128;
    const rankSize: number = 56;

    return (
        <div className="dark:bg-slate-900 shadow-lg p-4 rounded-2xl flex flex-col min-w-max space-y-2 ml-2">
            <div className="flex flex-row justify-between">
                <Image
                    priority
                    src={player.imageLink}
                    alt=""
                    width={playerIconSize}
                    height={playerIconSize}
                />
                <div className="flex flex-col justify-between items-end">
                    <div className="flex flex-row space-x-2 items-center h-min">
                        <span className="text-xl">{player.peakRank}</span>
                        <Image
                            className="h-min"
                            priority
                            src={`/images/rank/${player.peakRank}.png`}
                            alt=""
                            width={rankSize}
                            height={rankSize}
                        />
                    </div>
                    <div className="flex flex-row space-x-2 items-center h-min">
                        <span className="text-xl">{player.currentRank}</span>
                        <Image
                            className="h-min"
                            priority
                            src={`/images/rank/${player.currentRank}.png`}
                            alt=""
                            width={rankSize}
                            height={rankSize}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-2 justify-between">
                <h1 className="text-3xl flex-row flex items-center mr-10 text-slate-400">
                    {player.name}
                    <span className="ml-2 text-xl font-normal text-white bg-indigo-500 px-2 py-1 rounded-lg">
                        #{player.tag}
                    </span>
                </h1>
                <Link
                    className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 duration-[350ms]"
                    href={player.link}
                >
                    <svg
                        className="h-4 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 189.177 64.563"
                        xmlSpace="preserve"
                    >
                        <g transform="translate(-40.878 -103.185)">
                            <g
                                fillOpacity="1"
                                transform="translate(-.132 13.232)"
                            >
                                <path
                                    fill="currentColor"
                                    d="M79.11 130.44v-24.078H99.483v48.155h17.727v-48.155h28.84v8.462l-12.766.069-12.766.068-.07 7.866-.07 7.866 5.482.072 5.482.071 6.324 11.84 6.323 11.84H163.226l-1.03-1.918c-.567-1.055-3.415-6.38-6.33-11.835l-5.298-9.916 1.992-.337c5.426-.916 9.627-5.179 10.441-10.594.182-1.213.254-5.226.193-10.848 0-7.46.342-19.11-10.939-18.977l-54.822-.069-56.423-.068v16.409H61.383v48.154H79.11z"
                                    display="inline"
                                />
                                <path
                                    fill="#e44020"
                                    d="M184.415 134.607v-19.91l13.272 19.91 13.272 19.91h19.228V89.958h-17.462v19.05c0 10.478-.09 19.047-.198 19.043-.11-.004-5.903-8.577-12.876-19.05l-12.676-19.043h-20.288v64.559h17.728z"
                                    display="inline"
                                />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
            <div>
                <i className="text-slate-500 text-xl">{player.quote}</i>
            </div>
        </div>
    );
}

function createPlayerMatchCards(
    playerMatches: PlayerMatchType[],
): React.ReactNode {
    const agentImageSize: number = 80;

    let compiledMatches: React.ReactNode[] = [];

    playerMatches.forEach((match) => {
        if (!playerMatchSchema.parse(match)) {
            throw new Error("Team match incorrect");
        } else {
            // let win: boolean = match.score == 100;
            let win: boolean = true;

            let teamBold: string;
            let enemyBold: string;
            if (win) {
                teamBold = "font-bold ";
                enemyBold = "";
            } else {
                teamBold = "";
                enemyBold = "font-bold ";
            }

            let practiceText: React.ReactNode;
            let scoreColor: string;
            if (false) {
                scoreColor = "bg-orange-400";
                practiceText = (
                    <span className="ml-1 text-sm text-orange-400">
                        (Practice)
                    </span>
                );
            } else {
                practiceText = <></>;
                if (win) {
                    scoreColor = "bg-green-400";
                } else {
                    scoreColor = "bg-red-500";
                }
            }

            let match2 = {
                playedAt: "2024-01-19T19:01",
                duration: "PT34M22S",
                map: "Ascent",
            };

            let [date, time] = match2.playedAt.split("T");
            let [year, month, day] = date.split("-");
            let [hour, minute] = time.split(":");
            let timeOfDay: String = "a"; // default time in the AM

            if (hour == "00") {
                hour = "12";
            } else if (parseInt(hour) > 12) {
                hour = (parseInt(hour) - 12).toString();
                timeOfDay = "p";
            }

            let finalDuration = formatDuration(match2.duration);
            let finalDate = `${month}/${day}/${year.toString().substring(2)}`;
            let finalTime = `${hour}:${minute}${timeOfDay}`;

            compiledMatches.push(
                <Link
                    key={match.id}
                    href={`/team/${match.teamMatchId}/match/${match.teamMatchId}`}
                >
                    <div className="text-slate-400 dark:bg-slate-900 shadow-xl hover:shadow-2xl p-3 rounded-2xl flex flex-row space-x-4 ring-2 ring-transparent ring-inset hover:ring-indigo-500 duration-[350ms] hover:translate-x-1 hover:-translate-y-1">
                        <Image
                            className="rounded-md"
                            priority
                            src={`/images/agents/${match.agent}.png`}
                            alt=""
                            width={agentImageSize}
                            height={agentImageSize}
                        />
                        <div className="dark:bg-slate-400 w-[2px]"></div>
                        <div className="flex flex-col grow">
                            <div className="flex flex-row h-min justify-between space-x-8">
                                <div className="flex flex-row h-min space-x-2 items-center">
                                    <h1 className="text-2xl font-medium">
                                        {match.agent}
                                    </h1>
                                    <span className="text-md px-2 py-[2px] bg-indigo-500 text-white rounded-md max-h-min">
                                        #{match.placement}
                                    </span>
                                </div>
                                <span className="text-lg text-slate-500 items-start h-min">
                                    {`${finalDate}@${finalTime} | ${finalDuration}`}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 grow items-center">
                                <h1 className="text-xl text-slate-500">
                                    {match2.map}
                                    {practiceText}
                                </h1>
                                <h1 className="text-2xl mx-auto flex flex-row space-x-1">
                                    <span
                                        className={`${teamBold}text-green-400`}
                                    >
                                        {match.kills}
                                    </span>
                                    <span className="font-bold">
                                        {match.deaths}
                                    </span>
                                    <span
                                        className={`${enemyBold}text-red-500`}
                                    >
                                        {match.assists}
                                    </span>
                                </h1>
                                <div
                                    className={`${scoreColor} rounded-lg px-2 py-1 max-w-min ml-auto`}
                                >
                                    <h1 className="text-xl font-normal text-slate-900">
                                        +
                                        {rps(
                                            match.placement,
                                            match.trackerNetworkScore,
                                            match.averageCombatScore,
                                            match.kills,
                                            match.deaths,
                                            match.assists,
                                            match.damageDelta,
                                            match.averageDamagePerRound,
                                            match.headshotPercentage,
                                            match.killedAssistedSurvivedTraded,
                                            match.firstKills,
                                            match.firstDeaths,
                                            match.multies,
                                        )}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>,
            );
        }
    });

    return compiledMatches;
}

function formatDuration(duration: string): string {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

    const match = duration.match(regex);

    if (match == null) {
        throw new Error(`RegEx match not found in ${duration}`);
    }

    let h: number = parseInt(match[1]);
    let hours: string;
    let m: number = parseInt(match[2]);
    let minutes: string;
    let s: number = parseInt(match[3]);
    let seconds: string;

    if (Number.isNaN(h) || h == 0) {
        hours = "";
    } else {
        if (h.toString().length > 2) {
            throw new Error("Hours in duration is too long.");
        } else if (h.toString().length == 2) {
            hours = `${h}h `;
        } else {
            hours = `0${h}h `;
        }
    }

    if (Number.isNaN(m) || m == 0) {
        minutes = "00m ";
    } else {
        if (m.toString().length > 2) {
            throw new Error("Minutes in duration is too long.");
        } else if (m.toString().length == 2) {
            minutes = `${m}m `;
        } else {
            minutes = `0${m}m `;
        }
    }

    if (Number.isNaN(s) || s == 0) {
        seconds = "00s";
    } else {
        if (s.toString().length > 2) {
            throw new Error("Seconds in duration is too long.");
        } else if (m.toString().length == 2) {
            seconds = `${s}s`;
        } else {
            seconds = `0${s}s`;
        }
    }

    return `${hours}${minutes}${seconds}`;
}
