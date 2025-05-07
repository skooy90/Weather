import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';
import { Content } from '../../types';
import ActionButton from '../common/ActionButton';
import { contentAPI } from '../../api/contentAPI';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
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
  font-weight: 500;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ContentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Partial<Content>>({
    title: '',
    content: '',
    author: '',
    category: '',
    status: 'draft',
    views: 0,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  const fetchContent = async () => {
    try {
      const data = await contentAPI.getContent(id!);
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await contentAPI.updateContent(id, content as Content);
      } else {
        await contentAPI.createContent(content as Omit<Content, 'id'>);
      }
      navigate('/contents');
    } catch (error) {
      console.error('Error saving content:', error);
      setLoading(false);
    }
  };

  const handleSaveClick = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            name="content"
            value={content.content}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>작성자</Label>
          <Input
            type="text"
            name="author"
            value={content.author}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>카테고리</Label>
          <Input
            type="text"
            name="category"
            value={content.category}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>상태</Label>
          <Select
            name="status"
            value={content.status}
            onChange={handleChange}
            required
          >
            <option value="draft">임시저장</option>
            <option value="published">발행</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <ActionButton
            icon={<FaSave />}
            label="저장"
            variant="edit"
            disabled={loading}
            onClick={handleSaveClick}
          />
          <ActionButton
            icon={<FaTimes />}
            label="취소"
            variant="delete"
            onClick={() => navigate('/contents')}
          />
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default ContentForm; 