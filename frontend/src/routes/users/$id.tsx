import { Loading } from "@/components/loading";
import { NewPostCard } from "@/components/new-post-card";
import { PostCard } from "@/components/post-card";
import {
  postsQueryOptions,
  useCreatePost,
  useDeletePost,
} from "@/domains/posts/hooks";
import { NewPostModal } from "@/sections/new-post-modal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

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

  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost(params.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublish = (title: string, content: string) => {
    createPostMutation.mutate(
      { title, body: content, user_id: params.id },
      {
        onSuccess: (data) => {
          requestAnimationFrame(() => {
            const postCard = document.getElementById(`post-${data.data.id}`);
            if (postCard) {
              postCard.scrollIntoView({ behavior: "smooth" });
            }
          });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-[43px]">
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
          {user.name} {createPostMutation.isPending ? <Loading /> : null}
        </h1>
        <div className="text-gray-500 text-sm">
          {user.email} • {posts.length} {posts.length > 1 ? "Posts" : "Post"}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Post Card */}
        <NewPostCard onClick={() => setIsModalOpen(true)} />

        {/* Post Cards */}
        {posts.map((post) => (
          <PostCard post={post} key={post.id} onDelete={handleDelete} />
        ))}
      </div>
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}
