import { authInstance } from '@/utils/functionalFetch';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '3-4';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzEwODI5MjkzLCJpc3MiOiJzcC10YXNraWZ5In0.JKf4DY_qCrMyMb-lwyG3a3ilS4bQrD7VkJD5mDzOyfQ';
// //typeof window !== 'undefined' ? 'accessToken' : null;

export interface CreateColumn {
  title: string;
  dashboardId: number;
}

export interface ColumnList {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}
[];

export interface EditColumn {
  title: string;
}

export interface CreateCardImage {
  image: string;
}

// 컬럼 생성
export const createColumnApi = async (title, dashboardId) => {
  const bodyData = {
    title,
    dashboardId,
  };

  const res = await authInstance
    .fetch(`${BASE_URL}/${TEAM_ID}/columns`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error('잘못된 요청입니다.');
      } else if (res.status === 404) {
        throw new Error('대시보드가 존재하지 않습니다.');
      }
    })
    .catch(error => {
      console.error('API 호출 중 오류 발생:', error);
      return null;
    });

  return res;
};

// 컬럼 목록 조회
export const getColumnListApi = async (dashboardId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/${TEAM_ID}/columns/?dashboardId=${dashboardId}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        // Authorization: `Bearer ${token}`,
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

// 컬럼 수정
export const editColumnApi = async (columnId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        // Authorization: `Bearer ${token}`,
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

// 컬럼 삭제
export const deleteColumnApi = async (columnId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        // Authorization: `Bearer ${token}`,
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

// 카드 이미지 업로드
export const uploadCardImage = async (columnId: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const response = await authInstance.fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}/card-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed: ' + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    return null;
  }
};
