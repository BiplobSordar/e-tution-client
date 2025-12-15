
import React from 'react';

const AppliedTutorsStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="stat-card">
        <div className="flex-between">
          <div>
            <p className="text-text-secondary text-sm">Active Tuitions</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{stats.activeTuitions}</p>
          </div>
          <div className="p-3 rounded-full bg-primary-light">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex-between">
          <div>
            <p className="text-text-secondary text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{stats.totalApplications}</p>
          </div>
          <div className="p-3 rounded-full bg-secondary-light">
            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex-between">
          <div>
            <p className="text-text-secondary text-sm">Pending Review</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{stats.pendingApplications}</p>
          </div>
          <div className="p-3 rounded-full bg-warning/10">
            <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex-between">
          <div>
            <p className="text-text-secondary text-sm">Accepted</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{stats.acceptedApplications}</p>
          </div>
          <div className="p-3 rounded-full bg-success/10">
            <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex-between">
          <div>
            <p className="text-text-secondary text-sm">Unique Tutors</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{stats.totalTutors}</p>
          </div>
          <div className="p-3 rounded-full bg-info/10">
            <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedTutorsStats;