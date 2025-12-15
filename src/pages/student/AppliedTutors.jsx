
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGetMyTuitionsQuery } from '../../features/tution/tutionApi';
import TuitionApplicationsCard from './components/TuitionApplicationsCard';
import AppliedTutorsStats from './components/AppliedTutorsStats';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import SearchFilter from './components/SearchFilter';


// const dummyTuitionsWithApplications = [
//   {
//     _id: '1',
//     title: 'Mathematics Tutoring for Grade 10',
//     grade: '10th Grade',
//     subjects: ['Mathematics', 'Algebra', 'Trigonometry'],
//     tuitionType: 'online',
//     status: 'open',
//     isActive: true,
//     totalFee: 2500,
//     applications: [
//       {
//         _id: 'app1',
//         tutor: {
//           _id: 'tutor1',
//           name: 'Dr. Rajesh Kumar',
//           email: 'rajesh.kumar@example.com',
//           qualifications: ['M.Sc Mathematics', 'B.Ed'],
//           experience: '8 years',
//           rating: 4.8,
//           subjects: ['Mathematics', 'Algebra', 'Calculus'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
//           location: 'New Delhi',
//           hourlyRate: 500,
//           totalStudents: 150,
//           bio: 'Experienced mathematics teacher with 8+ years of teaching CBSE curriculum. Specialized in making complex concepts easy to understand.'
//         },
//         proposedRate: 2800,
//         message: 'I have extensive experience teaching CBSE Mathematics for 8 years. My students have consistently shown improvement in their grades.',
//         status: 'pending',
//         appliedAt: '2024-01-20T14:30:00Z'
//       },
//       {
//         _id: 'app2',
//         tutor: {
//           _id: 'tutor2',
//           name: 'Priya Sharma',
//           email: 'priya.sharma@example.com',
//           qualifications: ['M.Tech', 'CTET Certified'],
//           experience: '5 years',
//           rating: 4.6,
//           subjects: ['Mathematics', 'Physics'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
//           location: 'Mumbai',
//           hourlyRate: 450,
//           totalStudents: 120,
//           bio: 'Passionate about teaching mathematics through real-life applications and interactive methods.'
//         },
//         proposedRate: 2500,
//         message: 'I specialize in making complex mathematical concepts easy to understand using real-life examples.',
//         status: 'pending',
//         appliedAt: '2024-01-19T11:20:00Z'
//       },
//       {
//         _id: 'app3',
//         tutor: {
//           _id: 'tutor3',
//           name: 'Amit Patel',
//           email: 'amit.patel@example.com',
//           qualifications: ['B.Sc Mathematics', 'M.Ed'],
//           experience: '10 years',
//           rating: 4.9,
//           subjects: ['Mathematics', 'Statistics'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
//           location: 'Bangalore',
//           hourlyRate: 600,
//           totalStudents: 200,
//           bio: 'Award-winning mathematics teacher with proven track record of student success in board exams.'
//         },
//         proposedRate: 3200,
//         message: 'With 10 years of teaching experience, I have developed a proven methodology for grade 10 mathematics.',
//         status: 'accepted',
//         appliedAt: '2024-01-18T09:45:00Z'
//       }
//     ]
//   },
//   {
//     _id: '2',
//     title: 'Science Classes for Grade 8',
//     grade: '8th Grade',
//     subjects: ['Physics', 'Chemistry', 'Biology'],
//     tuitionType: 'offline',
//     status: 'open',
//     isActive: true,
//     totalFee: 3000,
//     applications: [
//       {
//         _id: 'app4',
//         tutor: {
//           _id: 'tutor4',
//           name: 'Dr. Ananya Singh',
//           email: 'ananya.singh@example.com',
//           qualifications: ['Ph.D Physics', 'M.Sc Chemistry'],
//           experience: '12 years',
//           rating: 4.7,
//           subjects: ['Physics', 'Chemistry'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
//           location: 'Kolkata',
//           hourlyRate: 550,
//           totalStudents: 180,
//           bio: 'Dual-subject expert with research background and practical teaching approach.'
//         },
//         proposedRate: 3200,
//         message: 'I can provide comprehensive science tutoring with hands-on experiments and demonstrations.',
//         status: 'pending',
//         appliedAt: '2024-01-22T16:15:00Z'
//       },
//       {
//         _id: 'app5',
//         tutor: {
//           _id: 'tutor5',
//           name: 'Rohan Verma',
//           email: 'rohan.verma@example.com',
//           qualifications: ['M.Sc Biology', 'B.Ed'],
//           experience: '6 years',
//           rating: 4.5,
//           subjects: ['Biology', 'Environmental Science'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
//           location: 'Pune',
//           hourlyRate: 400,
//           totalStudents: 100,
//           bio: 'Biology specialist with focus on conceptual understanding and exam preparation.'
//         },
//         proposedRate: 2800,
//         message: 'Specialized in biology with interactive teaching methods and visual aids.',
//         status: 'rejected',
//         appliedAt: '2024-01-21T10:30:00Z'
//       }
//     ]
//   },
//   {
//     _id: '3',
//     title: 'English Literature for Grade 12',
//     grade: '12th Grade',
//     subjects: ['English Literature'],
//     tuitionType: 'hybrid',
//     status: 'in-progress',
//     isActive: true,
//     totalFee: 4000,
//     applications: [
//       {
//         _id: 'app6',
//         tutor: {
//           _id: 'tutor6',
//           name: 'Meera Das',
//           email: 'meera.das@example.com',
//           qualifications: ['MA English', 'PhD Literature'],
//           experience: '15 years',
//           rating: 4.9,
//           subjects: ['English Literature', 'Creative Writing'],
//           avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
//           location: 'Chennai',
//           hourlyRate: 700,
//           totalStudents: 250,
//           bio: 'Literature expert with focus on critical analysis and creative expression.'
//         },
//         proposedRate: 3800,
//         message: 'Specialized in Shakespeare and modern literature analysis with emphasis on writing skills.',
//         status: 'accepted',
//         appliedAt: '2024-01-17T14:20:00Z'
//       }
//     ]
//   }
// ];

const AppliedTutorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [expandedTuition, setExpandedTuition] = useState(null);
  

  const { data, isLoading, error } = useGetMyTuitionsQuery();
  

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
              to="/my-tuitions"
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