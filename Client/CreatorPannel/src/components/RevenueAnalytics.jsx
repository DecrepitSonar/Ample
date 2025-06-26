import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign, FaChartLine, FaUsers } from 'react-icons/fa';

const revenueData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6100 },
  { month: 'May', revenue: 5800 },
  { month: 'Jun', revenue: 7200 },
];

const RevenueAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold">$33,600</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaDollarSign className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">+12% from last month</p>
        </div>

        {/* Monthly Growth Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Growth</p>
              <h3 className="text-2xl font-bold">24.3%</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">+5% from last month</p>
        </div>

        {/* Paying Subscribers Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Paying Subscribers</p>
              <h3 className="text-2xl font-bold">1,240</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">+8% from last month</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Sources</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Subscriptions</p>
              <p className="text-sm text-gray-500">Monthly recurring revenue</p>
            </div>
            <p className="font-semibold">$25,200</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">One-time Purchases</p>
              <p className="text-sm text-gray-500">Digital content sales</p>
            </div>
            <p className="font-semibold">$5,800</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tips & Donations</p>
              <p className="text-sm text-gray-500">Fan contributions</p>
            </div>
            <p className="font-semibold">$2,600</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics; 