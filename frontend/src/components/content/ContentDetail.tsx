import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { Content, Comment } from '../../types';
import ActionButton from '../common/ActionButton';
import { contentAPI } from '../../api/contentAPI';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const ContentText = styled.div`
  line-height: 1.6;
  color: #2d3748;
  white-space: pre-wrap;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    if (!id) return;
    try {
      const data = await contentAPI.getContent(id);
      setContent(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await contentAPI.deleteContent(id);
      navigate('/contents');
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    if (content) {
      setContent({
        ...content,
        comments: [...content.comments, newComment],
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>Content not found</div>;
  }

  return (
    <Container>
      <Header>
        <Title>{content.title}</Title>
        {user && user.username === content.author && (
          <ButtonGroup>
            <ActionButton
              icon={<FaEdit />}
              label="수정"
              variant="edit"
              onClick={() => navigate(`/contents/${id}/edit`)}
            />
            <ActionButton
              icon={<FaTrash />}
              label="삭제"
              variant="delete"
              onClick={handleDelete}
            />
          </ButtonGroup>
        )}
      </Header>

      <MetaInfo>
        <span>작성자: {content.author}</span>
        <span>카테고리: {content.category}</span>
        <span>상태: {content.status}</span>
        <span>작성일: {new Date(content.createdAt).toLocaleDateString()}</span>
        <span>조회수: {content.views}</span>
      </MetaInfo>

      {content.image && <Image src={content.image} alt={content.title} />}
      <ContentText>{content.content}</ContentText>

      <CommentForm contentId={content.id} onCommentAdded={handleCommentAdded} />
      <CommentList contentId={content.id} />
    </Container>
  );
};

export default ContentDetail; 