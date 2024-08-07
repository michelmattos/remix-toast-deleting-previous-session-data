import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return json(session.data, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Another() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4 space-y-4">
      <h1 className="text-3xl">Next</h1>
      <Link to="/" className="text-blue-500">
        Go back
      </Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
