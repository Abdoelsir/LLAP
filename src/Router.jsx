import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './features/Navbar';
import Login from './components/Authentication/Login';
import InstructorProfile from './components/Authentication/InstructorProfile';
import DashboardPage from './components/DashboardPage';
import IeltsDashboard from './components/IeltsDashboard';
import SkillDashboard from './components/SkillDashboard';
import MockExamSelector from './components/MockExamSelector';
import ExamInstructions from './components/ExamInstructions';
import ReadingEditor from './components/ReadingEditor';
import SpeakingEditor from './components/SpeakingEditor';
import WritingEditor from './components/WritingEditor';
import ListeningEditor from './components/ListeningEditor';
import PerformanceDashboard from './components/PerformanceDashboard';
import TeacherDashboard from './components/TeacherDashboard';

/**
 * ProtectedRoute Component: Ensures proper role-based access control and session verification.
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// TeacherRoute component ensures role-based access for teacher-only portals
const TeacherRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return user.role === 'teacher' ? children : <Navigate to="/dashboard" replace />;
};

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Authentication & Profile Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/teacher-profile" element={<InstructorProfile />} />

        {/* Main Student Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="student">
              <DashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* Teacher Analytics Route (Protected by TeacherRole / ProtectedRoute) */}
        <Route 
          path="/teacher/analytics" 
          element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          } 
        />

        {/* IELTS Core Routes */}
        <Route path="/ielts" element={<ProtectedRoute allowedRole="student"><IeltsDashboard /></ProtectedRoute>} />
        <Route path="/ielts/:skill" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        
        {/* Unified Skill Navigation Routes */}
        <Route path="/ielts/:skill/lessons" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        <Route path="/ielts/:skill/practice" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} /> 
        <Route path="/ielts/:skill/quizzes" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        <Route path="/ielts/:skill/assignments" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        <Route path="/ielts/:skill/performance" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        <Route path="/ielts/:skill/vocabulary-bank" element={<ProtectedRoute allowedRole="student"><SkillDashboard /></ProtectedRoute>} />
        
        {/* Mock Exam Workflow */}
        <Route path="/ielts/:skill/exams" element={<ProtectedRoute allowedRole="student"><MockExamSelector /></ProtectedRoute>} />
        <Route path="/ielts/:skill/instructions/:examId" element={<ProtectedRoute allowedRole="student"><ExamInstructions /></ProtectedRoute>} />
        
        {/* Skill-Specific Engines */}
        <Route path="/ielts/reading/exams/active/:examId" element={<ProtectedRoute allowedRole="student"><ReadingEditor /></ProtectedRoute>} />
        <Route path="/ielts/listening/exams/active/:examId" element={<ProtectedRoute allowedRole="student"><ListeningEditor /></ProtectedRoute>} />
        <Route path="/ielts/speaking/exams/active/:examId" element={<ProtectedRoute allowedRole="student"><SpeakingEditor /></ProtectedRoute>} />
        <Route path="/ielts/writing/editor/:examId" element={<ProtectedRoute allowedRole="student"><WritingEditor /></ProtectedRoute>} />
        
        {/* Performance Dashboard Routes */}
        <Route path="/ielts/results/:submissionId" element={<ProtectedRoute><PerformanceDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/results/:submissionId" element={<ProtectedRoute><PerformanceDashboard /></ProtectedRoute>} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;