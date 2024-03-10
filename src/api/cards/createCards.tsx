const BASE_URL = 'https://sp-taskify-api.vercel.app/3-4';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzEwMDY5MDEzLCJpc3MiOiJzcC10YXNraWZ5In0.7lmGxSaRxS_duLaTSYlBdS1G6ppDq6vs0gwx7RC1RGY';

interface CreateCardData {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export const createCards = async (cardData: CreateCardData) => {
  try {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error('API 호출 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('카드 생성 중 오류 발생:', error);
    throw error;
  }
};
