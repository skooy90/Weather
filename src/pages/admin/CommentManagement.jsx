import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { contentApi } from '../../services/api';

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

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f7fafc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f7fafc;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  color: #4a5568;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #2d3748;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const EditButton = styled(ActionButton)`
  background-color: #4299e1;
  color: white;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f56565;
  color: white;
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

const CommentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 모달 관련 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    content: '',
    status: ''
  });

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await contentApi.getAllContents();
        const allComments = response.data.reduce((acc, content) => {
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (comment) => {
    setSelectedComment(comment);
    setEditForm({
      content: comment.content,
      status: comment.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (comment) => {
    setSelectedComment(comment);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await contentApi.deleteComment(selectedComment.contentId, selectedComment._id);
      setComments(comments.filter(comment => comment._id !== selectedComment._id));
      setIsDeleteModalOpen(false);
      setSelectedComment(null);
    } catch (err) {
      setError('댓글 삭제에 실패했습니다.');
      console.error('댓글 삭제 에러:', err);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await contentApi.updateComment(
        selectedComment.contentId,
        selectedComment._id,
        editForm
      );
      setComments(comments.map(comment => 
        comment._id === selectedComment._id
          ? { ...comment, ...editForm }
          : comment
      ));
      setIsEditModalOpen(false);
      setSelectedComment(null);
    } catch (err) {
      setError('댓글 수정에 실패했습니다.');
      console.error('댓글 수정 에러:', err);
    }
  };

  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <CommentManagementContainer>
        <div>로딩 중...</div>
      </CommentManagementContainer>
    );
  }

  if (error) {
    return (
      <CommentManagementContainer>
        <div style={{ color: 'red' }}>{error}</div>
      </CommentManagementContainer>
    );
  }

  return (
    <CommentManagementContainer>
      <Header>
        <Title>댓글 관리</Title>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="댓글 검색..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchButton>
          <FaSearch /> 검색
        </SearchButton>
      </SearchBar>

      <CommentTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>댓글 내용</TableHeaderCell>
            <TableHeaderCell>작성자</TableHeaderCell>
            <TableHeaderCell>게시글</TableHeaderCell>
            <TableHeaderCell>작성일</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
            <TableHeaderCell>관리</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredComments.map(comment => (
            <TableRow key={comment._id}>
              <TableCell>{comment.content}</TableCell>
              <TableCell>{comment.author}</TableCell>
              <TableCell>{comment.postTitle}</TableCell>
              <TableCell>{new Date(comment.createdAt).toLocaleString()}</TableCell>
              <TableCell>{comment.status}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEdit(comment)}>
                  <FaEdit /> 수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(comment)}>
                  <FaTrash /> 삭제
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </CommentTable>

      {/* 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="댓글 수정"
      >
        <form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>댓글 내용</Label>
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
              <option value="게시">게시</option>
              <option value="숨김">숨김</option>
              <option value="삭제">삭제</option>
            </Select>
          </FormGroup>
          <button type="submit">저장</button>
        </form>
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="댓글 삭제"
      >
        <p>정말로 이 댓글을 삭제하시겠습니까?</p>
        <button onClick={confirmDelete}>삭제</button>
        <button onClick={() => setIsDeleteModalOpen(false)}>취소</button>
      </Modal>
    </CommentManagementContainer>
  );
};

export default CommentManagement; 