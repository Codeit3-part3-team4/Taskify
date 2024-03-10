const BASE_URL = 'https://sp-taskify-api.vercel.app/3-4';

// 댓글 목록 조회
const fetchComments = async (cardId: string) => {
  const response = await fetch(`${BASE_URL}/comments?cardId=${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('댓글 목록을 불러오는 데 실패했습니다.');
  }
  return response.json();
};

type CreateCommentProps = {
  content: string;
  cardId: string;
  columnId: string;
  dashboardId: string;
};

const createComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: CreateCommentProps) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, cardId, columnId, dashboardId }),
  });
  if (!response.ok) {
    throw new Error('댓글을 추가하는 데 실패했습니다.');
  }
  return response.json();
};

// 댓글 수정
const updateComment = async (commentId: string, content: string) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error('댓글을 수정하는 데 실패했습니다.');
  }
  return response.json();
};

// 댓글 삭제
const deleteComment = async (commentId: string, content: string) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('댓글을 삭제하는 데 실패했습니다.');
  }
  return response.json();
};

export { fetchComments, createComment, updateComment, deleteComment };
