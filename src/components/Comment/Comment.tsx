import React, { useState, FC, useEffect } from 'react';
import { createComment, deleteComment, fetchComments, updateComment } from '@/api/commentsApi';

interface Comment {
  id: number;
  content: string;
}

interface CommentsProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const Comments: FC<CommentsProps> = ({ cardId, columnId, dashboardId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState<string>('');

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const fetchedComments = await fetchComments(cardId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('댓글 목록을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchCommentsData();
  }, [cardId]);

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) return;
    try {
      const createdComment = await createComment({ content: newCommentContent, cardId, columnId, dashboardId });
      setComments(prevComments => [...prevComments, createdComment]);
      setNewCommentContent('');
    } catch (error) {
      console.error('댓글을 추가하는 데 실패했습니다.', error);
    }
  };

  const handleEditComment = async (id: number, newContent: string) => {
    try {
      await updateComment(id, newContent);
      setComments(comments.map(comment => (comment.id === id ? { ...comment, content: newContent } : comment)));
    } catch (error) {
      console.error('댓글을 수정하는 데 실패했습니다.', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('댓글을 삭제하는 데 실패했습니다.', error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3>댓글</h3>
      <div className="flex flex-col items-end relative">
        <input
          type="text"
          className="input input-bordered w-full h-24"
          value={newCommentContent}
          onChange={e => setNewCommentContent(e.target.value)}
          placeholder="댓글 작성하기"
        />
        <button className="absolute w-20 right-10 bottom-3 btn btn-sm btn-outline border-gray-300 text-primary" onClick={handleAddComment}>
          입력
        </button>
      </div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <input type="text" value={comment.content} onChange={e => handleEditComment(comment.id, e.target.value)} />
            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
