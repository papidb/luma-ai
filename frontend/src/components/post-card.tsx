import { Post } from "@/domains/posts/types";
import { X } from "lucide-react";

export function PostCard({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      key={post.id}
      id={`post-${post.id}`}
      className="border rounded-lg p-6 relative hover:shadow-md transition-shadow"
    >
      <X
        className="w-4 h-4 text-gray-400 absolute top-4 right-4"
        onClick={() => onDelete(post.id)}
      />
      <h2 className="font-medium text-gray-900 mb-4">{post.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-4">{post.body}</p>
    </div>
  );
}
