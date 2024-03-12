const BASE_URL = 'https://sp-taskify-api.vercel.app';

export interface UserValues {
  email: string;
  pass;
}

export const loginApi = async userValues => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues),
    });

    const data = await res.json();
    // 액세스토큰 로컬스토리지에 저장
    localStorage.setItem('accessToken', data.accessToken);
    console.log('서버에서 받은 데이터:', data);
  } catch (error) {
    console.error('로그인 에러:', error);
  }
};
