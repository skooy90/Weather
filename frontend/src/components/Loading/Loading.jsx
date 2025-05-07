import React from 'react';

const Loading = ({ children }) => (
  <div style={{ color: '#3182ce', textAlign: 'center', marginTop: '1rem' }}>
    {children || '로딩 중...'}
  </div>
);

export default Loading; 