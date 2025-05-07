import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Comment } from '../types';
import { commentAPI } from '../api/commentAPI';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

type CommentAction =
  | { type: 'FETCH_COMMENTS_START' }
  | { type: 'FETCH_COMMENTS_SUCCESS'; payload: Comment[] }
  | { type: 'FETCH_COMMENTS_ERROR'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'UPDATE_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'LIKE_COMMENT'; payload: Comment };

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'FETCH_COMMENTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_COMMENTS_SUCCESS':
      return { ...state, loading: false, comments: action.payload };
    case 'FETCH_COMMENTS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
      };
    case 'LIKE_COMMENT':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    default:
      return state;
  }
};

interface CommentContextType {
  state: CommentState;
  fetchComments: (contentId: string) => Promise<void>;
  addComment: (comment: Partial<Comment>) => Promise<void>;
  updateComment: (id: string, comment: Partial<Comment>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  likeComment: (id: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const fetchComments = useCallback(async (contentId: string) => {
    try {
      dispatch({ type: 'FETCH_COMMENTS_START' });
      const comments = await commentAPI.getComments(contentId);
      dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: comments });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: '댓글을 불러오는데 실패했습니다.' });
    }
  }, []);

  const addComment = useCallback(async (comment: Partial<Comment>) => {
    try {
      const newComment = await commentAPI.createComment(comment);
      dispatch({ type: 'ADD_COMMENT', payload: newComment });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: '댓글 작성에 실패했습니다.' });
    }
  }, []);

  const updateComment = useCallback(async (id: string, comment: Partial<Comment>) => {
    try {
      const updatedComment = await commentAPI.updateComment(id, comment);
      dispatch({ type: 'UPDATE_COMMENT', payload: updatedComment });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: '댓글 수정에 실패했습니다.' });
    }
  }, []);

  const deleteComment = useCallback(async (id: string) => {
    try {
      await commentAPI.deleteComment(id);
      dispatch({ type: 'DELETE_COMMENT', payload: id });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: '댓글 삭제에 실패했습니다.' });
    }
  }, []);

  const likeComment = useCallback(async (id: string) => {
    try {
      const updatedComment = await commentAPI.likeComment(id);
      dispatch({ type: 'LIKE_COMMENT', payload: updatedComment });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: '좋아요 처리에 실패했습니다.' });
    }
  }, []);

  return (
    <CommentContext.Provider
      value={{
        state,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
        likeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context;
}; 