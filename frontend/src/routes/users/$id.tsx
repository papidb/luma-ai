import { postsQueryOptions } from "@/domains/posts/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, X } from "lucide-react";

import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({ message: "Invalid email address" }).min(1),
});

export const Route = createFileRoute("/users/$id")({
  component: RouteComponent,
  loader(ctx) {
    return ctx.context.queryClient.ensureQueryData(
      postsQueryOptions(ctx.params.id)
    );
  },
  validateSearch: (search) => userSchema.parse(search),
});

function RouteComponent() {
  const params = Route.useParams();
  const postsQuery = useSuspenseQuery(postsQueryOptions(params.id));
  const posts = postsQuery.data;
  const user = Route.useSearch();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Navigation */}
      <Link
        to={"/"}
        className="inline-flex items-center text-gray-600 mb-8 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Link>

      {/* User Profile */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          {user.name}
        </h1>
        <div className="text-gray-500 text-sm">
          {user.email} • {posts.length} {posts.length > 1 ? "Posts" : "Post"}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Post Card */}
        <div className="border border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center text-gray-400">
            <Plus className="w-6 h-6 mb-2" />
            <span>New Post</span>
          </div>
        </div>

        {/* Post Cards */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-6 relative hover:shadow-md transition-shadow"
          >
            <X className="w-4 h-4 text-gray-400 absolute top-4 right-4" />
            <h2 className="font-medium text-gray-900 mb-4">{post.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-4">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
