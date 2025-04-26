import React from 'react';
import styled from 'styled-components';

const TableOfContentsContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #edf2f7;
    color: #2b6cb0;
  }
`;

const TableOfContents = ({ items }) => {
  return (
    <TableOfContentsContainer>
      <Title>목차</Title>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Link href={`#${item.id}`}>{item.title}</Link>
          </ListItem>
        ))}
      </List>
    </TableOfContentsContainer>
  );
};

export default TableOfContents; 