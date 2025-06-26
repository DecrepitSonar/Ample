import React from 'react';
import {
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useUser } from '../context/UserContext';

const streamData = [
  { name: 'Mon', streams: 2400, fans: 120 },
  { name: 'Tue', streams: 1398, fans: 145 },
  { name: 'Wed', streams: 9800, fans: 190 },
  { name: 'Thu', streams: 3908, fans: 250 },
  { name: 'Fri', streams: 4800, fans: 320 },
  { name: 'Sat', streams: 3800, fans: 380 },
  { name: 'Sun', streams: 4300, fans: 429 },
];

const engagementData = [
  { name: 'Mon', engagement: 65 },
  { name: 'Tue', engagement: 59 },
  { name: 'Wed', engagement: 80 },
  { name: 'Thu', engagement: 81 },
  { name: 'Fri', engagement: 56 },
  { name: 'Sat', engagement: 55 },
  { name: 'Sun', engagement: 40 },
];

const Analytics = () => {
  const { user } = useUser();

  const metrics = [
    {
      name: 'Total Streams',
      value: user.stats.totalViews,
      change: '+12.5%',
      icon: ChartBarIcon,
      trend: 'up'
    },
    {
      name: 'Unique Viewers',
      value: user.stats.uniqueViewers,
      change: '+18.2%',
      icon: UsersIcon,
      trend: 'up'
    },
    {
      name: 'Fans',
      value: '1,429',
      change: '+12.5%',
      icon: HeartIcon,
      trend: 'up'
    },
    {
      name: 'Avg. Watch Time',
      value: user.stats.avgWatchTime,
      change: '+2.3%',
      icon: ClockIcon,
      trend: 'up'
    },
    {
      name: 'Global Reach',
      value: `${user.stats.globalReach} countries`,
      change: '+5 countries',
      icon: GlobeAltIcon,
      trend: 'up'
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary-900">Analytics Overview</h1>
            <p className="text-secondary-500">Track your content performance and audience engagement</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-5">
            {metrics.map((metric) => (
              <div key={metric.name} className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <metric.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-secondary-600">{metric.name}</p>
                <p className="mt-2 text-2xl font-semibold text-secondary-900">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Streams Chart */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Streams Over Time</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={streamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="streams" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fans Chart */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Fans Growth</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={streamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="fans" fill="#EC4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Engagement Rate</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#6366F1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 