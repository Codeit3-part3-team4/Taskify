const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '3-4';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';

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
export const createColumnApi = async (teamId = '3-4') => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/columns`, {
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

// 컬럼 목록 조회
export const getColumnListApi = async (teamId = '3-4', dashboardId = 4685) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/columns/?${dashboardId}`, {
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

// 컬럼 수정
export const editColumnApi = async (teamId = '3-4', columnId = 16254) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}`, {
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

// 컬럼 삭제
export const deleteColumnApi = async (teamId = '3-4', columnId = 16254) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}`, {
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

// 카드 이미지 업로드
export const uploadCardImage = async (teamId = '3-4', columnId = 16254) => {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/columns/${columnId}/card-image`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
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
