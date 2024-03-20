import { getRequestCookies } from '@/api/AuthApi';
import dynamic from 'next/dynamic';

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

    console.log('functional fetch', this.init, isAuthField);
    if (!isAuthField) {
      if (typeof window !== 'undefined') {
        const token = await getRequestCookies('accessToken');
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

    this.init = options;
    const res = fetch(url, options);
    return res;
  }
}

export const authInstance = new FunctionalFetch();
