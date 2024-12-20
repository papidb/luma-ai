import { useState } from "react";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (title: string, content: string) => void;
}

export function NewPostModal({
  isOpen,
  onClose,
  onPublish,
}: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublish(title, content);
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            New Post
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block font-medium text-[18px] leading-[20px] text-gray-700 mb-2.5"
                >
                  Post title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your post a title"
                  className="w-full px-3 py-2 border border-grey-border rounded-md placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block font-medium text-[18px] leading-[20px] text-gray-700 mb-2.5"
                >
                  Post content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write something mind-blowing"
                  rows={8}
                  className="w-full px-3 py-2 border border-grey-border rounded-md placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm border rounded border-gray-200 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
