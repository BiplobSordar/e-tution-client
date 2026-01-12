
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGetMyTuitionsQuery } from '../../features/tution/tutionApi';
import TuitionApplicationsCard from './components/TuitionApplicationsCard';
import AppliedTutorsStats from './components/AppliedTutorsStats';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import SearchFilter from './components/SearchFilter';




const AppliedTutorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [expandedTuition, setExpandedTuition] = useState(null);
  

  const { data, isLoading, error,refetch } = useGetMyTuitionsQuery();
  

  const tuitions = data?.tuitions?.length > 0 ? data.tuitions :[];

  const hasRealData = data?.tuitions?.length > 0;
  

  const activeTuitionsWithApplications = tuitions.filter(tuition => 
    tuition.isActive && 
    tuition.applications && 
    tuition.applications.length > 0
  );
  

  const filteredTuitions = activeTuitionsWithApplications.map(tuition => {

    const filteredApplications = tuition.applications.filter(app => {

      const matchesSearch = searchTerm === '' || 
        app.tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tutor.subjects?.some(subj => 
          subj.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        app.message?.toLowerCase().includes(searchTerm.toLowerCase());
      

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      

      const matchesSubject = subjectFilter === 'all' || 
        tuition.subjects.some(subj => 
          subj.toLowerCase() === subjectFilter.toLowerCase()
        );
      
      return matchesSearch && matchesStatus && matchesSubject;
    });
    
    return {
      ...tuition,
      applications: filteredApplications
    };
  }).filter(tuition => tuition.applications.length > 0);
  

  const stats = {
    totalApplications: activeTuitionsWithApplications.reduce(
      (sum, tuition) => sum + tuition.applications.length, 0
    ),
    pendingApplications: activeTuitionsWithApplications.reduce(
      (sum, tuition) => sum + tuition.applications.filter(app => app.status === 'pending').length, 0
    ),
    acceptedApplications: activeTuitionsWithApplications.reduce(
      (sum, tuition) => sum + tuition.applications.filter(app => app.status === 'accepted').length, 0
    ),
    activeTuitions: activeTuitionsWithApplications.length,
    totalTutors: new Set(
      activeTuitionsWithApplications.flatMap(tuition => 
        tuition.applications.map(app => app.tutor._id)
      )
    ).size
  };
  

  const allSubjects = [...new Set(
    activeTuitionsWithApplications.flatMap(tuition => tuition.subjects)
  )];
  

  const handleApplicationClick = (tuitionId, applicationId) => {
    navigate(`/applications/${tuitionId}/${applicationId}`);
  };
  

  const toggleTuitionExpansion = (tuitionId) => {
    setExpandedTuition(expandedTuition === tuitionId ? null : tuitionId);
  };
  
  if (error && !hasRealData) {
    return (
      <div className="min-h-screen bg-bg p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-error text-2xl mb-4">Error loading applications</div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div className="flex-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Applied Tutors</h1>
              <p className="text-text-secondary mt-2">
                View and manage tutor applications for your tuition posts
                {!hasRealData && (
                  <span className="text-warning ml-2">(Showing demo data)</span>
                )}
              </p>
            </div>
            <Link
              to="/student/my-tutions"
              className="btn-outline px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              View All Tuitions
            </Link>
          </div>
          
          
          <AppliedTutorsStats stats={stats} />
          
       
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            subjectFilter={subjectFilter}
            setSubjectFilter={setSubjectFilter}
            allSubjects={allSubjects}
          />
        </div>
        
   
        {isLoading ? (
          <SkeletonLoader />
        ) : filteredTuitions.length === 0 ? (
          <EmptyState 
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            subjectFilter={subjectFilter}
          />
        ) : (
          <div className="space-y-6">
            {filteredTuitions.map((tuition) => (
              <TuitionApplicationsCard
                key={tuition._id}
                tuition={tuition}
                expanded={expandedTuition === tuition._id}
                onToggleExpand={() => toggleTuitionExpansion(tuition._id)}
                onApplicationClick={handleApplicationClick}
                hasRealData={hasRealData}
                refetch={refetch}
              />
            ))}
          </div>
        )}
        

        {!hasRealData && (
          <div className="mt-8 p-4 border border-warning/20 rounded-lg bg-warning/5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-warning mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-warning font-medium">Demo Mode</p>
                <p className="text-text-secondary text-sm">
                  You're viewing demo data. Connect to backend to see real applications.
                  Click on application cards to view detailed profiles.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedTutorsPage;