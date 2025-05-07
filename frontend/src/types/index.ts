import { ReactNode } from 'react';

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  joinDate: string;
  status: 'active' | 'inactive';
}

// 인증 관련 타입
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// 콘텐츠 관련 타입
export interface Content {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  author: string;
  createdAt: string;
  views: number;
  status: 'published' | 'draft' | 'deleted';
  content: string;
  likes: number;
  comments: Comment[];
  image?: string;
}

export interface ContentRequest {
  title: string;
  category: string;
  subcategory?: string;
  content: string;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  status: 'active' | 'deleted';
  postTitle?: string;
  contentId?: string;
}

export interface CommentRequest {
  content: string;
  contentId: string;
}

// UI 컴포넌트 타입
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (item: T) => ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ActionButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  variant: 'edit' | 'delete' | 'add';
  disabled?: boolean;
}

// 테마 관련 타입
export interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
    warning: string;
  };
}

// API 엔드포인트 타입
export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
  };
  content: {
    list: string;
    detail: (id: string) => string;
    create: string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
  comment: {
    list: (contentId: string) => string;
    create: string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
} 