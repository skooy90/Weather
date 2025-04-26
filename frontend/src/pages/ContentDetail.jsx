import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { contentApi } from '../services/api';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContentHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const CommentSection = styled.div`
  margin-top: 3rem;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
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

const CommentsList = styled.div`
  margin-top: 2rem;
`;

const Comment = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CommentContent = styled.div`
  margin-bottom: 0.5rem;
`;

const CommentDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await contentApi.getContentById(id);
        setContent(response.data);
        setError(null);
      } catch (err) {
        setError('컨텐츠를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setCommentError('댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await contentApi.addComment(id, {
        content: newComment,
        author: '현재 사용자', // 실제로는 로그인한 사용자 정보 사용
      });
      setContent(response.data);
      setNewComment('');
      setCommentError('');
    } catch (err) {
      setCommentError('댓글 작성 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        const response = await contentApi.deleteComment(id, commentId);
        setContent(response.data);
      } catch (err) {
        console.error('댓글 삭제 중 오류:', err);
      }
    }
  };

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!content) {
    return <Error>컨텐츠를 찾을 수 없습니다.</Error>;
  }

  return (
    <DetailContainer>
      <ContentHeader>
        <Title>{content.title}</Title>
        <MetaInfo>
          <span>작성자: {content.author}</span>
          <span>작성일: {new Date(content.createdAt).toLocaleDateString()}</span>
        </MetaInfo>
      </ContentHeader>
      
      <Image src={content.image} alt={content.title} />
      
      <Content dangerouslySetInnerHTML={{ __html: content.content }} />
      
      <ContentFooter>
        <ActionButton>
          <FaHeart /> 좋아요 {content.likes}
        </ActionButton>
        <ActionButton>
          <FaComment /> 댓글 {content.comments.length}
        </ActionButton>
        <ActionButton>
          <FaShare /> 공유
        </ActionButton>
      </ContentFooter>

      <CommentSection>
        <CommentTitle>댓글</CommentTitle>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          {commentError && <ErrorMessage>{commentError}</ErrorMessage>}
          <CommentButton type="submit">댓글 작성</CommentButton>
        </CommentForm>
        
        <CommentList>
          {content.comments.map((comment) => (
            <CommentItem key={comment._id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </CommentDate>
                <DeleteButton onClick={() => handleCommentDelete(comment._id)}>
                  삭제
                </DeleteButton>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </CommentSection>
    </DetailContainer>
  );
};

export default ContentDetail; 