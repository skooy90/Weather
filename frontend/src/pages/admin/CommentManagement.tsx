import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from '../../components/common/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { ActionButton } from '../../components/common/ActionButton';
import Modal from '../../components/Modal';
import { Comment, TableColumn } from '../../types';
import { contentAPI } from '../../api/content';
import { API_URL, API_ENDPOINTS } from '../../config/api';

const CommentManagementContainer = styled.div`
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

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const CommentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Comment>>({
    content: '',
    status: 'active'
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await contentAPI.getAllContents();
        const allComments = response.reduce((acc: Comment[], content) => {
          const contentComments = content.comments.map(comment => ({
            ...comment,
            postTitle: content.title,
            contentId: content._id
          }));
          return [...acc, ...contentComments];
        }, []);
        setComments(allComments);
      } catch (err) {
        setError('댓글 목록을 불러오는데 실패했습니다.');
        console.error('댓글 목록 조회 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleEdit = (comment: Comment) => {
    setSelectedComment(comment);
    setEditForm({
      content: comment.content,
      status: comment.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (comment: Comment) => {
    setSelectedComment(comment);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedComment || !selectedComment.contentId) return;

    try {
      await contentAPI.deleteComment(selectedComment.contentId, selectedComment.id);
      setComments(comments.filter(comment => comment.id !== selectedComment.id));
      setIsDeleteModalOpen(false);
      setSelectedComment(null);
    } catch (err) {
      setError('댓글 삭제에 실패했습니다.');
      console.error('댓글 삭제 에러:', err);
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComment || !selectedComment.contentId) return;

    try {
      const updatedComment = await contentAPI.updateComment(
        selectedComment.contentId,
        selectedComment.id,
        editForm
      );
      setComments(comments.map(comment => 
        comment.id === selectedComment.id ? updatedComment : comment
      ));
      setIsEditModalOpen(false);
      setSelectedComment(null);
    } catch (err) {
      setError('댓글 수정에 실패했습니다.');
      console.error('댓글 수정 에러:', err);
    }
  };

  const columns: TableColumn<Comment>[] = [
    { key: 'content', label: '내용' },
    { key: 'author', label: '작성자' },
    { key: 'postTitle', label: '게시글' },
    { key: 'createdAt', label: '작성일' },
    { key: 'status', label: '상태' },
    {
      key: 'id',
      label: '작업',
      render: (comment) => (
        <>
          <ActionButton
            onClick={() => handleEdit(comment)}
            icon={<FaEdit />}
            label="수정"
            variant="edit"
          />
          <ActionButton
            onClick={() => handleDelete(comment)}
            icon={<FaTrash />}
            label="삭제"
            variant="delete"
          />
        </>
      )
    }
  ];

  const filteredComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (comment.postTitle?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CommentManagementContainer>
      <Header>
        <Title>댓글 관리</Title>
      </Header>

      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="댓글 검색..."
      />

      <Table
        columns={columns}
        data={filteredComments}
        keyField="id"
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="댓글 삭제"
        onConfirm={confirmDelete}
        confirmText="삭제"
        cancelText="취소"
      >
        <p>정말로 이 댓글을 삭제하시겠습니까?</p>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="댓글 수정"
        showFooter={false}
      >
        <form onSubmit={handleEditSubmit}>
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
              <option value="active">활성</option>
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
    </CommentManagementContainer>
  );
};

export default CommentManagement; 