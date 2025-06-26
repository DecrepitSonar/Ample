import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CogIcon,
  BellIcon,
  KeyIcon,
  ShieldCheckIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserAvatar } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (previewUrl) {
      updateUserAvatar(previewUrl);
    }
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const settings = [
    {
      name: 'Account Settings',
      description: 'Update your account information',
      icon: CogIcon,
      href: '/account-settings',
    },
    {
      name: 'Notifications',
      description: 'Manage your notification preferences',
      icon: BellIcon,
      href: '/notifications',
    },
    {
      name: 'Security',
      description: 'Update password and security settings',
      icon: KeyIcon,
      href: '/security',
    },
    {
      name: 'Privacy',
      description: 'Manage your privacy preferences',
      icon: ShieldCheckIcon,
      href: '#',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-secondary-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={previewUrl || user.avatar}
                  alt={user.name}
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-0 right-0 p-1 rounded-full bg-secondary-800 text-white hover:bg-secondary-700"
                >
                  <PhotoIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-secondary-900">{user.name}</h1>
                <p className="text-secondary-500">{user.role}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/account-settings')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Settings</h2>
          <div className="divide-y divide-secondary-200">
            {settings.map((setting) => (
              <div
                key={setting.name}
                className="py-4 flex items-center justify-between hover:bg-secondary-50 px-4 rounded-lg cursor-pointer"
                onClick={() => setting.href !== '#' && navigate(setting.href)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <setting.icon className="h-6 w-6 text-secondary-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-secondary-900">{setting.name}</p>
                    <p className="text-sm text-secondary-500">{setting.description}</p>
                  </div>
                </div>
                <div>
                  <button className="text-secondary-400 hover:text-secondary-500">
                    <span className="sr-only">Edit {setting.name.toLowerCase()}</span>
                    <CogIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-secondary-400 hover:text-secondary-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      Update Profile Picture
                    </h3>
                    
                    <div className="mt-4">
                      <div className="flex justify-center">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-32 w-32 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-32 w-32 rounded-full bg-secondary-100 flex items-center justify-center">
                            <PhotoIcon className="h-12 w-12 text-secondary-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-secondary-700">
                          Choose a new photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="mt-1 block w-full text-sm text-secondary-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm
                      ${selectedFile 
                        ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500' 
                        : 'bg-secondary-300 cursor-not-allowed'}`}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 