import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/auth';
import * as S from './Login.styles';

interface LoginCredentials {
  userId: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userId: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authLogin(credentials.userId, credentials.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="text"
          name="userId"
          placeholder="아이디"
          value={credentials.userId}
          onChange={handleChange}
          required
        />
        <S.Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </S.Button>
      </S.Form>
    </S.LoginContainer>
  );
};

export default Login; 