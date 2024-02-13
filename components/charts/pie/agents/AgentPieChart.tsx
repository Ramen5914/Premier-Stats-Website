"use client";

import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function AgentPieChart() {
    return (
        <Pie
            datasetIdKey='agentPieChart'
            data={{
                labels: ["Reyna", "Jett", "KAY/O"],
                datasets: [
                    {
                        label: "Times Picked",
                        data: [5, 2, 1],
                        backgroundColor: ["#CA00D9", "#91DAFF", "#2f5af3"],
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
