import { authInstance } from '@/utils/functionalFetch';

const API_URL = 'https://sp-taskify-api.vercel.app';

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSignUp {
  id?: number;
  email: string;
  password: string;
  nickname: string;
  pwCheck: string;
}

export interface UpdateUserInfo {
  email?: string;
  nickname?: string;
  profileImageUrl?: string | null;
}

// 회원 가입
export const signupApi = async (newUserValues: UserSignUp) => {
  try {
    const res = await fetch(`${API_URL}/3-4/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserValues),
    });

    if (res.ok) {
      const data = await res.json();
    } else if (res.status === 409) {
      console.log('409에러');
    } else {
      console.log('다른 상태 오류');
    }

    return res;
  } catch (error) {
    console.error('회원가입 에러:', error);
  }
};

// 내 정보 조회
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const res = await authInstance.fetch(`${API_URL}/3-4/users/me`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error('계정 api 페이지 에러:', error);
    throw error;
  }
};

// 유저 정보 수정
export const updateUserInfoApi = async (updateUserValues: UpdateUserInfo) => {
  try {
    const res = await authInstance.fetch(`${API_URL}/3-4/users/me`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(updateUserValues),
    });
    if (res.ok) {
      console.log('유저 정보 수정 도착');
    }
  } catch (error) {
    console.error('계정 api 페이지 수정 에러:', error);
  }
};

// 프로필 이미지 업로드
export const updateUserProfileImgApi = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  console.log('데이터확인 : ' + JSON.stringify(imageFile));
  try {
    authInstance.clearContentType();
    const res = await authInstance.fetch(`${API_URL}/3-4/users/me/image`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`프로필 이미지 업로드 실패', ${res.status}`);
    }

    console.log('프로필 이미지 업로드 api 실행', imageFile);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('프로필 api 에러:', error);
  }
};
