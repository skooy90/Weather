import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </LoadingContainer>
  );
};

export default Loading; 