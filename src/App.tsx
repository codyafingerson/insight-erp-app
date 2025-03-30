import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getAuthUser } from './features/auth/authSlice';

// Public Routes
import LoginPage from './pages/LoginPage';

// Protected Routes
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/navigation/Navbar';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;