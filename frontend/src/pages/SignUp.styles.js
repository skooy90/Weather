import styled from 'styled-components';

export const SignUpContainer = styled.div`
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

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
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

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const EmailDomainSelect = styled.select`
  padding: 1.2rem;
  border: 1px solid #eaeaea;
  border-radius: 2rem;
  background: #fff;
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

export const ErrorMessage = styled.p`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
`;

export const SuccessMessage = styled.p`
  color: #38a169;
  text-align: center;
  margin-top: 1rem;
`;

export const CheckButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`; 