
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationDetails from './components/ApplicationDetails';

const ApplicationDetailsPage = () => {
  const { tuitionId, applicationId } = useParams();
  const navigate = useNavigate();
  
 
  // const dummyApplication = {
  //   _id: applicationId,
  //   tutor: {
  //     _id: 'tutor1',
  //     name: 'Dr. Rajesh Kumar',
  //     email: 'rajesh.kumar@example.com',
  //     phone: '+91 98765 43210',
  //     qualifications: ['M.Sc Mathematics', 'B.Ed', 'CTET Certified'],
  //     experience: '8 years',
  //     rating: 4.8,
  //     totalReviews: 42,
  //     subjects: ['Mathematics', 'Algebra', 'Calculus', 'Trigonometry', 'Statistics'],
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  //     location: 'New Delhi',
  //     hourlyRate: 500,
  //     totalStudents: 150,
  //     bio: 'Experienced mathematics teacher with 8+ years of teaching CBSE curriculum. Specialized in making complex concepts easy to understand. My teaching methodology focuses on building strong fundamentals and problem-solving skills. I believe in interactive learning where students are encouraged to ask questions and participate actively.',
  //     teachingApproach: 'Interactive sessions with digital whiteboard, real-life examples, and regular assessments',
  //     availability: 'Weekdays 4-8 PM, Weekends 10 AM-6 PM',
  //     languages: ['English', 'Hindi'],
  //     education: [
  //       { degree: 'M.Sc Mathematics', university: 'Delhi University', year: '2015' },
  //       { degree: 'B.Ed', university: 'IGNOU', year: '2016' }
  //     ],
  //     certification: ['CTET', 'Google Certified Educator']
  //   },
  //   proposedRate: 2800,
  //   message: 'I have extensive experience teaching CBSE Mathematics for 8 years. My students have consistently shown improvement in their grades. I prefer interactive online sessions with digital whiteboard, where we can solve problems together and I can provide instant feedback. I also provide weekly progress reports and customized study materials.',
  //   status: 'pending',
  //   appliedAt: '2024-01-20T14:30:00Z',
  //   proposedSchedule: [
  //     { day: 'Monday', time: '4:00 PM - 6:00 PM', mode: 'Online' },
  //     { day: 'Wednesday', time: '4:00 PM - 6:00 PM', mode: 'Online' },
  //     { day: 'Saturday', time: '10:00 AM - 12:00 PM', mode: 'Online' }
  //   ]
  // };
  
  // const dummyTuition = {
  //   _id: tuitionId,
  //   title: 'Mathematics Tutoring for Grade 10',
  //   grade: '10th Grade',
  //   subjects: ['Mathematics', 'Algebra', 'Trigonometry'],
  //   totalFee: 2500,
  //   status: 'open'
  // };
  
  const handleBack = () => {
    navigate('/applied-tutors');
  };
  
  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="btn-outline mb-6 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Applied Tutors
        </button>
        
        <ApplicationDetails
          application={dummyApplication}
          tuition={dummyTuition}
          isDemo={true}
        />
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;