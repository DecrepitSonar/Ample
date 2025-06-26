import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { week: 'Week 1', streams: 12845 },
  { week: 'Week 2', streams: 15921 },
  { week: 'Week 3', streams: 19234 },
  { week: 'Week 4', streams: 16456 }
];

const StreamAnalytics = () => {
  const navigate = useNavigate();

  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  return (
    <div className="h-screen flex flex-col bg-secondary-50">
      {/* Fixed Header */}
      <div className="p-6 bg-secondary-50">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-secondary-600 hover:text-secondary-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <PlayIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">Stream Analytics</h1>
                <p className="text-secondary-500">Detailed analysis of your streaming performance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Today's Streams</p>
                <p className="text-2xl font-bold text-secondary-900">2,845</p>
                <p className="text-sm text-green-600">+12.3% from yesterday</p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Weekly Streams</p>
                <p className="text-2xl font-bold text-secondary-900">15,921</p>
                <p className="text-sm text-green-600">+8.1% from last week</p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Monthly Streams</p>
                <p className="text-2xl font-bold text-secondary-900">64,456</p>
                <p className="text-sm text-green-600">+20.1% from last month</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Weekly Streaming Breakdown</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis tickFormatter={(value) => formatNumber(value)} />
                      <Tooltip 
                        formatter={(value) => formatNumber(value)}
                        labelStyle={{ color: '#1f2937' }}
                        contentStyle={{ 
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.375rem'
                        }}
                      />
                      <Bar 
                        dataKey="streams" 
                        fill="#4f46e5" 
                        radius={[4, 4, 0, 0]}
                        name="Streams"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Streaming Sources</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-secondary-700">Spotify</span>
                    </div>
                    <span className="font-medium text-secondary-900">32,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-300 rounded-full mr-3"></div>
                      <span className="text-secondary-700">Apple Music</span>
                    </div>
                    <span className="font-medium text-secondary-900">22,345</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-200 rounded-full mr-3"></div>
                      <span className="text-secondary-700">YouTube Music</span>
                    </div>
                    <span className="font-medium text-secondary-900">9,661</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamAnalytics; 