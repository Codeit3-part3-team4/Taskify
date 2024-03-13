const BASE_URL = 'https://sp-taskify-api.vercel.app';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyMCwidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5OTkyNTU3LCJpc3MiOiJzcC10YXNraWZ5In0.K1rM2R-ywv-P73rUvYWw1WyWfzyk3_vMe8ZS2_84Y4c';
// process.env.REACT_APP_TOKEN;

export interface CardList {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
[];

export const getCardListApi = async () =>
  // size: number,
  // cursorId: number,
  // columnId: number,
  {
    const res = await fetch(`${BASE_URL}/3-4/cards?size=10&columnId=15764`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    return res.json();
  };
