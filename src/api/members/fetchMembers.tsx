const BASE_URL = 'https://sp-taskify-api.vercel.app/3-4';

export const fetchMembers = async dashboardId => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzEwMDY5MDEzLCJpc3MiOiJzcC10YXNraWZ5In0.7lmGxSaRxS_duLaTSYlBdS1G6ppDq6vs0gwx7RC1RGY';

  try {
    const response = await fetch(
      `${BASE_URL}/members?page=1&size=20&dashboardId=${dashboardId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('멤버 조회 실패');
    }

    const data = await response.json();
    return data.members;
  } catch (error) {
    console.error('멤버 조회 중 오류 발생:', error);
    throw error;
  }
};

export default fetchMembers;
