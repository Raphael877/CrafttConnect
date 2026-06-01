import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import Navbar from './components/Navbar';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Discovery = React.lazy(() => import('./pages/Discovery'));
const ArtisanProfile = React.lazy(() => import('./pages/ArtisanProfile'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/artisan/:id" element={<ArtisanProfile />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
