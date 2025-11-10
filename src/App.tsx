import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import LogoutSuccess from "./pages/LogoutSuccess";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

// Maintenance Pages
import MembershipManagement from "./pages/maintenance/MembershipManagement";
import BookManagement from "./pages/maintenance/BookManagement";
import UserManagement from "./pages/maintenance/UserManagement";

// Reports Pages
import BooksReport from "./pages/reports/BooksReport";
import MoviesReport from "./pages/reports/MoviesReport";
import MembershipsReport from "./pages/reports/MembershipsReport";
import ActiveIssuesReport from "./pages/reports/ActiveIssuesReport";
import OverdueReport from "./pages/reports/OverdueReport";
import RequestsReport from "./pages/reports/RequestsReport";

// Transactions Pages
import CheckAvailability from "./pages/transactions/CheckAvailability";
import IssueBook from "./pages/transactions/IssueBook";
import ReturnBook from "./pages/transactions/ReturnBook";
import PayFine from "./pages/transactions/PayFine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout-success" element={<LogoutSuccess />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminHome />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Maintenance />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance/membership" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MembershipManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance/books" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <BookManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/user" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserHome />
              </ProtectedRoute>
            } />
            
            {/* Shared Routes (Admin & User) */}
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/reports/books" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <BooksReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/movies" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <MoviesReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/memberships" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <MembershipsReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/active-issues" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <ActiveIssuesReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/overdue-returns" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <OverdueReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/issue-requests" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <RequestsReport />
              </ProtectedRoute>
            } />
            
            <Route path="/transactions" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <Transactions />
              </ProtectedRoute>
            } />
            <Route path="/transactions/check-availability" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <CheckAvailability />
              </ProtectedRoute>
            } />
            <Route path="/transactions/issue-book" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <IssueBook />
              </ProtectedRoute>
            } />
            <Route path="/transactions/return-book" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <ReturnBook />
              </ProtectedRoute>
            } />
            <Route path="/transactions/pay-fine" element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <PayFine />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
