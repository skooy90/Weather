import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ContentHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 1rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

export const ContentFooter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #e2e8f0;
  }
`;

export const CommentSection = styled.div`
  margin-top: 3rem;
`;

export const CommentTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-bottom: 0.5rem;
`;

export const CommentButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CommentList = styled.div`
  margin-top: 2rem;
`;

export const CommentItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const CommentDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentContent = styled.div`
  margin-bottom: 0.5rem;
`;

export const LoginPrompt = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: #666;
`;

export const LoginLink = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #0056b3;
  }
`; 