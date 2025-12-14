import React from 'react';
import { 
  FaChalkboardTeacher, FaUserGraduate, FaUserFriends, 
  FaUserShield, FaCheckCircle, FaExclamationCircle,
  FaExclamationTriangle 
} from 'react-icons/fa';

const OverviewTab = ({ user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-xl font-semibold mb-6 text-text-primary">Overview</h3>
        
        <div className="space-y-4">
     
          {user.role === 'teacher' && user.tutorProfile && (
            <TutorOverview tutorProfile={user.tutorProfile} />
          )}
          
          {user.role === 'student' && user.studentProfile && (
            <StudentOverview studentProfile={user.studentProfile} />
          )}
          
          {user.role === 'guardian' && user.guardianProfile && (
            <GuardianOverview guardianProfile={user.guardianProfile} guardianOf={user.guardianOf} />
          )}
          
          {user.role === 'admin' && user.adminProfile && (
            <AdminOverview adminProfile={user.adminProfile} />
          )}
          
   
          {user.statusHistory?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-text-primary">Recent Status Changes</h4>
              <div className="space-y-3">
                {user.statusHistory.slice(0, 3).map((history, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-hover-bg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(history.status)}`}></div>
                      <div>
                        <span className="font-medium capitalize text-text-primary">{history.status}</span>
                        {history.reason && <p className="text-sm text-text-secondary">{history.reason}</p>}
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">
                      {new Date(history.changedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const TutorOverview = ({ tutorProfile }) => (
  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
    <h4 className="font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-300">
      <FaChalkboardTeacher className="w-5 h-5 mr-2" />
      Tutor Profile
    </h4>
    <p className="text-blue-700 dark:text-blue-400">
      Specializes in {tutorProfile.subjects?.length || 0} subjects with {tutorProfile.experienceYears || 0} years of teaching experience.
      {tutorProfile.hourlyRate && ` Hourly rate: ₹${tutorProfile.hourlyRate}`}
    </p>
  </div>
);

const StudentOverview = ({ studentProfile }) => (
  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50">
    <h4 className="font-semibold mb-2 flex items-center text-green-800 dark:text-green-300">
      <FaUserGraduate className="w-5 h-5 mr-2" />
      Student Profile
    </h4>
    <p className="text-green-700 dark:text-green-400">
      {studentProfile.grade && `Grade: ${studentProfile.grade}`}
      {studentProfile.school && ` at ${studentProfile.school}`}
      {studentProfile.subjectsInterested?.length > 0 && 
        ` • Interested in ${studentProfile.subjectsInterested.length} subjects`}
    </p>
  </div>
);

const GuardianOverview = ({ guardianProfile, guardianOf }) => (
  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
    <h4 className="font-semibold mb-2 flex items-center text-purple-800 dark:text-purple-300">
      <FaUserFriends className="w-5 h-5 mr-2" />
      Guardian Profile
    </h4>
    <p className="text-purple-700 dark:text-purple-400">
      {guardianProfile.occupation && `Occupation: ${guardianProfile.occupation}`}
      {guardianOf?.length > 0 && ` • Caring for ${guardianOf.length} students`}
    </p>
  </div>
);

const AdminOverview = ({ adminProfile }) => (
  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50">
    <h4 className="font-semibold mb-2 flex items-center text-red-800 dark:text-red-300">
      <FaUserShield className="w-5 h-5 mr-2" />
      Administrator
    </h4>
    <p className="text-red-700 dark:text-red-400">
      {adminProfile.department && `Department: ${adminProfile.department}`}
      {adminProfile.lastLogin && 
        ` • Last login: ${new Date(adminProfile.lastLogin).toLocaleDateString()}`}
    </p>
  </div>
);

export default OverviewTab;