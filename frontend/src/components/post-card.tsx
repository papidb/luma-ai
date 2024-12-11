import Delete from "@/assets/icons/delete.svg?react";

export function PostCard({
  post,
  onDelete,
}: {
  post: { id: string; title: string; body: string };
  onDelete: (id: string) => void;
}) {
  return (
    <div
      id={`post-${post.id}`}
      className="border rounded-lg border-grey-border p-6 relative shadow-md hover:shadow-md-strong transition-shadow h-[293px]"
    >
      <Delete
        className="w-6 h-6 absolute top-1 right-1 cursor-pointer"
        onClick={() => onDelete(post.id)}
      />
      <h2 className="font-inter font-medium text-[18px] leading-[20px] text-grey-text mb-4">{post.title}</h2>
      <p className="text-grey-text text-sm line-clamp-9">{post.body}</p>
    </div>
  );
}
