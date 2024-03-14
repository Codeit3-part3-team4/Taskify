const BASE_URL = 'https://sp-taskify-api.vercel.app';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';

export interface ColumnList {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}
[];

export const getColumnListApi = async () => {
  const res = await fetch(`${BASE_URL}/3-4/columns/?dashboardId=4685`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  return res.json();
};
