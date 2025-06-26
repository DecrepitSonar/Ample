import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CurrencyDollarIcon, 
  PlayIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  DocumentIcon,
  CloudArrowUpIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  TableCellsIcon,
  CodeBracketIcon,
  HeartIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Streams',
    value: '64,456',
    change: '+20.1%',
    changeType: 'increase',
    icon: PlayIcon,
    link: '/stream-analytics'
  },
  {
    name: 'Monthly Streams',
    value: '12,456',
    change: '+25.8%',
    changeType: 'increase',
    icon: PlayIcon,
  },
  {
    name: 'Fans',
    value: '1,429',
    change: '+12.5%',
    changeType: 'increase',
    icon: HeartIcon,
  },
  {
    name: 'Conversion Rate',
    value: '4.5%',
    change: '+4.1%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
];

const quickActions = [
  {
    name: 'Upload Audio',
    icon: CloudArrowUpIcon,
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
    description: 'Upload any type of file',
    link: '/upload'
  },
  {
    name: 'Upload Video',
    icon: VideoCameraIcon,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    description: 'Upload video content',
    link: '/upload-video'
  }
];

const recentFiles = [
  {
    id: 1,
    name: 'summer_vibes.mp3',
    size: '4.2 MB',
    type: 'Audio',
    icon: MusicalNoteIcon,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    modifiedAt: '2 hours ago',
    author: 'Sarah Chen'
  },
  {
    id: 2,
    name: 'intro_video.mp4',
    size: '156 MB',
    type: 'Video',
    icon: VideoCameraIcon,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    modifiedAt: '4 hours ago',
    author: 'Mike Johnson'
  },
  {
    id: 3,
    name: 'podcast_episode_12.wav',
    size: '85 MB',
    type: 'Audio',
    icon: MusicalNoteIcon,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    modifiedAt: '6 hours ago',
    author: 'Lisa Wong'
  },
  {
    id: 4,
    name: 'tutorial_final.mp4',
    size: '288 MB',
    type: 'Video',
    icon: VideoCameraIcon,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    modifiedAt: 'Yesterday',
    author: 'John Smith'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    if (action.link) {
      navigate(action.link);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-secondary-50">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className={`bg-white rounded-lg p-6 ${
                item.link ? 'cursor-pointer hover:bg-secondary-50 transition-all duration-200' : ''
              }`}
              onClick={() => item.link && navigate(item.link)}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className={`flex items-center ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium ml-1">{item.change}</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-secondary-600">{item.name}</p>
              <p className="mt-2 text-2xl font-semibold text-secondary-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={() => handleQuickAction(action)}
                className="flex items-center p-4 bg-white rounded-lg hover:bg-secondary-50 transition-all duration-200"
              >
                <div className={`p-3 rounded-lg ${action.bgColor} ${action.textColor}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm font-medium text-secondary-900">{action.name}</p>
                  <p className="text-xs text-secondary-500">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-secondary-900">Recent Files</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Files
            </button>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="space-y-6">
                {recentFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between group hover:bg-secondary-50 p-2 rounded-lg transition-colors duration-150">
                    <div className="flex items-center flex-1">
                      <div className={`p-2 rounded-lg ${file.iconBg}`}>
                        <file.icon className={`h-6 w-6 ${file.iconColor}`} />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-secondary-900">{file.name}</p>
                          <p className="text-xs text-secondary-500 ml-4">{file.size}</p>
                        </div>
                        <div className="flex items-center mt-1">
                          <p className="text-xs text-secondary-500">Modified {file.modifiedAt} by {file.author}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button className="p-1 hover:bg-secondary-100 rounded">
                        <PlayIcon className="h-4 w-4 text-secondary-500" />
                      </button>
                      <button className="p-1 hover:bg-secondary-100 rounded">
                        <ArrowDownIcon className="h-4 w-4 text-secondary-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 