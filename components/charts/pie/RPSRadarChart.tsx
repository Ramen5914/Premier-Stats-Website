"use client";

// import React from "react";
import { Radar } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     RadialLinearScale,
//     Colors,
//     Tooltip,
//     Legend,
//     PointElement,
//     LineElement,
//     Filler,
// } from "chart.js";

// ChartJS.register(
//     RadialLinearScale,
//     PointElement,
//     LineElement,
//     Colors,
//     Tooltip,
//     Legend,
//     Filler,
// );
import "chart.js/auto";

export default function AgentPieChart() {
    return (
        <Radar
            datasetIdKey='rpsRadarChart'
            data={{
                labels: [
                    "HS%",
                    "Place",
                    "TRS",
                    "ACS",
                    "KDA",
                    "K/D",
                    "ADR",
                    "KAST",
                    "FK/FD",
                    "Multies",
                ],
                datasets: [
                    {
                        label: "Ramen's Score",
                        data: [
                            51.5025, 70.85875, 74.95, 80.8625, 73.73625, 72.315,
                            62.44, 59.4225, 38.855, 33.87875,
                        ],
                        fill: true,
                    },
                    {
                        label: "75%",
                        data: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
                        fill: false,
                        drawActiveElementsOnTop: true,
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
            }}
        />
    );
}
