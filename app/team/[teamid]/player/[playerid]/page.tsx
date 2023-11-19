// import { data, genLine } from "@/components/charts/line/lineCharts";
import { GenLine } from "@/components/charts/line/lineCharts";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
    params: {
        teamid: number,
        playerid: number
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.playerid

    const data = await getPlayerName(id);

    return {
        title: `${data.name}#${data.tag}`
    }
}

export default function Page({ params }: Props) {
    

    // const data2 = {
    //     labels2,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: [7, 6, 5, 4, 3, 2, 1],
    //             borderColor: 'rgb(255, 99, 132)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: [1, 2, 3, 4, 5, 6, 7],
    //             borderColor: 'rgb(53, 162, 235)',
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    // const data3 = {
    //     labels3,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: [7, 6, 5, 4, 3, 2, 1],
    //             borderColor: 'rgb(255, 99, 132)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: [1, 2, 3, 4, 5, 6, 7],
    //             borderColor: 'rgb(53, 162, 235)',
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    // const data4 = {
    //     labels4,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: [7, 6, 5, 4, 3, 2, 1],
    //             borderColor: 'rgb(255, 99, 132)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: [1, 2, 3, 4, 5, 6, 7],
    //             borderColor: 'rgb(53, 162, 235)',
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    return (
        <main className="grow mx-auto flex">
            <div className="w-96 h-5/6">
                <GenLine />
                {/* <div className="bg-slate-900 p-2 rounded-3xl shadow-xl">
                    <GenLine data={data1} />
                </div>
                <div className="bg-slate-900 p-2 rounded-3xl shadow-xl">
                    <GenLine data={data1} />
                </div>
                <div className="bg-slate-900 p-2 rounded-3xl shadow-xl">
                    <GenLine data={data1} />
                </div> */}
            </div>
        </main>
    )
}

async function getPlayerName(id: number) {
    const response = await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query PlayerById {
                    playerById(id: ${id}) {
                        name
                        tag
                    }
                }              
            `
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    let resJson = await response.json();

    return await resJson.data.playerById;
}