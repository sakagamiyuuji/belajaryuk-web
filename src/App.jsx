import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import DashboardRedirect from './pages/DashboardRedirect.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import MaterialDetail from './pages/MaterialDetail.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import SubjectDetail from './pages/SubjectDetail.jsx';
import SubjectsHome from './pages/SubjectsHome.jsx';

function LegacyDashboardSubjectRedirect() {
  const { subjectId } = useParams();
  return <Navigate to={`/subjects/${subjectId}`} replace />;
}

function LegacyDashboardMaterialRedirect() {
  const { subjectId, chapterId, materialId } = useParams();
  return (
    <Navigate
      to={`/subjects/${subjectId}/${chapterId}/${materialId}`}
      replace
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/subjects" element={<SubjectsHome />} />
            <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
            <Route
              path="/subjects/:subjectId/:chapterId/:materialId"
              element={<MaterialDetail />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route
              path="/dashboard/:subjectId"
              element={<LegacyDashboardSubjectRedirect />}
            />
            <Route
              path="/dashboard/:subjectId/:chapterId/:materialId"
              element={<LegacyDashboardMaterialRedirect />}
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
