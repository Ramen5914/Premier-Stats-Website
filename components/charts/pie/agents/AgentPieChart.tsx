"use client";

import { Pie } from "react-chartjs-2";
import { PlayerMatch } from "./agentPieSchema";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";

ChartJS.register(Title, ArcElement, Legend, Tooltip);

export default function AgentPieChart({
    playerMatches,
}: Readonly<{ playerMatches: PlayerMatch[] }>) {
    const agentCounter: { [id: string]: [number, string] } = {
        Astra: [0, "#7E24D6"],
        Breach: [0, "#8B4C31"],
        Brimstone: [0, "#A52F17"],
        Chamber: [0, "#FAA51C"],
        Cypher: [0, "#5480C2"],
        Deadlock: [0, "#CEB89D"],
        Fade: [0, "#344261"],
        Gekko: [0, "#B2D360"],
        Harbor: [0, "#5591BE"],
        Iso: [0, "#8A5EF0"],
        Jett: [0, "#B7D2DA"],
        KAY_O: [0, "#13208F"],
        Killjoy: [0, "#F5CE2C"],
        Neon: [0, "#423DD6"],
        Omen: [0, "#393455"],
        Phoenix: [0, "#E58B47"],
        Raze: [0, "#BE4D2F"],
        Reyna: [0, "#7B3675"],
        Sage: [0, "#3EB1A9"],
        Skye: [0, "#628C66"],
        Sova: [0, "#49CBDF"],
        Viper: [0, "#63BF4A"],
        Yoru: [0, "#2221B4"],
    };

    // const agentSet: Set<string> = new Set<string>();

    for (let match of playerMatches) {
        agentCounter[match.agent][0]++;
    }

    let data = getDataPoints(agentCounter);

    return (
        <Pie
            datasetIdKey='agentPieChart'
            data={{
                labels: data[0],
                datasets: [
                    {
                        label: "Times Picked",
                        data: data[1],
                        backgroundColor: data[2],
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                plugins: {
                    title: {
                        text: "Agent Played",
                        color: "#fff",
                        display: true,
                        position: "top",
                        align: "center",
                        font: {
                            weight: "bold",
                            size: 20,
                        },
                    },
                },
                interaction: {
                    intersect: true,
                },
            }}
        />
    );
}

function getDataPoints(agentCounter: {
    [key: string]: [number, string];
}): [string[], number[], string[]] {
    let agents: string[] = [];
    let data: number[] = [];
    let color: string[] = [];
    for (let key in agentCounter) {
        if (agentCounter[key][0] > 0) {
            agents.push(key);
            data.push(agentCounter[key][0]);
            color.push(agentCounter[key][1]);
        }
    }

    return [agents, data, color];
}
