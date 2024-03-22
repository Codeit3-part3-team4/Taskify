import { authInstance } from '@/utils/functionalFetch';

const BASE_URL = 'https://sp-taskify-api.vercel.app';

export interface PostCard {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CardList {
  cursorId: number;
  totalCount: number;
  cards: {
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
  }[];
}

export interface EditCard {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface DetailCard {
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
export const postCardApi = async (cardData: PostCard) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/cards`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error('error');
      } else if (res.status === 404) {
        throw new Error('404 not found');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

// 카드 목록 조회
export const getCardListApi = async (size: number, cursorId: number | null, columnId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/cards?size=${size}${cursorId ? `&cursorId=${cursorId}` : ''}&columnId=${columnId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error('404  not found');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

// 카드 수정
export const editCardApi = async (cardId: number, cardData: Partial<EditCard>) => {
  const res = await authInstance.fetch(`${BASE_URL}/3-4/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify(cardData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to update card');
  }
  return await res.json();
};

// 카드 상세 조회
export const detailCardApi = async (cardId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/cards/${cardId}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error('404  not found');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

// 카드 삭제
export const deleteCardApi = async (cardId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/cards/${cardId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        accept: '*/*',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error('404  not found');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};
