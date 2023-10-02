import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts
} from "@remix-run/react";

import ascendant1 from "../public/images/competitive/rank/19.png"

export default function App() {
    return (
        <html>
            <head>
                <link
                    rel="icon"
                    href="data:image/x-icon;base64,AA"
                />
                <Meta />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Links />
            </head>
            <body>
                <h1>Hello world!</h1>
                <img src={ascendant1}></img>
                <Outlet />
                
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
