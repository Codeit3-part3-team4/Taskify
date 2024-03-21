const BASE_URL = 'https://sp-taskify-api.vercel.app/3-4';
const token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzEwMDY5MDEzLCJpc3MiOiJzcC10YXNraWZ5In0.7lmGxSaRxS_duLaTSYlBdS1G6ppDq6vs0gwx7RC1RGY';
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';

interface CardData {
  assigneeUserId: number;
  dashboardId?: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

interface CardDetails {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// 카드 생성
export const createCards = async (cardData: CardData): Promise<CardDetails> => {
  try {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

// 카드 상세 조회
export const searchCards = async (cardId: number): Promise<CardDetails> => {
  try {
    const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const cardDetails = await response.json();
    return cardDetails;
  } catch (error) {
    console.error('카드 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

// 카드 수정
export const updateCards = async (cardId: number, cardData: CardData): Promise<CardDetails> => {
  try {
    const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error('API 호출 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('카드 수정 중 오류 발생:', error);
    throw error;
  }
};

// 카드 삭제
export const deleteCards = async (cardId: number): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Delete card failed');
  }
  return true;
};

// 카드 목록 조회
export const searchCardlist = async (columnId: number): Promise<{ cursorId: number; totalCount: number; cards: CardDetails[] }> => {
  const response = await fetch(`${BASE_URL}/cards?columnId=${columnId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Cards fetch failed');
  }
  return response.json();
};
