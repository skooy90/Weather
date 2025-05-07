import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import * as S from './SignUp.styles';
import { API_URL } from '../config/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    username: '',
    birth: '',
    emailFront: '',
    emailDomain: 'naver.com',
    customDomain: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'userId') {
      setIsIdValid(value.length >= 4);
      if (value !== formData.userId) {
        setIsIdChecked(false);
      }
    }
    if (name === 'emailDomain') {
      setIsCustomDomain(value === 'custom');
      if (value !== 'custom') setFormData(prev => ({ ...prev, customDomain: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.userId || !formData.password || !formData.confirmPassword || !formData.username || !formData.birth || !formData.emailFront || (!isCustomDomain && !formData.emailDomain) || (isCustomDomain && !formData.customDomain)) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isIdChecked) {
      setError('아이디 중복 확인을 해주세요.');
      return;
    }

    const email = `${formData.emailFront}@${isCustomDomain ? formData.customDomain : formData.emailDomain}`;
    try {
      await authAPI.signup({
        userId: formData.userId,
        username: formData.username,
        email,
        password: formData.password,
        birth: new Date(formData.birth).toISOString()
      });
      setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleCheckDuplicate = async () => {
    setError('');
    setSuccess('');
    if (!formData.userId) {
      setError('아이디를 입력하세요.');
      return;
    }
    try {
      const res = await authAPI.checkUserId(formData.userId);
      const available = res?.available;
      if (available === undefined) {
        setError('중복확인 응답이 올바르지 않습니다.');
        setIsIdChecked(false);
        return;
      }
      if (!available) {
        setError('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      } else {
        setSuccess('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      }
    } catch (err) {
      setError(err.message || '중복확인 중 오류가 발생했습니다.');
      setIsIdChecked(false);
    }
  };

  return (
    <S.SignUpContainer>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Label htmlFor="userId">아이디</S.Label>
        <S.Row>
          <S.Input
            id="userId"
            name="userId"
            type="text"
            placeholder="아이디"
            value={formData.userId}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <S.CheckButton 
            type="button" 
            onClick={handleCheckDuplicate}
            disabled={!isIdValid}
            style={{ 
              backgroundColor: isIdValid ? '#007bff' : '#cccccc',
              cursor: isIdValid ? 'pointer' : 'not-allowed'
            }}
          >
            중복확인
          </S.CheckButton>
        </S.Row>
        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
        <S.Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <S.Label htmlFor="username">이름</S.Label>
        <S.Input
          id="username"
          name="username"
          type="text"
          placeholder="이름"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <S.Label htmlFor="birth">생년월일</S.Label>
        <S.Input
          id="birth"
          name="birth"
          type="date"
          placeholder="연도. 월. 일."
          value={formData.birth}
          onChange={handleChange}
          required
        />
        <S.Label>이메일</S.Label>
        <S.Row>
          <S.Input
            name="emailFront"
            type="text"
            placeholder="이메일"
            value={formData.emailFront}
            onChange={handleChange}
            style={{ flex: 2 }}
            required
          />
          <span>@</span>
          {isCustomDomain ? (
            <S.Input
              name="customDomain"
              type="text"
              placeholder="도메인 입력"
              value={formData.customDomain}
              onChange={handleChange}
              style={{ flex: 2 }}
              required
            />
          ) : (
            <S.EmailDomainSelect
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleChange}
              style={{ flex: 2 }}
              required
            >
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
              <option value="custom">직접입력</option>
            </S.EmailDomainSelect>
          )}
        </S.Row>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {success && <S.SuccessMessage>{success}</S.SuccessMessage>}
        <S.Button type="submit">가입하기</S.Button>
      </S.Form>
    </S.SignUpContainer>
  );
};

export default SignUp; 