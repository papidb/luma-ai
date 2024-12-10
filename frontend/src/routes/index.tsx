import { usersQueryOptions } from "@/domains/users/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async (opts) =>
    opts.context.queryClient.ensureQueryData(usersQueryOptions()),
});

function RouteComponent() {
  return <div>User "/"!</div>;
}
