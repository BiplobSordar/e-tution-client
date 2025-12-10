import React from 'react';
import { 
  FaUsers, FaBriefcase, FaPhone, 
  FaGraduationCap, FaUserFriends 
} from 'react-icons/fa';

const GuardianTab = ({ user }) => {
  return (
    <div className="space-y-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
          <div className="flex items-center">
            <FaUsers className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Students Under Care</p>
              <p className="text-lg font-semibold text-text-primary">
                {user.guardianOf?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        {user.guardianProfile?.occupation && (
          <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
            <div className="flex items-center">
              <FaBriefcase className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Occupation</p>
                <p className="text-lg font-semibold text-text-primary">
                  {user.guardianProfile.occupation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>


      {user.guardianProfile?.emergencyContact && (
        <EmergencyContactSection contact={user.guardianProfile.emergencyContact} />
      )}


      {user.guardianOf?.length > 0 && (
        <StudentsUnderCareSection students={user.guardianOf} />
      )}
    </div>
  );
};

const EmergencyContactSection = ({ contact }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">Emergency Contact</h3>
    <div className="flex items-center p-3 bg-hover-bg rounded-lg">
      <FaPhone className="w-5 h-5 text-primary mr-3" />
      <span className="text-text-primary">{contact}</span>
    </div>
  </div>
);

const StudentsUnderCareSection = ({ students }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">Students Under Care</h3>
    <div className="space-y-3">
      {students.map((studentId, index) => (
        <div key={index} className="flex items-center p-3 rounded-lg bg-hover-bg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <FaGraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-text-primary">Student {index + 1}</p>
            <p className="text-sm text-text-secondary">ID: {studentId}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GuardianTab;