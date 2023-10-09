import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 dark:text-white">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center md:hidden">
                            <button className="relative inline-flex items-center justify-center rounded-md p-2" type="button" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                            </button>
                        </div>
                        <div className="flex flex-shrink-0 items-center">
                            <svg className="h-6 w-auto" version="1.1" viewBox="0 0 1664.1 200" xmlns="http://www.w3.org/2000/svg" ><defs><linearGradient id="a" x1="673.4" x2="1304.6" y1="-161.77" y2="459.54" gradientTransform="matrix(.3219 0 0 .3219 -216.77 52.073)" gradientUnits="userSpaceOnUse"><stop stop-color="#f29a16" offset=".2131"/><stop stop-color="#f6e3b2" offset=".33588"/><stop stop-color="#f29a16" offset=".56066"/><stop stop-color="#f0dfb9" offset=".68779"/><stop stop-color="#f0dfb9" offset=".84853"/></linearGradient></defs><path d="m70.422 164.83 28.341-28.341a3.9997 3.9997 0 0 1 5.6564 0l28.341 28.341a3.9997 3.9997 0 0 1 0 5.6564l-28.341 28.341a3.9997 3.9997 0 0 1-5.6564 0l-28.341-28.341a3.9997 3.9997 0 0 1 0-5.6564zm-70.422-142.77v40.765a1.6646 1.6646 0 0 0 2.8466 1.1722l43.033-43.392a1.2522 1.2522 0 0 0-0.88907-2.134h-41.402a3.5881 3.5881 0 0 0-3.5881 3.5881zm203.18 0v40.765a1.6646 1.6646 0 0 1-2.8466 1.1722l-43.033-43.392a1.2522 1.2522 0 0 1 0.88908-2.134h41.402a3.5881 3.5881 0 0 1 3.588 3.5881zm-3.4198 145.6h-29.109a3.6179 3.6179 0 0 1-2.5582-1.0597l-65.731-65.731a1.1369 1.1369 0 0 0-1.6078 0l-65.676 65.676a3.8046 3.8046 0 0 1-2.6903 1.1144h-28.929a1.4467 1.4467 0 0 1-1.023-2.4696l96.517-96.517a3.6836 3.6836 0 0 1 5.2094 0l96.59 96.59a1.4041 1.4041 0 0 1-0.99281 2.3969zm0.0303-67.598h-29.109a3.6179 3.6179 0 0 1-2.5582-1.0596l-65.731-65.731a1.1369 1.1369 0 0 0-1.6078 0l-65.676 65.676a3.8046 3.8046 0 0 1-2.6903 1.1144h-28.929a1.4467 1.4467 0 0 1-1.0229-2.4696l96.517-96.517a3.6836 3.6836 0 0 1 5.2094 0l96.59 96.59a1.4041 1.4041 0 0 1-0.99281 2.3969zm0 0h-29.109a3.6179 3.6179 0 0 1-2.5582-1.0596l-65.731-65.731a1.1369 1.1369 0 0 0-1.6078 0l-65.676 65.676a3.8046 3.8046 0 0 1-2.6903 1.1144h-28.929a1.4467 1.4467 0 0 1-1.0229-2.4696l96.517-96.517a3.6836 3.6836 0 0 1 5.2094 0l96.59 96.59a1.4041 1.4041 0 0 1-0.99281 2.3969z" fill="url(#a)" filter="url(#filter188)" stroke-linejoin="round" stroke-width="1.5117" /><path d="m1661.9 87.812-16.778 4.7486q-1.5829-4.1946-4.6695-8.1518-3.0074-4.0363-8.2309-6.648-5.2235-2.6117-13.375-2.6117-11.159 0-18.599 5.1443-7.3604 5.0652-7.3604 12.9 0 6.9646 5.0652 11.001t15.829 6.7272l18.045 4.432q16.304 3.9572 24.297 12.109 7.9934 8.0726 7.9934 20.815 0 10.447-6.0148 18.678-5.9357 8.2309-16.62 12.98-10.684 4.7486-24.851 4.7486-18.599 0-30.787-8.0726-12.188-8.0726-15.433-23.585l17.728-4.432q2.5326 9.8138 9.5764 14.721 7.1229 4.9069 18.599 4.9069 13.059 0 20.736-5.54 7.7561-5.6192 7.7561-13.454 0-6.3315-4.4321-10.605-4.4319-4.3529-13.613-6.4898l-20.261-4.7486q-16.699-3.9572-24.534-12.267-7.756-8.3892-7.756-20.973 0-10.289 5.7775-18.203 5.8566-7.9143 15.908-12.426 10.13-4.5112 22.952-4.5112 18.045 0 28.333 7.9143 10.368 7.9143 14.721 20.894zm-112.07-27.225v15.829h-62.998v-15.829zm-44.637-29.125h18.678v115.87q0 7.9143 2.2952 11.872 2.3743 3.878 6.0148 5.2235 3.7198 1.2663 7.8353 1.2663 3.0865 0 5.0651-0.31658 1.9786-0.39571 3.1658-0.63314l3.7988 16.778q-1.8994 0.71229-5.3026 1.4246-3.4031 0.79143-8.6266 0.79143-7.9143 0-15.512-3.4032-7.5186-3.4032-12.505-10.368-4.9069-6.9646-4.9069-17.57zm-98.138 153.54q-11.555 0-20.973-4.3529-9.4181-4.432-14.958-12.742-5.54-8.3892-5.54-20.261 0-10.447 4.1154-16.937 4.1154-6.5689 11.001-10.289 6.8856-3.7197 15.196-5.54 8.3892-1.8994 16.858-3.0074 11.08-1.4246 17.966-2.1369 6.9646-0.79144 10.13-2.6117 3.2449-1.8203 3.2449-6.3315v-0.63315q0-11.713-6.4106-18.203-6.3313-6.4898-19.232-6.4898-13.375 0-20.973 5.8566-7.5978 5.8566-10.684 12.505l-17.728-6.3315q4.7486-11.08 12.663-17.253 7.9934-6.2523 17.412-8.7058 9.4972-2.5326 18.678-2.5326 5.8566 0 13.454 1.4246 7.6769 1.3454 14.8 5.6192 7.2021 4.2737 11.951 12.9 4.7487 8.6266 4.7487 23.11v80.093h-18.678v-16.462h-0.9496q-1.8994 3.9572-6.3315 8.4683-4.432 4.5112-11.792 7.6769-7.3604 3.1657-17.966 3.1657zm2.8492-16.778q11.08 0 18.678-4.3529 7.677-4.3529 11.555-11.238 3.9572-6.8855 3.9572-14.483v-17.095q-1.1871 1.4246-5.2234 2.6117-3.9572 1.108-9.1806 1.9786-5.1444 0.79143-10.051 1.4246-4.8278 0.554-7.8352 0.94972-7.2811 0.94972-13.613 3.0866-6.2524 2.0577-10.13 6.2523-3.7989 4.1155-3.7989 11.238 0 9.7346 7.2021 14.721 7.2812 4.9069 18.44 4.9069zm-66.797-107.64v15.829h-62.998v-15.829zm-44.637-29.125h18.678v115.87q0 7.9143 2.2952 11.872 2.3743 3.878 6.0149 5.2235 3.7197 1.2663 7.8351 1.2663 3.0866 0 5.0653-0.31658 1.9785-0.39571 3.1657-0.63314l3.7989 16.778q-1.8994 0.71229-5.3026 1.4246-3.4032 0.79143-8.6267 0.79143-7.9143 0-15.512-3.4032-7.5186-3.4032-12.505-10.368-4.9069-6.9646-4.9069-17.57zm-59.2 29.125q-1.4246-12.03-11.555-18.678-10.13-6.648-24.851-6.648-10.764 0-18.836 3.4823-7.9935 3.4823-12.505 9.5764-4.4321 6.094-4.4321 13.85 0 6.4898 3.0866 11.159 3.1658 4.5903 8.0726 7.6769 4.9069 3.0074 10.289 4.986 5.3817 1.8994 9.8929 3.0866l16.462 4.432q6.3315 1.662 14.088 4.5903 7.8353 2.9283 14.958 7.9935 7.202 4.986 11.871 12.821 4.6695 7.8352 4.6695 19.232 0 13.138-6.8854 23.743-6.8064 10.605-19.944 16.858-13.059 6.2523-31.736 6.2523-17.412 0-30.154-5.6192-12.663-5.6192-19.944-15.67-7.2021-10.051-8.1518-23.347h20.261q0.7914 9.1806 6.1732 15.196 5.4609 5.9358 13.771 8.8641 8.3892 2.8492 18.045 2.8492 11.238 0 20.182-3.6406 8.9432-3.7197 14.167-10.289 5.2235-6.648 5.2235-15.512 0-8.0726-4.5112-13.138-4.5111-5.0652-11.871-8.2309-7.3604-3.1657-15.908-5.54l-19.944-5.6983q-18.994-5.4609-30.074-15.591-11.08-10.13-11.08-26.513 0-13.613 7.3604-23.743 7.4394-10.209 19.944-15.829 12.584-5.6983 28.096-5.6983 15.67 0 27.858 5.6192 12.188 5.54 19.311 15.196 7.2021 9.6555 7.5978 21.923zm-236.8 121.56v-121.56h18.045v18.361h1.2663q3.324-9.0223 12.03-14.642 8.7058-5.6192 19.628-5.6192 2.0577 0 5.1443 0.07914t4.6695 0.23743v18.994q-0.9497-0.23743-4.353-0.71229-3.324-0.554-7.0437-0.554-8.8641 0-15.829 3.7197-6.8854 3.6406-10.922 10.13-3.9571 6.4106-3.9571 14.642v76.927zm-78.827 2.5326q-17.57 0-30.312-7.7561-12.663-7.8352-19.548-21.844-6.8063-14.088-6.8063-32.765 0-18.678 6.8063-32.924 6.8855-14.325 19.153-22.318 12.346-8.0726 28.808-8.0726 9.4972 0 18.757 3.1657 9.2598 3.1657 16.858 10.289 7.5977 7.0438 12.109 18.678 4.5111 11.634 4.5111 28.65v7.9143h-93.706v-16.145h74.711q0-10.289-4.1154-18.361-4.0363-8.0726-11.555-12.742-7.4395-4.6695-17.57-4.6695-11.159 0-19.311 5.54-8.0726 5.4609-12.425 14.246-4.3529 8.7849-4.3529 18.836v10.763q0 13.771 4.7486 23.347 4.8278 9.4972 13.375 14.483 8.5475 4.9069 19.865 4.9069 7.3604 0 13.296-2.0577 6.0149-2.1369 10.368-6.3315 4.3529-4.2737 6.7272-10.605l18.045 5.0652q-2.8491 9.1806-9.5764 16.145-6.7272 6.8855-16.62 10.764-9.8929 3.7989-22.239 3.7989zm-103.84-2.5326v-121.56h18.678v121.56zm9.4972-141.82q-5.4609 0-9.4181-3.7197-3.878-3.7197-3.878-8.9432 0-5.2235 3.878-8.9432 3.9572-3.7197 9.4181-3.7197t9.3389 3.7197q3.9572 3.7197 3.9572 8.9432 0 5.2235-3.9572 8.9432-3.878 3.7197-9.3389 3.7197zm-203.24 141.82v-121.56h18.045v18.994h1.5829q3.7989-9.7346 12.267-15.116 8.4683-5.4609 20.34-5.4609 12.03 0 20.023 5.4609 8.0726 5.3818 12.584 15.116h1.2663q4.6694-9.4181 14.008-14.958 9.3389-5.6192 22.398-5.6192 16.304 0 26.671 10.209 10.368 10.13 10.368 31.578v81.359h-18.678v-81.359q0-13.454-7.3603-19.232-7.3603-5.7775-17.332-5.7775-12.821 0-19.865 7.7561-7.0438 7.6769-7.0438 19.469v79.143h-18.994v-83.259q0-10.368-6.7272-16.699-6.7272-6.4106-17.332-6.4106-7.2812 0-13.613 3.878-6.2523 3.878-10.13 10.764-3.7989 6.8063-3.7989 15.75v75.978zm-78.827 2.5326q-17.57 0-30.312-7.7561-12.663-7.8352-19.548-21.844-6.8063-14.088-6.8063-32.765 0-18.678 6.8063-32.924 6.8855-14.325 19.153-22.318 12.346-8.0726 28.808-8.0726 9.4972 0 18.757 3.1657 9.2598 3.1657 16.858 10.289 7.5978 7.0438 12.109 18.678 4.5112 11.634 4.5112 28.65v7.9143h-93.706v-16.145h74.711q0-10.289-4.1155-18.361-4.0363-8.0726-11.555-12.742-7.4395-4.6695-17.57-4.6695-11.159 0-19.311 5.54-8.0726 5.4609-12.426 14.246-4.3529 8.7849-4.3529 18.836v10.763q0 13.771 4.7486 23.347 4.8277 9.4972 13.375 14.483 8.5475 4.9069 19.865 4.9069 7.3603 0 13.296-2.0577 6.0149-2.1369 10.368-6.3315 4.3529-4.2737 6.7272-10.605l18.045 5.0652q-2.8492 9.1806-9.5764 16.145-6.7272 6.8855-16.62 10.764-9.8929 3.7989-22.239 3.7989zm-130.11-2.5326v-121.56h18.045v18.361h1.2663q3.324-9.0223 12.03-14.642 8.7058-5.6192 19.628-5.6192 2.0577 0 5.1443 0.07914 3.0866 0.07914 4.6694 0.23743v18.994q-0.94972-0.23743-4.3529-0.71229-3.324-0.554-7.0438-0.554-8.8641 0-15.829 3.7197-6.8855 3.6406-10.922 10.13-3.9572 6.4106-3.9572 14.642v76.927zm-138.98 0v-162.09h54.767q19.074 0 31.182 6.8855 12.188 6.8063 18.045 18.44t5.8566 25.959-5.8566 26.038q-5.7775 11.713-17.886 18.678-12.109 6.8855-31.024 6.8855h-39.255v-17.412h38.622q13.059 0 20.973-4.5112 7.9143-4.5112 11.476-12.188 3.6406-7.7561 3.6406-17.491 0-9.7346-3.6406-17.412-3.5615-7.6769-11.555-12.03-7.9935-4.432-21.21-4.432h-34.507v144.67z" fill="currentColor" stroke-width="4.3872"/></svg>
                        </div>
                        <div className="hidden md:ml-6 md:flex items-center space-x-4">
                            <Link className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page" href={"/"}>Home</Link>
                            <Link className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700" href={"/players"}>Players</Link>
                            <Link className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700" href={"/teams"}>Teams</Link>
                            <Link className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700" href={"/team/0"}>My Team</Link>
                            <Link className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700" href={"/team/0/player/0"}>Me</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <button type="button" className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm">
                                <svg className="-ml-0.5 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                Add Team
                            </button>
                        </div>
                        <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                            <div className="relative ml-3">
                                <div>
                                    <button className="relative flex rounded-bl-full bg-gray-800 text-sm">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open User Menu</span>
                                        <img className="h-8  w-8 rounded-bl-full" src="/favicon-4.png" alt="" />
                                        {/* <Image className="h-6 w-6 rounded-bl-full" src="/favicon-4.png" alt="" width={512} height={512}></Image> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}