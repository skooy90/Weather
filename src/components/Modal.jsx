import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #4a5568;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2d3748;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const ConfirmButton = styled(Button)`
  background-color: #4299e1;
  color: white;
  border: none;

  &:hover {
    background-color: #3182ce;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;

  &:hover {
    background-color: #edf2f7;
  }
`;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  showFooter = true
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        <ModalBody>{children}</ModalBody>
        {showFooter && (
          <ModalFooter>
            <CancelButton onClick={onClose}>{cancelText}</CancelButton>
            {onConfirm && (
              <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 