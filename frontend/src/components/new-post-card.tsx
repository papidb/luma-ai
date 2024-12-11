import { Plus } from "lucide-react";

export function NewPostCard() {
  return (
    <div className="border border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex flex-col items-center text-gray-400">
        <Plus className="w-6 h-6 mb-2" />
        <span>New Post</span>
      </div>
    </div>
  );
}
