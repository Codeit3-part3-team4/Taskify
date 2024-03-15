const BASE_URL = 'https://sp-taskify-api.vercel.app';
const token = localStorage.getItem('accessToken');

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 회원 가입
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

// 내 정보 조회
export const getUserInfo = async (token: string): Promise<UserInfo> => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/users/me`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('계정 api 페이지 에러:', error);
    throw error;
  }
};

// 내 정보 수정
export const updateUserInfo = async updateUserValues => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/users/me`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateUserValues),
    });
    console.log(res);
  } catch (error) {
    console.error('계정 api 페이지 수정 에러:', error);
  }
};
