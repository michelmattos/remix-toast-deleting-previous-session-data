import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
import { redirectWithSuccess } from "~/toast.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  session.set("previousData", "This was set in home route");

  return json(session.data, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export async function action() {
  return redirectWithSuccess("/next", { message: "This is a toast" });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4 space-y-4">
      <h1 className="text-3xl">Home</h1>
      <Form method="post">
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-2 rounded"
        >
          Submit
        </button>
      </Form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
