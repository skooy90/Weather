// 임시 관리자 계정 정보
const adminAccount = {
  id: 'admin',
  password: 'qwe@123',
  role: 'admin',
  name: '관리자'
};

// 로그인 API
export const login = async (credentials) => {
  // 실제 API 호출 대신 임시 구현
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.id === adminAccount.id && credentials.password === adminAccount.password) {
        resolve({
          success: true,
          user: {
            id: adminAccount.id,
            name: adminAccount.name,
            role: adminAccount.role
          }
        });
      } else {
        reject({
          success: false,
          message: '아이디 또는 비밀번호가 일치하지 않습니다.'
        });
      }
    }, 500); // API 호출 지연 시간
  });
};

// 로그아웃 API
export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}; 