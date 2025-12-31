import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import QuizList from "./quiz/QuizList";
import QuizAttempt from "./quiz/QuizAttempt";
import ResultPage from "./result/ResultPage";

import AdminDashboard from "./admin/AdminDashboard";
import Navbar from "./layout/Navbar";

/* =========================
   AUTH GUARDS
========================= */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "admin") {
    return <Navigate to="/quizzes" replace />;
  }

  return children;
};
const HomeRedirect = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  return <Navigate to="/quizzes" replace />;
};

/* =========================
   APP ROUTES
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* =====================
           PUBLIC ROUTES
        ===================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* =====================
           USER ROUTES
        ===================== */}
        <Route
          path="/quizzes"
          element={
            <PrivateRoute>
              <QuizList />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRoute>
              <QuizAttempt />
            </PrivateRoute>
          }
        />

        <Route
          path="/result/:submissionId"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />

        {/* =====================
           ADMIN ROUTE
        ===================== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* =====================
           DEFAULT & FALLBACK
        ===================== */}
        
        <Route path="/" element={<HomeRedirect />} />
<Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
