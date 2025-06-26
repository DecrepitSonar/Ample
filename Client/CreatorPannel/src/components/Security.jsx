import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  KeyIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const Security = () => {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const loginHistory = [
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      ip: '192.168.1.1',
      time: '2 hours ago',
      icon: ComputerDesktopIcon,
      status: 'success'
    },
    {
      id: 2,
      device: 'iPhone 12',
      location: 'San Francisco, CA',
      ip: '192.168.1.2',
      time: '1 day ago',
      icon: DevicePhoneMobileIcon,
      status: 'success'
    },
    {
      id: 3,
      device: 'iPad Pro',
      location: 'New York, NY',
      ip: '192.168.1.3',
      time: '3 days ago',
      icon: DeviceTabletIcon,
      status: 'success'
    }
  ];

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
          {/* Password Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-secondary-200">
              <h1 className="text-2xl font-bold text-secondary-900">Security Settings</h1>
              <p className="text-secondary-500">Manage your account security preferences</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Change Password */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <KeyIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-secondary-900">Password</h3>
                        <p className="text-xs text-secondary-500">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Change password
                    </button>
                  </div>
                  {showChangePassword && (
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-secondary-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-secondary-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-secondary-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${twoFactorEnabled ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                      <ShieldCheckIcon className={`h-5 w-5 ${twoFactorEnabled ? 'text-primary-600' : 'text-secondary-400'}`} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-secondary-900">Two-Factor Authentication</h3>
                      <p className="text-xs text-secondary-500">
                        {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      twoFactorEnabled ? 'bg-primary-600' : 'bg-secondary-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-secondary-200">
              <h2 className="text-lg font-medium text-secondary-900">Recent Login Activity</h2>
              <p className="text-secondary-500">Monitor where you're signed in</p>
            </div>
            <div className="divide-y divide-secondary-200">
              {loginHistory.map((login) => (
                <div key={login.id} className="p-6 hover:bg-secondary-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-secondary-100 rounded-lg">
                      <login.icon className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-secondary-900">{login.device}</p>
                        <p className="text-xs text-secondary-500">{login.time}</p>
                      </div>
                      <p className="mt-1 text-sm text-secondary-500">{login.location}</p>
                      <p className="mt-1 text-xs text-secondary-400">IP: {login.ip}</p>
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

export default Security; 