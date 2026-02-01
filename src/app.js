import React, { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, CircularProgress, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from './styles/theme';
import NavBar from './components/NavBar';
import './app.css';

// Lazy loading des pages pour améliorer les performances
const Home = lazy(() => import('./components/Home'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const RoleSelector = lazy(() => import('./components/RoleSelector'));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const StudentDashboard = lazy(() => import('./components/StudentDashboard'));
const StudentSchoolDashboard = lazy(() => import('./components/StudentSchoolDashboard'));
const ParentDashboard = lazy(() => import('./components/ParentDashboard'));

// Composant de chargement
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
    <CircularProgress />
  </Box>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('role-select');
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserRole(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home onNavigate={setCurrentPage} />
          </Suspense>
        );
      case 'role-select':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <RoleSelector onRoleSelect={handleRoleSelect} />
          </Suspense>
        );
      case 'dashboard':
        if (userRole === 'teacher') {
          return (
            <Suspense fallback={<LoadingFallback />}>
              <TeacherDashboard user={user} />
            </Suspense>
          );
        } else if (userRole === 'student') {
          return (
            <Suspense fallback={<LoadingFallback />}>
              <StudentDashboard user={user} />
            </Suspense>
          );
        } else if (userRole === 'student_school') {
          return (
            <Suspense fallback={<LoadingFallback />}>
              <StudentSchoolDashboard user={user} />
            </Suspense>
          );
        } else if (userRole === 'parent') {
          return (
            <Suspense fallback={<LoadingFallback />}>
              <ParentDashboard user={user} />
            </Suspense>
          );
        }
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard user={user} />
          </Suspense>
        );
      case 'login':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Login 
              onLogin={handleLogin} 
              onSwitchToRegister={() => setCurrentPage('register')}
            />
          </Suspense>
        );
      case 'register':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Register 
              onRegister={handleLogin}
              onSwitchToLogin={() => setCurrentPage('login')}
            />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home onNavigate={setCurrentPage} />
          </Suspense>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <NavBar 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          user={user}
          userRole={userRole}
          onRoleChange={() => setCurrentPage('role-select')}
        />
        {currentPage === 'home' ? (
          renderPage()
        ) : (
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {renderPage()}
          </Container>
        )}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
