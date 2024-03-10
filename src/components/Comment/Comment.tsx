import React, { useState, useEffect } from 'react';
// API 함수들이 정의된 파일을 임포트
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from '../../api/comments/fetchComments';

const Comments = ({ cardId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(cardId);
        setComments(data.comments || []); // API 응답에 따라 조정 필요
      } catch (error) {
        console.error('댓글 로딩 실패:', error);
      }
    };

    loadComments();
  }, [cardId]);

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) return;
    try {
      const newComment = await createComment(
        newCommentContent,
        cardId,
        /* columnId */ 0,
        /* dashboardId */ 0,
      );
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
      setComments(
        comments.map(comment =>
          comment.id === commentId
            ? { ...comment, content: newContent }
            : comment,
        ),
      );
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
    <div>
      <h3>댓글</h3>
      <input
        type="text"
        value={newCommentContent}
        onChange={e => setNewCommentContent(e.target.value)}
        placeholder="댓글 추가..."
      />
      <button onClick={handleAddComment}>입력</button>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.content}
            <button onClick={() => handleEditComment(comment.id)}>수정</button>
            <button onClick={() => handleDeleteComment(comment.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
