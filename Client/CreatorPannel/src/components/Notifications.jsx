import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  BellIcon, 
  EnvelopeIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    sms: false
  });

  const notificationHistory = [
    {
      id: 1,
      type: 'success',
      title: 'Upload Complete',
      message: 'Your video "Introduction.mp4" has been successfully uploaded',
      time: '2 hours ago',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-100'
    },
    {
      id: 2,
      type: 'error',
      title: 'Upload Failed',
      message: 'Failed to upload "Project Demo.mp4". Please try again',
      time: '3 hours ago',
      icon: ExclamationCircleIcon,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new content management features',
      time: '1 day ago',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100'
    }
  ];

  const handlePreferenceChange = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getChannelIcon = (type) => {
    switch (type) {
      case 'email':
        return EnvelopeIcon;
      case 'push':
        return BellIcon;
      case 'sms':
        return DevicePhoneMobileIcon;
      default:
        return BellIcon;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-secondary-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center text-secondary-600 hover:text-secondary-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Profile
          </button>
        </div>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-secondary-200">
              <h1 className="text-2xl font-bold text-secondary-900">Notification Settings</h1>
              <p className="text-secondary-500">Manage how you receive notifications</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(preferences).map(([type, enabled]) => {
                  const Icon = getChannelIcon(type);
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${enabled ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                          <Icon className={`h-5 w-5 ${enabled ? 'text-primary-600' : 'text-secondary-400'}`} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-secondary-900">
                            {type.charAt(0).toUpperCase() + type.slice(1)} Notifications
                          </p>
                          <p className="text-xs text-secondary-500">
                            Receive notifications via {type}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange(type)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          enabled ? 'bg-primary-600' : 'bg-secondary-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notification History */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-secondary-200">
              <h2 className="text-lg font-medium text-secondary-900">Recent Notifications</h2>
            </div>
            <div className="divide-y divide-secondary-200">
              {notificationHistory.map((notification) => (
                <div key={notification.id} className="p-6 hover:bg-secondary-50">
                  <div className="flex items-start">
                    <div className={`p-2 ${notification.iconBg} rounded-lg`}>
                      <notification.icon className={`h-6 w-6 ${notification.iconColor}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-secondary-900">{notification.title}</p>
                        <p className="text-xs text-secondary-500">{notification.time}</p>
                      </div>
                      <p className="mt-1 text-sm text-secondary-500">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 