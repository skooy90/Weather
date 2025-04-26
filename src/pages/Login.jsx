import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/auth';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #3182ce;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(credentials);
      if (response.success) {
        authLogin(response.user);
        navigate('/admin');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="id"
          placeholder="아이디"
          value={credentials.id}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default Login; 