import { authInstance } from '@/utils/functionalFetch';

const API_URL = 'https://sp-taskify-api.vercel.app';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export interface LoginValues {
  email: string;
  password: string;
}

export interface ChangePw {
  password: string;
  newPassword: string;
}

// 로그인
export const loginApi = async (userValues: LoginValues): Promise<UserValues> => {
  const res = await fetch(`${API_URL}/3-4/auth/login`, {
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
        return data.message;
      }
    });
  return res;
};

// 비밀번호 변경
export const changePasswordApi = async (newPasswordValue: ChangePw) => {
  const res = await authInstance
    .fetch(`${API_URL}/3-4/auth/password`, {
      method: 'PUT',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPasswordValue),
    })
    .then(res => {
      if (res.ok) {
        return res;
      } else if (res.status === 400) {
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};

// request router handler
export const postRequestCookies = async (key: string, value: string) => {
  const response = await fetch(`${BASE_URL}/api/cookies`, {
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
  const response = await fetch(`${BASE_URL}/api/cookies?key=${encodeURIComponent(key)}`, {
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
