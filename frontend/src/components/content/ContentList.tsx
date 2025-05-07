import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Content } from '../../types';
import ActionButton from '../common/ActionButton';
import { contentAPI } from '../../api/contentAPI';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
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

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const LinkText = styled(Link)`
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === 'published' ? '#c6f6d5' : '#fed7d7'};
  color: ${(props) => (props.status === 'published' ? '#2f855a' : '#c53030')};
`;

const ContentList: React.FC = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const data = await contentAPI.getContents();
      setContents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contents:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredContents = contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>콘텐츠 목록</Title>
        <ActionButton
          icon={<FaPlus />}
          label="새 콘텐츠"
          variant="add"
          onClick={() => navigate('/contents/new')}
        />
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ActionButton
          icon={<FaSearch />}
          label="검색"
          variant="edit"
          onClick={() => {}}
        />
      </SearchBar>

      <Table>
        <thead>
          <tr>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>카테고리</Th>
            <Th>상태</Th>
            <Th>작성일</Th>
            <Th>수정일</Th>
            <Th>조회수</Th>
            <Th>좋아요</Th>
            <Th>댓글</Th>
          </tr>
        </thead>
        <tbody>
          {filteredContents.map((content) => (
            <Tr
              key={content.id}
              onClick={() => navigate(`/contents/${content.id}`)}
            >
              <Td>{content.title}</Td>
              <Td>{content.author}</Td>
              <Td>{content.category}</Td>
              <Td>
                <StatusBadge status={content.status}>
                  {content.status === 'published' ? '발행' : '임시저장'}
                </StatusBadge>
              </Td>
              <Td>{new Date(content.createdAt).toLocaleDateString()}</Td>
              <Td>{new Date(content.updatedAt).toLocaleDateString()}</Td>
              <Td>{content.views}</Td>
              <Td>{content.likes}</Td>
              <Td>{content.comments.length}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ContentList; 