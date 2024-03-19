import { authInstance } from '@/utils/functionalFetch';

const BASE_URL = 'https://sp-taskify-api.vercel.app';

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
export const createColumnApi = async () => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/columns`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
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

// 컬럼 목록 조회
export const getColumnListApi = async (dashboardId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/columns/?dashboardId=${dashboardId}`, {
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

// 컬럼 수정
export const editColumnApi = async (columnId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/columns/${columnId}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
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
    .fetch(`${BASE_URL}/3-4/columns/${columnId}`, {
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

// 카드 이미지 업로드
export const uploadCardImage = async (columnId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/columns/${columnId}/card-image`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};
