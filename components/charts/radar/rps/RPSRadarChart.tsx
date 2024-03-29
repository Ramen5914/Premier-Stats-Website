"use client";

import {
    averageCombatScore,
    headshot,
    killDeathRatioAndPM,
    killsDeathsAssists,
    placement,
    trackerNetworkScore,
    adrAndDamageDelta,
    killedAssistedSurvivedTraded,
    firstKillsFirstDeaths,
    multiKills,
} from "@/functions/rps";
import { Radar } from "react-chartjs-2";
import { PlayerMatch } from "./rpsRadarSchema";
import {
    Chart as ChartJS,
    Title,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Colors,
} from "chart.js";

ChartJS.register(
    Title,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Colors,
);

export default function RPSRadarChart({
    playerMatches,
}: Readonly<{ playerMatches: PlayerMatch[] }>) {
    let hs: number = 0,
        place: number = 0,
        trs: number = 0,
        acs: number = 0,
        kda: number = 0,
        kd: number = 0,
        adr: number = 0,
        kast: number = 0,
        fkfd: number = 0,
        multies: number = 0;
    let matchCount: number = playerMatches.length;
    for (let match of playerMatches) {
        hs += headshot(match.headshotPercentage, true) / matchCount;

        place += placement(match.placement, true) / matchCount;

        trs +=
            trackerNetworkScore(match.trackerNetworkScore, true) / matchCount;

        acs += averageCombatScore(match.averageCombatScore, true) / matchCount;

        kda +=
            killsDeathsAssists(match.kills, match.deaths, match.assists, true) /
            matchCount;

        kd +=
            killDeathRatioAndPM(match.killDeathRatio, match.plusMinus, true) /
            matchCount;

        adr +=
            adrAndDamageDelta(
                match.averageDamagePerRound,
                match.damageDelta,
                true,
            ) / matchCount;

        kast +=
            killedAssistedSurvivedTraded(
                match.killedAssistedSurvivedTraded,
                true,
            ) / matchCount;

        fkfd +=
            firstKillsFirstDeaths(match.firstKills, match.firstDeaths, true) /
            matchCount;

        multies +=
            multiKills(
                match.threeK,
                match.fourK,
                match.fiveK,
                match.sixK,
                true,
            ) / matchCount;
    }

    return (
        <Radar
            datasetIdKey='rpsRadarChart'
            data={{
                labels: [
                    "Headshot",
                    "Place",
                    "TNS",
                    "ACS",
                    "K/D/A",
                    "K/D Ratio",
                    "ADR",
                    "KAST",
                    "FK/FD",
                    "Multies",
                ],
                datasets: [
                    {
                        label: "Rating",
                        data: [
                            hs.toFixed(1),
                            place.toFixed(1),
                            trs.toFixed(1),
                            acs.toFixed(1),
                            kda.toFixed(1),
                            kd.toFixed(1),
                            adr.toFixed(1),
                            kast.toFixed(1),
                            fkfd.toFixed(1),
                            multies.toFixed(1),
                        ],
                        fill: true,
                    },
                ],
            }}
            options={{
                scales: {
                    r: {
                        grid: {
                            color: "#fff",
                        },
                        beginAtZero: true,
                        max: 100,
                        angleLines: {
                            color: "#fff",
                        },
                        ticks: {
                            backdropColor: "rgba(15, 23, 42, 1)",
                            backdropPadding: 4,
                            color: "#fff",
                            font: {
                                size: 14,
                                family: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                            },
                        },
                        pointLabels: {
                            color: "#fff",
                            font: {
                                size: 14,
                                family: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                            },
                        },
                    },
                },
                interaction: {
                    intersect: false,
                    mode: "nearest",
                },
                plugins: {
                    title: {
                        text: "RPS Breakdown",
                        color: "#fff",
                        display: true,
                        position: "top",
                        align: "center",
                        font: {
                            weight: "bold",
                            size: 20,
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}
