import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContentList from './ContentList';
import ContentDetail from './ContentDetail';
import ContentCreate from './ContentCreate';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f7fafc;
`;

const Content: React.FC = () => {
  return (
    <Container>
      <Routes>
        <Route index element={<ContentList />} />
        <Route path="create" element={<ContentCreate />} />
        <Route path=":id" element={<ContentDetail />} />
        <Route path="*" element={<Navigate to="/contents" replace />} />
      </Routes>
    </Container>
  );
};

export default Content; 