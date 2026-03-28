


import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { useGetGuardianDashboardQuery } from '../../features/guardian/guardianApi';

const GuardianDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetGuardianDashboardQuery(undefined, {
    skip: !user?._id,
  });

  const dashboard = data?.data || {
    totalStudents: 0,
    activeTuitions: 0,
    avgProgress: 0,
    pendingPayments: 0,
    students: [],
    recentNotifications: [],
    upcomingEvents: [],
  };

  const firstName = user?.name?.split(' ')[0] || 'Guardian';

  if (isLoading) {
    return (
      <div className="flex-center h-64">
        <div className="text-text-secondary text-sm sm:text-base">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 sm:px-0">
        <p className="text-error">Error loading dashboard. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-hidden space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm sm:text-base text-text-secondary mt-1">
            Monitor your children's academic progress and activities.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card-bg border border-border rounded-lg p-4 flex items-center gap-4 shadow-card">
          <div className="p-3 bg-primary/10 rounded-full">
            <FaUsers className="text-2xl text-primary" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Total Students</p>
            <p className="text-2xl font-bold text-text-primary">{dashboard.totalStudents}</p>
          </div>
        </div>
        <div className="bg-card-bg border border-border rounded-lg p-4 flex items-center gap-4 shadow-card">
          <div className="p-3 bg-warning/10 rounded-full">
            <MdSchool className="text-2xl text-warning" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Active Tuitions</p>
            <p className="text-2xl font-bold text-text-primary">{dashboard.activeTuitions}</p>
          </div>
        </div>
        <div className="bg-card-bg border border-border rounded-lg p-4 flex items-center gap-4 shadow-card">
          <div className="p-3 bg-success/10 rounded-full">
            <FaChartLine className="text-2xl text-success" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Avg.Progress</p>
            <p className="text-2xl font-bold text-text-primary">{dashboard.avgProgress}%</p>
          </div>
        </div>
        <div className="bg-card-bg border border-border rounded-lg p-4 flex items-center gap-4 shadow-card">
          <div className="p-3 bg-error/10 rounded-full">
            <FaDollarSign className="text-2xl text-error" />
          </div>
          <div>
            <p className="text-text-secondary text-sm">Pending Payments</p>
            <p className="text-2xl font-bold text-text-primary">${dashboard.pendingPayments}</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-card-bg border border-border rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Your Students</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-hover-bg">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap">Grade</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap">Subjects</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.students.map((student) => (
                <tr key={student.id} className="border-t border-border hover:bg-hover-bg">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.subjects.join(', ')}</td>
                  <td className="px-6 py-4 min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-text-secondary whitespace-nowrap">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">{student.lastActive}</td>
                </tr>
              ))}
              {dashboard.students.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-text-secondary">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities & Upcoming Events */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-card-bg border border-border rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-text-primary">Recent Notifications</h3>
          </div>
          <ul className="divide-y divide-border">
            {dashboard.recentNotifications.map((notif, idx) => (
              <li key={idx} className="px-6 py-4 hover:bg-hover-bg">
                <p className="text-text-primary">{notif.description}</p>
                <p className="text-xs text-text-secondary mt-1">{notif.timeAgo}</p>
              </li>
            ))}
            {dashboard.recentNotifications.length === 0 && (
              <li className="px-6 py-4 text-center text-text-secondary">No recent notifications.</li>
            )}
          </ul>
        </div>
        <div className="bg-card-bg border border-border rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-text-primary">Upcoming Events</h3>
          </div>
          <ul className="divide-y divide-border">
            {dashboard.upcomingEvents.map((event, idx) => (
              <li key={idx} className="px-6 py-4 hover:bg-hover-bg">
                <p className="text-text-primary">{event.description}</p>
                <p className="text-xs text-text-secondary mt-1">{event.date}</p>
              </li>
            ))}
            {dashboard.upcomingEvents.length === 0 && (
              <li className="px-6 py-4 text-center text-text-secondary">No upcoming events.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;