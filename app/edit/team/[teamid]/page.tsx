export default function Page({ params }: { params: { teamid: number } }) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl">Team {params.teamid}</h1>
            <form method="POST" className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col my-auto">
                        <label>Team Name: </label>
                        <label>Team Region</label>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <input type="text" name="team-name"/>
                            #
                            <input type="text" name="team-tag" maxLength={5}/>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>

                {/* <div className="flex flex-row justify-between space-x-6">
                    <div>
                        <label>Name: </label>
                        <input className="text-black px-4 py-3 rounded-xl h-8 w-60" type="text" name="name" />
                    </div>
                    <div>
                    <label className="text-xl">#</label>
                        <input className="text-black px-3 py-3 rounded-xl h-8 w-20" type="text" name="name" />
                    </div>
                </div>

                <div className="flex flex-row justify-between space-x-6">
                    <label>Email: </label>
                    <input className=" text-black px-4 py-3 rounded-xl focus:ring-2 focus:ring-inset focus:ring-indigo-500 h-8 w-80" type="text" name="email" />
                </div>

                <div className="flex flex-row justify-between space-x-6">
                    <label>Message: </label>
                    <input className="text-black px-4 py-3 rounded-xl focus:ring-2 focus:ring-inset focus:ring-indigo-500 h-8 w-80" type="text" name="email" />
                </div> */}

                <button className="px-3 py-2 bg-indigo-500 text-white hover:bg-indigo-400 w-fit mx-auto shadow-sm font-semibold text-sm rounded-md" type="submit">Send message</button>
            </form>
        </div>
    )
}