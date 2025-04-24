import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';

const UserManagementContainer = styled.div`
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

const AddUserButton = styled.button`
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

const UserTable = styled.table`
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

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      role: '일반 사용자',
      joinDate: '2024-01-01',
      status: '활성'
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      role: '관리자',
      joinDate: '2024-01-02',
      status: '활성'
    }
  ]);

  // 모달 관련 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: '',
    status: ''
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    // 새 사용자 추가 로직
    console.log('Add new user');
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
    // 사용자 정보 업데이트
    setUsers(users.map(user => 
      user.id === selectedUser.id
        ? { ...user, ...editForm }
        : user
    ));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserManagementContainer>
      <Header>
        <Title>사용자 관리</Title>
        <AddUserButton onClick={handleAddUser}>
          <FaUserPlus /> 새 사용자 추가
        </AddUserButton>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="사용자 검색..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchButton>
          <FaSearch /> 검색
        </SearchButton>
      </SearchBar>

      <UserTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>사용자명</TableHeaderCell>
            <TableHeaderCell>이메일</TableHeaderCell>
            <TableHeaderCell>역할</TableHeaderCell>
            <TableHeaderCell>가입일</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
            <TableHeaderCell>관리</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEdit(user)}>
                  <FaEdit /> 수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(user)}>
                  <FaTrash /> 삭제
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="사용자 삭제"
        onConfirm={confirmDelete}
        confirmText="삭제"
      >
        <p>정말로 {selectedUser?.username} 사용자를 삭제하시겠습니까?</p>
        <p>이 작업은 되돌릴 수 없습니다.</p>
      </Modal>

      {/* 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="사용자 정보 수정"
        onConfirm={handleEditSubmit}
        confirmText="저장"
      >
        <form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>사용자명</Label>
            <FormInput
              type="text"
              name="username"
              value={editForm.username}
              onChange={handleEditFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <FormInput
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>역할</Label>
            <Select
              name="role"
              value={editForm.role}
              onChange={handleEditFormChange}
              required
            >
              <option value="">역할 선택</option>
              <option value="일반 사용자">일반 사용자</option>
              <option value="관리자">관리자</option>
            </Select>
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
              <option value="활성">활성</option>
              <option value="비활성">비활성</option>
              <option value="정지">정지</option>
            </Select>
          </FormGroup>
        </form>
      </Modal>
    </UserManagementContainer>
  );
};

export default UserManagement; 