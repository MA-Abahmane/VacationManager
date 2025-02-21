import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, ClipboardList, UserCog } from 'lucide-react';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-[#1e3a8a] text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">Vacation Manager</Link>
            <div className="flex gap-4">
              <Link to="/request" className="flex items-center gap-2 hover:text-blue-200">
                <Calendar size={20} />
                New Request
              </Link>
              <Link to="/requests" className="flex items-center gap-2 hover:text-blue-200">
                <ClipboardList size={20} />
                View Requests
              </Link>
              <Link to="/admin-login" className="flex items-center gap-2 hover:text-blue-200">
                <UserCog size={20} />
                Admin
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/requests" element={<RequestList />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;