import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { Comment } from '../../types';
import { commentAPI } from '../../api/commentAPI';
import ActionButton from '../common/ActionButton';
import { useComment } from '../../contexts/CommentContext';
import { useAuth } from '../../contexts/AuthContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

interface CommentFormProps {
  contentId: string;
  onCommentAdded?: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ contentId }) => {
  const [content, setContent] = useState('');
  const { addComment, state } = useComment();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await addComment({
        contentId,
        content,
        author: user?.username,
      });
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} role="form">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        aria-label="댓글 입력"
      />
      <ActionButton
        disabled={state.loading}
        icon={<FaPaperPlane />}
        label="작성"
        variant="add"
        aria-label="댓글 작성"
        onClick={handleSubmit}
      />
    </Form>
  );
};

export default CommentForm; 