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

  // .catch(error => {
  //   console.log(error);
  //   return null;
  // });
  console.log('로그인 성공', res);
  localStorage.setItem('accessToken', res.accessToken);
  return res;
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
