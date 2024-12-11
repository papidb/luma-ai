import Add from "@/assets/icons/add-circle.svg?react";

export function NewPostCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="border border-dashed border-grey-border rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-[293px]"
    >
      <div className="flex flex-col items-center text-gray-400 gap gap-y-2">
        <Add />
        <span className="text-sm-semibold text-grey-text">New Post</span>
      </div>
    </div>
  );
}
