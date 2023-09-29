import { Links, Meta, Outlet, Scripts, LiveReload } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en-US">
      <head>
        <title>React App Test</title>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A test app to display BBQ Team's Premier Data"></meta>
        <Links />
      </head>
      <body>
        <h1>Hello world!!!!!!!</h1>
        <h2>Honestly...</h2>
        <h3>This is pretty cool!</h3>
        <h4>I don't really get why we are getting smaller</h4>
        <h5>But I guess its okay</h5>
        <h6>last line :)</h6>
        <h7>Wait, why is there no h7???</h7>
        <Outlet />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
