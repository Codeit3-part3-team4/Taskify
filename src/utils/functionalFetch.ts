import { getRequestCookies } from '@/api/AuthApi';

class FunctionalFetch {
  private init?: RequestInit;

  // 토큰 데이터만 처리 가능.. 다른 옵션들은 서버 컴포넌트와 클라이언트 컴포넌트와 연동할 방법 고려해야함
  public setOptions(newInit: RequestInit) {
    this.init = { ...newInit };
  }

  public async fetch(url: string, newInit?: RequestInit) {
    let isAuthField = true;
    if (typeof this.init?.headers === 'undefined') {
      isAuthField = false;
    } else {
      if (!('Authorization' in this.init?.headers || {})) {
        isAuthField = false;
      }
    }

    if (!isAuthField) {
      const token = await getRequestCookies('accessToken');
      if (token && token.value) {
        this.init = {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        };
      } else {
        const { cookies } = require('next/headers');
        const token = await cookies().get('accessToken');
        if (token) {
          this.init = {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          };
        }
      }
    }

    const options = {
      ...this.init,
      ...newInit,
      headers: {
        ...this.init?.headers,
        ...newInit?.headers,
      },
    };
    const res = await fetch(url, options);
    return res;
  }
}

export const authInstance = new FunctionalFetch();
