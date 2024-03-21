import { authInstance } from '@/utils/functionalFetch';
import { json } from 'stream/consumers';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const LOCAL_URL = 'http://localhost:3000';

export interface UserValues {
  accessToken: string;
  user: {
    createdAt: string;
    email: string;
    id: number;
    nickname: string;
    profileImageUrl: string;
    updatedAt: string;
  };
}

// 로그인
export const loginApi = async (userValues: UserValues) => {
  const res = await fetch(`${BASE_URL}/3-4/auth/login`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userValues),
  })
    .then(res => res.json())
    .then(data => {
      if (data.accessToken) {
        return data;
      } else {
        alert(data.message);
      }
    });

  console.log('로그인 성공', res);
  return res;
};

// 비밀번호 변경
export const changePasswordApi = async (newPasswordValue: string) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/auth/password`, {
      method: 'PUT',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPasswordValue),
    })
    .then(res => {
      if (res.ok) {
        console.log('비밀번호api 변경 성공');
      } else if (res.status === 400) {
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
};

// request router handler
export const postRequestCookies = async (key: string, value: string) => {
  const response = await fetch(`${LOCAL_URL}/api/cookies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: key,
      value: value,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });

  return response;
};

export const getRequestCookies = async (key: string) => {
  const response = await fetch(`${LOCAL_URL}/api/cookies?key=${encodeURIComponent(key)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });

  return response;
};
