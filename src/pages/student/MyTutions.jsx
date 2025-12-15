// src/pages/my-tuitions/MyTuitionsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyTuitionsQuery } from '../../features/tution/tutionApi';
import TuitionCard from './components/TuitionCard';
import TuitionSkeleton from './components/TuitionSkeleton';
import EmptyState from './components/EmptyState';
import { daysOfWeek } from './utils/constants';


const dummyTuitions = [
  {
    _id: '1',
    title: 'Mathematics Tutoring for Grade 10',
    description: 'Need an experienced math tutor for CBSE curriculum. Student is struggling with algebra and trigonometry.',
    grade: '10th Grade',
    subjects: ['Mathematics', 'Algebra', 'Trigonometry'],
    tuitionType: 'online',
    location: {
      city: 'New Delhi',
      area: 'Dwarka',
      address: 'Sector 12, Dwarka'
    },
    totalFee: 2500,
    status: 'open',
    paymentStatus: 'unpaid',
    applications: [],
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    finalSchedule: {
      schedule: [
        { day: 1, subject: 'Mathematics', from: '16:00', to: '18:00' },
        { day: 3, subject: 'Mathematics', from: '16:00', to: '18:00' }
      ]
    }
  },
  
];

const MyTuitionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { data, isLoading, error } = useGetMyTuitionsQuery();


  const tuitions = data?.tuitions?.length > 0 ? data.tuitions :[]
  const hasRealData = data?.tuitions?.length > 0;


  const filteredTuitions = tuitions.filter(tuition => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return tuition.isActive && tuition.status !== 'completed';
    if (activeFilter === 'open') return tuition.status === 'open';
    if (activeFilter === 'in-progress') return tuition.status === 'in-progress';
    if (activeFilter === 'completed') return tuition.status === 'completed';
    return true;
  });


  const statusCounts = {
    active: tuitions.filter(t => t.isActive && t.status !== 'completed').length,
    open: tuitions.filter(t => t.status === 'open').length,
    'in-progress': tuitions.filter(t => t.status === 'in-progress').length,
    completed: tuitions.filter(t => t.status === 'completed').length,
    all: tuitions.length
  };



  console.log(error)
  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
    
        <div className="mb-8">
          <div className="flex-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">My Tuitions</h1>
              <p className="text-text-secondary mt-2">
                Manage all your tuition posts and track applications
                {!hasRealData && (
                  <span className="text-warning ml-2">(Showing demo data)</span>
                )}
              </p>
            </div>
            <Link
              to="/tuitions/create"
              className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Tuition
            </Link>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat-card">
              <div className="flex-between">
                <div>
                  <p className="text-text-secondary text-sm">Total Tuitions</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{statusCounts.all}</p>
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
                  <p className="text-text-secondary text-sm">Active Tuitions</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{statusCounts.active}</p>
                </div>
                <div className="p-3 rounded-full bg-secondary-light">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex-between">
                <div>
                  <p className="text-text-secondary text-sm">Open Positions</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{statusCounts.open}</p>
                </div>
                <div className="p-3 rounded-full bg-secondary-light">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex-between">
                <div>
                  <p className="text-text-secondary text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">{statusCounts['in-progress']}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-light">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

  
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'active', 'open', 'in-progress', 'completed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                    ? 'btn-primary'
                    : 'btn-outline'
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter !== 'all' && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-card-bg">
                    {statusCounts[filter]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

     
        {isLoading ? (
          <div className="grid-responsive gap-6">
            {[1, 2, 3].map((i) => (
              <TuitionSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-error text-lg mb-4">Error loading tuitions</div>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        ) : filteredTuitions.length === 0 ? (
          <EmptyState filter={activeFilter} />
        ) : (
          <div className="
  grid 
  grid-cols-1 
  sm:grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-6
">
            {filteredTuitions.map((tuition) => (
              <TuitionCard
                key={tuition._id}
                tuition={tuition}
                hasRealData={hasRealData}
              />
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default MyTuitionsPage;