import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ListPage from "./pages/ListPage";
import HomePage from "./pages/HomePage";
import ReviewFormPage from "./pages/ReviewFormPage";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <AuthProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with layout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <Navigate to="/analysis/asset" replace />
              </ProtectedRoute>
            } />
            <Route path="/analysis/:category" element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            } />
            <Route path="/review/:category/:reviewId" element={
              <ProtectedRoute>
                <ReviewFormPage />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </HashRouter>
  </QueryClientProvider>
);

export default App;