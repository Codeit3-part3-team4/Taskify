const BASE_URL = 'https://sp-taskify-api.vercel.app/3-4';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzEwMDY5MDEzLCJpc3MiOiJzcC10YXNraWZ5In0.7lmGxSaRxS_duLaTSYlBdS1G6ppDq6vs0gwx7RC1RGY';

async function fetchColumns(dashboardId) {
  try {
    const response = await fetch(`${BASE_URL}/columns?&dashboardId=${dashboardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch columns.');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching column data:', error);
    throw error;
  }
}
