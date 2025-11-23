import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import SkillAnalysis from './components/SkillAnalysis';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Jobs from './components/jobs/Jobs';
import ChatInterface from './components/mentorship/ChatInterface';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Hero /><Features /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* The "Bridge" Feature */}
        <Route path="/analyze" element={<><Navbar /><SkillAnalysis /></>} />
        
        {/* Protected Dashboard Routes (Wrapped in DashboardLayout inside component) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/mentorship" element={<ChatInterface />} />
        
        {/* Redirect learning/settings to dashboard for now */}
        <Route path="/learning" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;