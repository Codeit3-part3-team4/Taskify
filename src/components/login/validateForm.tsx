const validateForm = (newUserValues: { email: string; nickname: string; password: string; pwCheck: string }) => {
  let isValid = true;
  const newErrors = {
    email: '',
    password: '',
    nickname: '',
    pwCheck: '',
  };

  const emailCheck = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  if (!newUserValues.email || !emailCheck.test(newUserValues.email)) {
    newErrors.email = '이메일 형식으로 작성해 주세요.';
    isValid = false;
  }

  // if (newUserValues.nickname.length < 1) {
  //   newErrors.nickname = '닉네임을 입력해 주세요.';
  // } else if (newUserValues.nickname.length > 10) {
  //   newErrors.nickname = '열 자 이하로 작성해 주세요.';
  // }

  // if (newUserValues.password.length < 8) {
  //   newErrors.password = '8자 이상 입력해 주세요.';
  //   isValid = false;
  // }

  if (newUserValues.password !== newUserValues.pwCheck) {
    newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
  }

  return {
    newErrors,
    isValid,
  };
};

export default validateForm;
