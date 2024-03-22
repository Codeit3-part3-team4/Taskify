import React, { useState, useEffect } from 'react';
import { createComment, deleteComment, fetchComments, updateComment } from '@/api/commentsApi';

interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface Comment {
  id: number;
  content: string;
  cardId: number;
  author: Author;
}

const Comments = ({ cardId, columnId, dashboardId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments: commentsData, cursorId } = await fetchComments(cardId);

        if (Array.isArray(commentsData)) {
          setComments(commentsData);
        } else {
          console.error('Fetched comments data is not an array:', commentsData);
          setComments([]);
        }
      } catch (error) {
        console.error('Failed to load comments:', error);
        setComments([]);
      }
    };

    loadComments();
  }, [cardId]);

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) return;
    const createdComment = await createComment({ content: newCommentContent, cardId, columnId, dashboardId });
    setComments(prev => [...prev, createdComment]);
    setNewCommentContent('');
  };

  const startEdit = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditComment = async (commentId: number, content: string) => {
    if (!content.trim()) return;
    await updateComment(commentId, content);
    setComments(comments.map(comment => (comment.id === commentId ? { ...comment, content } : comment)));
    setEditCommentId(null);
    setEditContent('');
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-2 font-semibold">댓글</h3>
      <div className="flex flex-col items-end relative">
        <input
          type="text"
          className="input input-bordered w-full h-24 text-sm"
          value={newCommentContent}
          onChange={e => setNewCommentContent(e.target.value)}
          placeholder="댓글 작성하기"
        />
        <button className="absolute w-20 right-10 bottom-3 btn btn-sm btn-outline border-gray-300 text-primary text-sm" onClick={handleAddComment}>
          입력
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {comments.map(comment => (
          <li key={comment.id} className="flex items-start space-x-3">
            <img src={comment.author.profileImageUrl || '/images/crown-icon.svg'} alt="Author" className="w-8 h-8 rounded-full" />
            <div>
              <h4 className="text-sm font-semibold">{comment.author.nickname}</h4>
              {editCommentId === comment.id ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  onBlur={() => handleEditComment(comment.id, editContent)} // onBlur를 사용하여 수정 완료 처리
                  className="input input-bordered"
                  autoFocus
                />
              ) : (
                <p onClick={() => startEdit(comment)} className="text-sm">
                  {comment.content}
                </p> // 클릭하여 수정 모드 진입
              )}
              <div className="flex space-x-2 mt-2">
                {editCommentId !== comment.id && (
                  <button className="btn btn-xs btn-outline btn-accent" onClick={() => startEdit(comment)}>
                    수정
                  </button>
                )}
                <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDeleteComment(comment.id)}>
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
