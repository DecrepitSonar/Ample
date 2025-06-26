import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Dashboard from './components/Dashboard';
import StreamAnalytics from './components/StreamAnalytics';
import Upload from './components/Upload';
import Profile from './components/Profile';
import Uploads from './components/Uploads';
import AccountSettings from './components/AccountSettings';
import Notifications from './components/Notifications';
import Security from './components/Security';
import VideoUploadForm from './components/VideoUploadForm';
import Analytics from './components/Analytics';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getTokenFromHeader = () => {
      const authHeader = document.querySelector('meta[name="authorization"]')?.content;
      return authHeader || null;
    };

    const getTokenFromCookie = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('xrftoken='));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    const setTokenCookie = (token) => {
      if (token) {
        document.cookie = `xrftoken=${token}; path=/; max-age=86400`; // 24 hours
      }
    };

    const validateToken = async (token) => {
      if (!token) return false;
      
      try {
        const response = await fetch('http://localhost:5000/validate', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        const data = await response.json();
        console.log('Token validation successful:', data);
        return true;
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    };

    const handleAuth = async () => {
      // First check Authorization header
      const headerToken = getTokenFromHeader();
      console.log('Header token:', headerToken);
      if (headerToken) {
        console.log('Token found in header');
        setTokenCookie(headerToken);
        const isValid = await validateToken(headerToken);
        setIsAuthenticated(isValid);
        return;
      }

      // If no header token, check cookie
      const cookieToken = getTokenFromCookie();
      if (cookieToken) {
        console.log('Token found in cookie');
        const isValid = await validateToken(cookieToken);
        setIsAuthenticated(isValid);
        return;
      }

      // No valid token found
      console.log('No valid token found');
      setIsAuthenticated(false);
    };

    handleAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Authentication Required</h1>
          <p className="text-secondary-600">Please log in to access this application.</p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <div className="App h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="stream-analytics" element={<StreamAnalytics />} />
              <Route path="upload" element={<Upload />} />
              <Route path="upload-video" element={<VideoUploadForm />} />
              <Route path="profile" element={<Profile />} />
              <Route path="uploads" element={<Uploads />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="security" element={<Security />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 