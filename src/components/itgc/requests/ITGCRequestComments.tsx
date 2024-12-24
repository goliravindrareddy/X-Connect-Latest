import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import type { Comment } from '../../../types';

interface ITGCRequestCommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function ITGCRequestComments({ comments, onAddComment }: ITGCRequestCommentsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
      setIsAdding(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="p-1 hover:bg-gray-100 rounded flex items-center gap-1"
        title="View/Add comments"
      >
        <MessageSquare className="h-4 w-4 text-gray-600" />
        {comments.length > 0 && (
          <span className="text-sm text-gray-600">{comments.length}</span>
        )}
      </button>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-8 right-0 z-10 bg-white rounded-lg shadow-lg p-4 w-80"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
            rows={3}
            placeholder="Add a comment..."
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}