import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', icon: ArrowLeftIcon, href: 'http://localhost:5173/listen', external: true },
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Uploads', icon: DocumentTextIcon, href: '/uploads' },
  { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-secondary-800 h-screen">
      <div className="flex items-center justify-center h-16 px-4">
        <h1 className="text-2xl font-bold text-white">Nix</h1>
      </div>
      <div className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => (
          item.external ? (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-secondary-300 hover:bg-secondary-700 hover:text-white"
            >
              <item.icon className="w-6 h-6 mr-3" />
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                ${location.pathname === item.href
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                }
              `}
            >
              <item.icon className="w-6 h-6 mr-3" />
              {item.name}
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 