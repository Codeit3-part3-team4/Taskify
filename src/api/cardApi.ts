import { error } from 'console';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '3-4';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';
// process.env.REACT_APP_TOKEN;

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
  console.log(res);
  return res;
};

// 카드 목록 조회
export const getCardListApi = async (
  size = 5,
  cursorId = 10,
  columnId = 15734,
) => {
  const res = await fetch(
    `${BASE_URL}/${TEAM_ID}/cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    },
  )
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
export const editCardApi = async (teamId = '3-4', cardId = 3725) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
    method: 'PUT',
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
export const detailCardApi = async (teamId = '3-4', cardId = 3725) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
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

// 카드 삭제
export const deleteCardApi = async (teamId = '3-4', cardId = 3744) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/cards/${cardId}`, {
    method: 'DELETE',
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
