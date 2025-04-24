import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';

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

const AddContentButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentTable = styled.table`
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

const ContentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contents, setContents] = useState([
    {
      id: 'trend-1',
      title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
      category: '트렌드',
      author: 'AI 전문가',
      createdAt: '2024-04-23',
      views: 15234,
      status: '게시',
      content: 'ChatGPT-5의 새로운 기능에 대한 상세한 내용...'
    },
    {
      id: 'tech-1',
      title: 'React 19의 새로운 기능',
      category: '테크',
      author: '프론트엔드 개발자',
      createdAt: '2024-04-24',
      views: 11234,
      status: '게시',
      content: 'React 19의 새로운 기능에 대한 상세한 내용...'
    }
  ]);

  // 모달 관련 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    content: '',
    status: ''
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (content) => {
    setSelectedContent(content);
    setEditForm({
      title: content.title,
      category: content.category,
      content: content.content,
      status: content.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (content) => {
    setSelectedContent(content);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setContents(contents.filter(content => content.id !== selectedContent.id));
    setIsDeleteModalOpen(false);
    setSelectedContent(null);
  };

  const handleAddContent = () => {
    // 새 콘텐츠 추가 로직
    console.log('Add new content');
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // 콘텐츠 정보 업데이트
    setContents(contents.map(content => 
      content.id === selectedContent.id
        ? { ...content, ...editForm }
        : content
    ));
    setIsEditModalOpen(false);
    setSelectedContent(null);
  };

  return (
    <ContentManagementContainer>
      <Header>
        <Title>콘텐츠 관리</Title>
        <AddContentButton onClick={handleAddContent}>
          <FaPlus /> 새 콘텐츠 추가
        </AddContentButton>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="콘텐츠 검색..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchButton>
          <FaSearch /> 검색
        </SearchButton>
      </SearchBar>

      <ContentTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>제목</TableHeaderCell>
            <TableHeaderCell>카테고리</TableHeaderCell>
            <TableHeaderCell>작성자</TableHeaderCell>
            <TableHeaderCell>작성일</TableHeaderCell>
            <TableHeaderCell>조회수</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
            <TableHeaderCell>관리</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell>{content.id}</TableCell>
              <TableCell>{content.title}</TableCell>
              <TableCell>{content.category}</TableCell>
              <TableCell>{content.author}</TableCell>
              <TableCell>{content.createdAt}</TableCell>
              <TableCell>{content.views.toLocaleString()}</TableCell>
              <TableCell>{content.status}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEdit(content)}>
                  <FaEdit /> 수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(content)}>
                  <FaTrash /> 삭제
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </ContentTable>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="콘텐츠 삭제"
        onConfirm={confirmDelete}
        confirmText="삭제"
      >
        <p>정말로 "{selectedContent?.title}" 콘텐츠를 삭제하시겠습니까?</p>
        <p>이 작업은 되돌릴 수 없습니다.</p>
      </Modal>

      {/* 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="콘텐츠 수정"
        onConfirm={handleEditSubmit}
        confirmText="저장"
      >
        <form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>제목</Label>
            <FormInput
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>카테고리</Label>
            <Select
              name="category"
              value={editForm.category}
              onChange={handleEditFormChange}
              required
            >
              <option value="">카테고리 선택</option>
              <option value="트렌드">트렌드</option>
              <option value="테크">테크</option>
              <option value="쇼핑">쇼핑</option>
              <option value="푸드">푸드</option>
              <option value="취미">취미</option>
              <option value="가족">가족</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <TextArea
              name="content"
              value={editForm.content}
              onChange={handleEditFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>상태</Label>
            <Select
              name="status"
              value={editForm.status}
              onChange={handleEditFormChange}
              required
            >
              <option value="">상태 선택</option>
              <option value="게시">게시</option>
              <option value="임시저장">임시저장</option>
              <option value="비공개">비공개</option>
            </Select>
          </FormGroup>
        </form>
      </Modal>
    </ContentManagementContainer>
  );
};

export default ContentManagement; 