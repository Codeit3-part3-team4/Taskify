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
export const getUserInfo = async (token: string): Promise<UserInfo> => {
  try {
    const res = await fetch(`${BASE_URL}/3-4/users/me`, {
      method: 'GET',
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
