const BASE_URL = 'https://sp-taskify-api.vercel.app';

export interface UserValues {
  email: string;
  password: string;
}

// 로그인
export const loginApi = async (userValues: UserValues) => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/auth/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues),
    });
    const data = await res.json();

    console.log('서버에서 받은 데이터:', data);
    if (res.status === 201) {
      // 액세스토큰 로컬스토리지에 저장
      localStorage.setItem('accessToken', data.accessToken);
    } else {
      alert(data.message);
    }

    return res;
  } catch (error) {
    console.log(res.status);
    console.error('로그인 에러:', error);
    return res;
  }
};
