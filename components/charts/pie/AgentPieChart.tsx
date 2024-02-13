"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    ChartData,
    Colors,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Colors, Tooltip, Legend);

const data: ChartData<"pie", number[], string> = {
    labels: ["Reyna", "Jett", "KAY/O"],
    datasets: [
        {
            label: "Times Picked",
            data: [5, 2, 1],
            backgroundColor: ["#CA00D9", "#91DAFF", "#2f5af3"],
            borderWidth: 1,
        },
    ],
};

export default function AgentPieChart() {
    return <Pie datasetIdKey='agentPieChart' data={data} />;
}
