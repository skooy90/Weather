const React = require('react');
const { Routes, Route } = require('react-router-dom');
const styled = require('styled-components');
const { ThemeProvider } = require('styled-components');
const { AuthProvider } = require('./context/AuthContext.jsx');
const { ThemeProvider: CustomThemeProvider } = require('./context/ThemeContext');
const ProtectedRoute = require('./components/ProtectedRoute');
const Home = require('./pages/Home');
const ContentDetail = require('./pages/ContentDetail');
const SignUp = require('./pages/SignUp');
const Login = require('./pages/Login');
const Header = require('./components/Header/Header');
const AdminDashboard = require('./pages/admin/AdminDashboard');
const UserManagement = require('./pages/admin/UserManagement');
const ContentManagement = require('./pages/admin/ContentManagement');
const CommentManagement = require('./pages/admin/CommentManagement');

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

module.exports = App;