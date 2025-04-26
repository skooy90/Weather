import React from 'react';
import styled from 'styled-components';

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentItem = styled.div`
  padding: 1rem;
  background: #f7fafc;
  border-radius: 0.375rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const CommentDate = styled.span`
  font-size: 0.875rem;
  color: #718096;
`;

const CommentContent = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`;

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <CommentListContainer>댓글이 없습니다.</CommentListContainer>;
  }

  return (
    <CommentListContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <CommentHeader>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentDate>
              {new Date(comment.createdAt).toLocaleDateString()}
            </CommentDate>
          </CommentHeader>
          <CommentContent>{comment.content}</CommentContent>
        </CommentItem>
      ))}
    </CommentListContainer>
  );
};

export default CommentList; 