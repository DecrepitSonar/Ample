import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex-1 min-w-0">
          <div className="relative max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-secondary-200 py-2 pl-10 pr-3 text-sm placeholder-secondary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Search..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-secondary-400 hover:text-secondary-500">
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
            <BellIcon className="h-6 w-6" />
          </button>
          
          <Link to="/profile" className="flex items-center hover:bg-secondary-50 rounded-lg p-2 transition-colors duration-200">
            <img
              className="h-8 w-8 rounded-full"
              src={user.avatar}
              alt={`${user.name}'s avatar`}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-secondary-700">{user.name}</p>
              <p className="text-xs text-secondary-500">{user.role}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 