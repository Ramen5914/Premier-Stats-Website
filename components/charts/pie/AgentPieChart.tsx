"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartData, Colors, Tooltip, Legend, } from "chart.js";

ChartJS.register(ArcElement, Colors, Tooltip, Legend);

const data: ChartData<"pie", number[], string> = {
    labels: ["Reyna", "Jett", "KAY/O"],
    datasets: [
        {
            label: "# of Votes",
            data: [5, 2, 1],
            backgroundColor: [
                "#CA00D9",
                "#91DAFF",
                "#78A3BE",
            ],
            // borderColor: [
            //     "rgba(255, 99, 132, 1)",
            //     "rgba(54, 162, 235, 1)",
            //     "rgba(255, 206, 86, 1)",
            //     "rgba(75, 192, 192, 1)",
            //     "rgba(153, 102, 255, 1)",
            //     "rgba(255, 159, 64, 1)",
            // ],
            borderWidth: 1,
        },
    ],
};

export default function AgentPieChart() {
    return <Pie datasetIdKey='agentPieChart' data={data} />;
}
