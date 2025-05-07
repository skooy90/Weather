import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaTrash, FaEdit } from 'react-icons/fa';
import { useComment } from '../../contexts/CommentContext';
import ActionButton from '../common/ActionButton';

const Container = styled.div`
  margin-top: 2rem;
`;

const CommentItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Author = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const CommentDate = styled.span`
  color: #718096;
  font-size: 0.875rem;
`;

const Content = styled.p`
  color: #4a5568;
  margin: 0.5rem 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #718096;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    color: #4299e1;
  }
`;

interface CommentListProps {
  contentId: string;
}

const CommentList: React.FC<CommentListProps> = ({ contentId }) => {
  const { state, fetchComments, deleteComment, likeComment } = useComment();

  useEffect(() => {
    fetchComments(contentId);
  }, [contentId, fetchComments]);

  if (state.loading) {
    return <div>Loading comments...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  return (
    <Container>
      {state.comments.map(comment => {
        const dateStr = isNaN(new Date(comment.createdAt).getTime())
          ? ''
          : new Date(comment.createdAt).toLocaleDateString();
        return (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <Author>{comment.author}</Author>
              <CommentDate>{dateStr}</CommentDate>
            </CommentHeader>
            <Content>{comment.content}</Content>
            <Actions>
              <LikeButton 
                onClick={() => likeComment(comment.id)}
                aria-label={`좋아요 ${((comment as any).likes ?? 0)}개`}
              >
                <FaThumbsUp />
                {(comment as any).likes ?? 0}
              </LikeButton>
              <ActionButton
                icon={<FaEdit />}
                label="수정"
                variant="edit"
                onClick={() => {}}
                aria-label="댓글 수정"
              />
              <ActionButton
                icon={<FaTrash />}
                label="삭제"
                variant="delete"
                onClick={() => deleteComment(comment.id)}
                aria-label="댓글 삭제"
              />
            </Actions>
          </CommentItem>
        );
      })}
    </Container>
  );
};

export default CommentList; 