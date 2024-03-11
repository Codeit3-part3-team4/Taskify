const BASE_URL = 'https://sp-taskify-api.vercel.app';

export const signupApi = async newUserValues => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserValues),
    });

    if (!res.ok) {
      throw new Error('회원가입 실패');
    }

    const data = await res.json();
    console.log('서버에서 받은 데이터:', data);
  } catch (error) {
    console.error('회원가입 에러:', error);
  }
};
