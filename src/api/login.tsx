async function login(email, password) {
  try {
    const response = await fetch(
      'https://sp-taskify-api.vercel.app/3-4/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Access Token:', data.accessToken); // Access Token 출력
    return data.accessToken;
  } catch (error) {
    console.error('Login error:', error);
  }
}

export default login;
