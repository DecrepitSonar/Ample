import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    language: 'en',
    timezone: 'UTC-8'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-secondary-50">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h1 className="text-2xl font-bold text-secondary-900">Account Settings</h1>
            <p className="text-secondary-500">Manage your account preferences and settings</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Notification Preferences</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotif"
                    checked={formData.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="emailNotif" className="ml-3 text-sm text-secondary-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushNotif"
                    checked={formData.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="pushNotif" className="ml-3 text-sm text-secondary-700">
                    Push Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotif"
                    checked={formData.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="smsNotif" className="ml-3 text-sm text-secondary-700">
                    SMS Notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Preferences</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-secondary-700">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-secondary-700">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 