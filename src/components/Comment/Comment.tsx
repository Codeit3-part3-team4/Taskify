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

interface Props {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const Comments = ({ cardId, columnId, dashboardId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments: commentsData } = await fetchComments(cardId);

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

    const createdComment = await createComment({
      content: newCommentContent,
      cardId,
      columnId,
      dashboardId,
    });
    setComments(prev => [...prev, createdComment]);
    setNewCommentContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const startEdit = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setEditContent('');
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
        <textarea
          className="input input-bordered w-full h-24"
          value={newCommentContent}
          onChange={e => setNewCommentContent(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="댓글 작성하기"
        />
        <button className="absolute w-20 right-10 bottom-3 btn-sm bg-primary-BASIC rounded-md text-white" onClick={handleAddComment}>
          입력
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {comments.map(comment => (
          <li key={comment.id} className="flex items-start space-x-3">
            {comment.author.profileImageUrl ? (
              <img
                src={comment.author.profileImageUrl}
                alt="Author"
                className="w-10 h-10 rounded-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full  bg-blue-300 flex items-center justify-center text-white">
                {comment.author.nickname.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="font-semibold">{comment.author.nickname}</h4>
              {editCommentId === comment.id ? (
                <div>
                  <input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} className="input input-bordered" autoFocus />
                  <div className="flex space-x-2 mt-2">
                    <button className="btn-xs bg-primary-BASIC rounded-md text-white" onClick={() => handleEditComment(comment.id, editContent)}>
                      저장
                    </button>
                    <button className="btn btn-xs text-gray-400" onClick={cancelEdit}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p onClick={() => startEdit(comment)}>{comment.content}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="btn-xs bg-primary-BASIC rounded-md text-white" onClick={() => startEdit(comment)}>
                      수정
                    </button>
                    <button className="btn-xs bg-red-400 rounded-md text-white" onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
