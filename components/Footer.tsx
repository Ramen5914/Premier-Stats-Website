import '../app/(css)/Footer.css'

export default function Footer() {
    return (
        <footer >
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center md:order-2 space-x-6">
                    <a className="hover:text-[#000] dark:hover:text-[#fff] si-animation" href="https://github.com/Ramen5914/Premier-Stats-API">
                        <span className="sr-only">
                            Github
                        </span>
                        <svg className="si" xmlns="http://www.w3.org/2000/svg" version="1.0" width="240.000000pt" height="240.000000pt" viewBox="0 0 240.000000 240.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"><path d="M970 2301 c-305 -68 -555 -237 -727 -493 -301 -451 -241 -1056 143 -1442 115 -116 290 -228 422 -271 49 -16 55 -16 77 -1 24 16 25 20 25 135 l0 118 -88 -5 c-103 -5 -183 13 -231 54 -17 14 -50 62 -73 106 -38 74 -66 108 -144 177 -26 23 -27 24 -9 37 43 32 130 1 185 -65 96 -117 133 -148 188 -160 49 -10 94 -6 162 14 9 3 21 24 27 48 6 23 22 58 35 77 l24 35 -81 16 c-170 35 -275 96 -344 200 -64 96 -85 179 -86 334 0 146 16 206 79 288 28 36 31 47 23 68 -15 36 -11 188 5 234 13 34 20 40 47 43 45 5 129 -24 214 -72 l73 -42 64 15 c91 21 364 20 446 0 l62 -16 58 35 c77 46 175 82 224 82 39 0 39 -1 55 -52 17 -59 20 -166 5 -217 -8 -30 -6 -39 16 -68 109 -144 121 -383 29 -579 -62 -129 -193 -219 -369 -252 l-84 -16 31 -55 32 -56 3 -223 4 -223 25 -16 c23 -15 28 -15 76 2 80 27 217 101 292 158 446 334 590 933 343 1431 -145 293 -419 518 -733 602 -137 36 -395 44 -525 15z" /></g></svg>
                    </a>
                    <a className="hover:text-[#9146FF] si-animation" href="https://www.twitch.tv/ramen5914">
                        <span className="sr-only">
                            Twitch
                        </span>
                        <svg className="si" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2400 2800"><g><polygon fill="#00000000" points="2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200  " /><g><g id="Layer_1-2"><path fill="currentColor" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600     V1300z" /><rect x="1700" y="550" fill="currentColor" width="200" height="600" /><rect x="1150" y="550" fill="currentColor" width="200" height="600" /></g></g></g></svg>
                    </a>
                    <a className="hover:text-[#5865F2] si-animation" href="https://discord.com/invite/ww7D7jBYDy">
                        <span className="sr-only">
                            Discord
                        </span>
                        <svg className="si" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="currentColor" /></svg>
                    </a>
                    <a className="hover:text-[#f00] si-animation" href="https://www.youtube.com/@Ramen5914ttv">
                        <span className="sr-only">
                            YouTube
                        </span>
                        <svg className="si" width="756.99" height="756.99" version="1.1" viewBox="-35.2 -41.333 192.44 234.67" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m61.022-6.6672s-73.382-2.24e-4 -91.682 4.9358c-10.098 2.716-18.051 10.719-20.748 20.881-4.903 18.419-4.9031 56.85-4.9031 56.85s8e-5 38.429 4.9031 56.85c2.697 10.163 10.65 18.164 20.747 20.883 18.3 4.934 91.682 4.934 91.682 4.934s73.383 4e-5 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.9037-56.85 4.9037-56.85s3.1e-4 -38.431-4.9037-56.85l6e-4 -6.05e-4c-2.699-10.162-10.65-18.165-20.748-20.881-18.299-4.936-91.682-4.9358-91.682-4.9358zm-24 47.775 61.333 34.894-61.333 34.89z" /></svg>
                    </a>
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5">
                        © 2023 Omar Rahman. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
