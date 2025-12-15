
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ filter }) => {
  const getMessage = () => {
    switch (filter) {
      case 'active':
        return 'You have no active tuitions at the moment.';
      case 'open':
        return 'No tuitions are currently open for applications.';
      case 'in-progress':
        return 'No tuitions are in progress.';
      case 'completed':
        return 'No completed tuitions found.';
      default:
        return 'You haven\'t posted any tuitions yet.';
    }
  };
  
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg className="w-24 h-24 mx-auto text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No Tuitions Found
      </h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        {getMessage()}
      </p>
      <Link
        to="/tuitions/create"
        className="btn-primary inline-flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Post Your First Tuition
      </Link>
    </div>
  );
};

export default EmptyState;