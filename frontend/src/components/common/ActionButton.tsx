import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactElement<IconType>;
  label: string;
  variant: 'edit' | 'delete' | 'add';
  disabled?: boolean;
}

const Button = styled.button<{ variant: ActionButtonProps['variant']; disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ variant }) => {
    switch (variant) {
      case 'edit':
        return `
          background-color: #4299e1;
          color: white;
          &:hover {
            background-color: #3182ce;
          }
        `;
      case 'delete':
        return `
          background-color: #f56565;
          color: white;
          &:hover {
            background-color: #e53e3e;
          }
        `;
      case 'add':
        return `
          background-color: #48bb78;
          color: white;
          &:hover {
            background-color: #38a169;
          }
        `;
    }
  }}
`;

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label, variant, disabled = false }) => {
  return (
    <Button onClick={onClick} variant={variant} disabled={disabled}>
      {icon}
      {label}
    </Button>
  );
};

export default ActionButton; 