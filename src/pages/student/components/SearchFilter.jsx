
import React from 'react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  subjectFilter,
  setSubjectFilter,
  allSubjects 
}) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="form-label">Search Tutors</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, subjects, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        

        <div>
          <label className="form-label">Application Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
 
        <div>
          <label className="form-label">Subject</label>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">All Subjects</option>
            {allSubjects.map((subject, index) => (
              <option key={index} value={subject.toLowerCase()}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>
      

      <div className="flex flex-wrap gap-2 mt-4">
        {searchTerm && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light text-primary text-sm">
            Search: {searchTerm}
            <button
              onClick={() => setSearchTerm('')}
              className="ml-1 hover:text-primary-dark"
            >
              ×
            </button>
          </div>
        )}
        
        {statusFilter !== 'all' && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-light text-secondary text-sm">
            Status: {statusFilter}
            <button
              onClick={() => setStatusFilter('all')}
              className="ml-1 hover:text-secondary-dark"
            >
              ×
            </button>
          </div>
        )}
        
        {subjectFilter !== 'all' && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-warning/10 text-warning text-sm">
            Subject: {subjectFilter}
            <button
              onClick={() => setSubjectFilter('all')}
              className="ml-1 hover:text-warning-dark"
            >
              ×
            </button>
          </div>
        )}
        
        {(searchTerm || statusFilter !== 'all' || subjectFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setSubjectFilter('all');
            }}
            className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;