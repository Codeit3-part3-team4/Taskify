const BASE_URL = 'https://sp-taskify-api.vercel.app';

export const loginApi = async userValues => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues),
    });

    if (!res.ok) {
      throw new Error('로그인 실패');
    }

    const data = await res.json();
    console.log('서버에서 받은 데이터:', data);
  } catch (error) {
    console.error('로그인 에러:', error);
  }
};
