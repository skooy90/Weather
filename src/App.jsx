import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './components/Header/Header';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ContentManagement from './pages/admin/ContentManagement';
import CommentManagement from './pages/admin/CommentManagement';

const lightTheme = {
  background: '#f5f5f5',
  text: '#333333',
  primary: '#4299e1',
  secondary: '#ffffff',
  border: '#e2e8f0',
  cardBackground: '#ffffff',
  inputBackground: '#ffffff',
  buttonText: '#ffffff',
};

const darkTheme = {
  background: '#1a202c',
  text: '#ffffff',
  primary: '#4299e1',
  secondary: '#2d3748',
  border: '#4a5568',
  cardBackground: '#2d3748',
  inputBackground: '#4a5568',
  buttonText: '#ffffff',
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-top: 80px;
`;

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <ThemeProvider theme={lightTheme}>
          <AppContainer>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/content/:id" element={<ContentDetail />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute requireAdmin>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contents"
                  element={
                    <ProtectedRoute requireAdmin>
                      <ContentManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/comments"
                  element={
                    <ProtectedRoute requireAdmin>
                      <CommentManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainContent>
          </AppContainer>
        </ThemeProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;