const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '3-4';

const token = typeof window !== 'undefined' ? 'accessToken' : null;

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
export const postCardApi = async (teamId = '3-4') => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
export const getCardListApi = async (size: number, cursorId: number, columnId: number) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
export const editCardApi = async (cardId: number) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

// 카드 상세 조회
export const detailCardApi = async (cardId: number) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
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
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
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
