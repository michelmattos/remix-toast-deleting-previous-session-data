import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { getToast } from "~/toast.server";
import "./tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const { toast, headers } = await getToast(request);

  return json({ toast }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) alert(toast?.message);
  }, [toast]);

  return <Outlet />;
}
