import styled from 'styled-components';

export const LoginContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 32px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  padding: 1.2rem;
  border: none;
  border-radius: 2rem;
  background: #eaeaea;
  font-size: 1.2rem;
`;

export const Button = styled.button`
  padding: 1.2rem;
  background-color: #a9c8fa;
  color: #222;
  border: none;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
`; 