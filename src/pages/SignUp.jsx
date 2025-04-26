import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp } from '../utils/api';

const SignUpContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.p`
  color: #38a169;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.a`
  color: #4299e1;
  text-align: center;
  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요';
    } else if (formData.username.length < 4) {
      newErrors.username = '아이디는 4자 이상이어야 합니다';
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요';
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // API 호출 전에 confirmPassword 제거
      const { confirmPassword, ...signUpData } = formData;
      await signUp(signUpData);
      
      setSuccessMessage('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Input
          type="text"
          placeholder="이름"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Input
          type="tel"
          placeholder="전화번호 (예: 010-1234-5678)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '가입 중...' : '가입하기'}
        </SubmitButton>
        <LoginLink to="/login">이미 계정이 있으신가요? 로그인</LoginLink>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp; 