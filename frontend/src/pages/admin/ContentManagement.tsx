import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Table } from '../../components/common/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { ActionButton } from '../../components/common/ActionButton';
import Modal from '../../components/Modal';
import { Content, TableColumn } from '../../types';
import { contentAPI } from '../../api/content';

const API_URL = process.env.VITE_API_URL || 'http://localhost:10000/api';

const ContentManagementContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const ContentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Content>>({
    title: '',
    category: '',
    content: '',
    status: 'draft'
  });

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await contentAPI.getContents();
        setContents(response);
      } catch (err) {
        setError('콘텐츠 목록을 불러오는데 실패했습니다.');
        console.error('콘텐츠 목록 조회 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContents();
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setEditForm({
      title: content.title,
      category: content.category,
      content: content.content,
      status: content.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (content: Content) => {
    setSelectedContent(content);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedContent) return;

    try {
      await contentAPI.deleteContent(selectedContent.id);
      setContents(contents.filter(content => content.id !== selectedContent.id));
      setIsDeleteModalOpen(false);
      setSelectedContent(null);
    } catch (err) {
      setError('콘텐츠 삭제에 실패했습니다.');
      console.error('콘텐츠 삭제 에러:', err);
    }
  };

  const handleAddContent = () => {
    // 새 콘텐츠 추가 로직
    console.log('Add new content');
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContent) return;

    try {
      const updatedContent = await contentAPI.updateContent(selectedContent.id, editForm);
      setContents(contents.map(content => 
        content.id === selectedContent.id ? updatedContent : content
      ));
      setIsEditModalOpen(false);
      setSelectedContent(null);
    } catch (err) {
      setError('콘텐츠 수정에 실패했습니다.');
      console.error('콘텐츠 수정 에러:', err);
    }
  };

  const columns: TableColumn<Content>[] = [
    { key: 'title', label: '제목' },
    { key: 'category', label: '카테고리' },
    { key: 'author', label: '작성자' },
    { key: 'createdAt', label: '작성일' },
    { key: 'views', label: '조회수' },
    { key: 'status', label: '상태' },
    {
      key: 'id',
      label: '작업',
      render: (content) => (
        <>
          <ActionButton
            onClick={() => handleEdit(content)}
            icon={<FaEdit />}
            label="수정"
            variant="edit"
          />
          <ActionButton
            onClick={() => handleDelete(content)}
            icon={<FaTrash />}
            label="삭제"
            variant="delete"
          />
        </>
      )
    }
  ];

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ContentManagementContainer>
      <Header>
        <Title>콘텐츠 관리</Title>
        <ActionButton
          onClick={handleAddContent}
          icon={<FaPlus />}
          label="새 콘텐츠 추가"
          variant="add"
        />
      </Header>

      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="콘텐츠 검색..."
      />

      <Table
        columns={columns}
        data={filteredContents}
        keyField="id"
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="콘텐츠 삭제"
        onConfirm={confirmDelete}
        confirmText="삭제"
        cancelText="취소"
      >
        <p>정말로 {selectedContent?.title} 콘텐츠를 삭제하시겠습니까?</p>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="콘텐츠 수정"
        showFooter={false}
      >
        <form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>제목</Label>
            <FormInput
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>카테고리</Label>
            <Select
              name="category"
              value={editForm.category}
              onChange={handleEditFormChange}
            >
              <option value="trend">트렌드</option>
              <option value="tech">테크</option>
              <option value="lifestyle">라이프스타일</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <TextArea
              name="content"
              value={editForm.content}
              onChange={handleEditFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>상태</Label>
            <Select
              name="status"
              value={editForm.status}
              onChange={handleEditFormChange}
            >
              <option value="draft">초안</option>
              <option value="published">게시</option>
              <option value="deleted">삭제</option>
            </Select>
          </FormGroup>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              onClick={handleEditSubmit}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaEdit />
              저장
            </button>
            <ActionButton
              onClick={() => setIsEditModalOpen(false)}
              icon={<FaTrash />}
              label="취소"
              variant="delete"
            />
          </div>
        </form>
      </Modal>
    </ContentManagementContainer>
  );
};

export default ContentManagement; 