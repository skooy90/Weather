import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { Table } from '../../components/common/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { ActionButton } from '../../components/common/ActionButton';
import Modal from '../../components/Modal';
import { User, TableColumn } from '../../types';
import { userAPI } from '../../api/user';

const API_URL = process.env.VITE_API_URL;
if (!API_URL) throw new Error('VITE_API_URL 환경변수가 설정되어 있지 않습니다.');

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

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({
    username: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await userAPI.getUsers();
        setUsers(response);
      } catch (err) {
        setError('사용자 목록을 불러오는데 실패했습니다.');
        console.error('사용자 목록 조회 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await userAPI.deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError('사용자 삭제에 실패했습니다.');
      console.error('사용자 삭제 에러:', err);
    }
  };

  const handleAddUser = () => {
    // 새 사용자 추가 로직
    console.log('Add new user');
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const updatedUser = await userAPI.updateUser(selectedUser.id, editForm);
      setUsers(users.map(user => 
        user.id === selectedUser.id ? updatedUser : user
      ));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError('사용자 정보 수정에 실패했습니다.');
      console.error('사용자 수정 에러:', err);
    }
  };

  const columns: TableColumn<User>[] = [
    { key: 'username', label: '사용자명' },
    { key: 'email', label: '이메일' },
    { key: 'role', label: '역할' },
    { key: 'joinDate', label: '가입일' },
    { key: 'status', label: '상태' },
    {
      key: 'id',
      label: '작업',
      render: (user) => (
        <>
          <ActionButton
            onClick={() => handleEdit(user)}
            icon={<FaEdit />}
            label="수정"
            variant="edit"
          />
          <ActionButton
            onClick={() => handleDelete(user)}
            icon={<FaTrash />}
            label="삭제"
            variant="delete"
          />
        </>
      )
    }
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserManagementContainer>
      <Header>
        <Title>사용자 관리</Title>
        <ActionButton
          onClick={handleAddUser}
          icon={<FaUserPlus />}
          label="새 사용자 추가"
          variant="add"
        />
      </Header>

      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="사용자 검색..."
      />

      <Table
        columns={columns}
        data={filteredUsers}
        keyField="id"
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="사용자 삭제"
        onConfirm={confirmDelete}
        confirmText="삭제"
        cancelText="취소"
      >
        <p>정말로 {selectedUser?.username} 사용자를 삭제하시겠습니까?</p>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="사용자 정보 수정"
        showFooter={false}
      >
        <form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>사용자명</Label>
            <FormInput
              type="text"
              name="username"
              value={editForm.username}
              onChange={handleEditFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <FormInput
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>역할</Label>
            <Select
              name="role"
              value={editForm.role}
              onChange={handleEditFormChange}
            >
              <option value="user">일반 사용자</option>
              <option value="admin">관리자</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>상태</Label>
            <Select
              name="status"
              value={editForm.status}
              onChange={handleEditFormChange}
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
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
    </UserManagementContainer>
  );
};

export default UserManagement; 