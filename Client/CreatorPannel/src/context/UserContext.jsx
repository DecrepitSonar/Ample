import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Creator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    settings: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      theme: 'light',
      language: 'en'
    },
    stats: {
      totalViews: '35.2K',
      uniqueViewers: '15.3K',
      avgWatchTime: '4:32',
      globalReach: 28
    }
  });

  const updateUser = (updates) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updates
    }));
  };

  const updateUserSettings = (settingUpdates) => {
    setUser(prevUser => ({
      ...prevUser,
      settings: {
        ...prevUser.settings,
        ...settingUpdates
      }
    }));
  };

  const updateUserAvatar = (newAvatarUrl) => {
    setUser(prevUser => ({
      ...prevUser,
      avatar: newAvatarUrl
    }));
  };

  const value = {
    user,
    updateUser,
    updateUserSettings,
    updateUserAvatar
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; 