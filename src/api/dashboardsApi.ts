const BASE_URL = 'https://sp-taskify-api.vercel.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5NzExMDE0LCJpc3MiOiJzcC10YXNraWZ5In0.h8TMK9il9gbWP30rQg0l21SA6DTvw8ozt4ygzit7RYg';
//token 변수에 로그인 시 받은 accessToken을 연결하면 됩니다
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashboardsInf {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: null | number;
}

export const addDashboradApi = async (title: string, color: string) => {
  const res = await fetch(`${BASE_URL}/3-4/dashboards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    body: JSON.stringify({
      title: title,
      color: color,
    }),
  });
  return res;
};

export const getDashboardsByPaginationApi = async (
  page: number,
  size: number,
): Promise<DashboardsInf> => {
  const res = await fetch(
    `${BASE_URL}/3-4/dashboards?navigationMethod=pagination&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return await res.json();
};
