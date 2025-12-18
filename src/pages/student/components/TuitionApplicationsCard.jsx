
import React from 'react';
import StatusBadge from '../components/StatusBadge';
import ApplicationCard from './ApplicationCard';

const TuitionApplicationsCard = ({ 
  tuition, 
  expanded, 
  onToggleExpand, 
  onApplicationClick,
  hasRealData ,
  refetch
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  

  const applicationStats = {
    total: tuition.applications.length,
    pending: tuition.applications.filter(app => app.status === 'pending').length,
    accepted: tuition.applications.filter(app => app.status === 'accepted').length,
    rejected: tuition.applications.filter(app => app.status === 'rejected').length
  };
  
  return (
    <div className="dashboard-card animate-fade-in">

      <div 
        className="cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg 
                  className={`w-5 h-5 text-text-secondary transition-transform ${expanded ? 'rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {tuition.title}
                  </h3>
                  <StatusBadge status={tuition.status} size="sm" />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5M12 20l-9-5" />
                    </svg>
                    {tuition.grade}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {tuition.subjects.join(', ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ₹{tuition.totalFee}/month
                  </span>
                </div>
              </div>
            </div>
            
          
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-text-secondary">
                  {applicationStats.total} total applications
                </span>
              </div>
              {applicationStats.pending > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-text-secondary">
                    {applicationStats.pending} pending
                  </span>
                </div>
              )}
              {applicationStats.accepted > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-text-secondary">
                    {applicationStats.accepted} accepted
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="btn-outline px-4 py-2 text-sm"
            >
              {expanded ? 'Collapse' : 'View Applications'}
            </button>
          </div>
        </div>
      </div>
      

      {expanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold text-text-primary mb-4">
            Tutor Applications ({tuition.applications.length})
          </h4>
          
          {tuition.applications.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p>No applications match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {tuition.applications.map((application) => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  tuitionId={tuition._id}
                  onClick={() => onApplicationClick(tuition._id, application._id)}
                  hasRealData={hasRealData}
                  refetch={refetch}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TuitionApplicationsCard;