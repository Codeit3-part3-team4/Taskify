import React, { useState, useEffect } from 'react';
import { fetchComments, createComment, updateComment, deleteComment } from '../../api/comments';

const Comments = ({ cardId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(cardId);
        setComments(data.comments || []);
      } catch (error) {
        console.error('댓글 로딩 실패:', error);
      }
    };

    loadComments();
  }, [cardId]);

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) return;
    try {
      const newComment = await createComment(newCommentContent, cardId, /* columnId */ 0, /* dashboardId */ 0);
      setComments(prevComments => [...prevComments, newComment]);
      setNewCommentContent('');
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  const handleEditComment = async commentId => {
    const newContent = prompt('댓글을 수정하세요:');
    if (!newContent.trim()) return;
    try {
      await updateComment(commentId, newContent);
      setComments(comments.map(comment => (comment.id === commentId ? { ...comment, content: newContent } : comment)));
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDeleteComment = async commentId => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
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
        <button className="absolute w-20  right-10 bottom-3 btn btn-sm btn-outline border-gray-300 text-primary" onClick={handleAddComment}>
          입력
        </button>
      </div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.content}
            <button onClick={() => handleEditComment(comment.id)}>수정</button>
            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
