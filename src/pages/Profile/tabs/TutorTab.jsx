import React from 'react';
import { 
  FaBook, FaDollarSign, FaStar, FaAward, 
  FaClock, FaChalkboardTeacher 
} from 'react-icons/fa';
import { getDayName } from '../profileHelpers';

const TutorTab = ({ user }) => {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<FaBook className="w-8 h-8 text-primary" />}
          label="Subjects"
          value={user.tutorProfile?.subjects?.length || 0}
        />
        
        <StatCard
          icon={<FaDollarSign className="w-8 h-8 text-green-500" />}
          label="Hourly Rate"
          value={`₹${user.tutorProfile?.hourlyRate || 'Not set'}`}
        />
        
        <StatCard
          icon={<FaStar className="w-8 h-8 text-yellow-500" />}
          label="Rating"
          value={`${user.tutorProfile?.rating || 0}/5`}
        />
      </div>


      {user.tutorProfile?.subjects?.length > 0 && (
        <SubjectsSection subjects={user.tutorProfile.subjects} />
      )}

   
      {user.tutorProfile?.qualifications?.length > 0 && (
        <QualificationsSection qualifications={user.tutorProfile.qualifications} />
      )}


      {user.tutorProfile?.availability?.length > 0 && (
        <AvailabilitySection availability={user.tutorProfile.availability} />
      )}


      {user.tutorProfile?.bio && (
        <BioSection bio={user.tutorProfile.bio} />
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <div className="flex items-center">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="text-lg font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  </div>
);

const SubjectsSection = ({ subjects }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">Subjects</h3>
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject, index) => (
        <span 
          key={index} 
          className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
        >
          {subject}
        </span>
      ))}
    </div>
  </div>
);

const QualificationsSection = ({ qualifications }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaAward className="w-5 h-5 mr-2 text-primary" />
      Qualifications
    </h3>
    <ul className="space-y-2">
      {qualifications.map((qual, index) => (
        <li key={index} className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
          <span className="text-text-primary">{qual}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AvailabilitySection = ({ availability }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaClock className="w-5 h-5 mr-2 text-primary" />
      Availability
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {availability.map((slot, index) => (
        <div key={index} className="p-3 rounded-lg bg-hover-bg">
          <p className="font-medium text-text-primary">
            {getDayName(slot.day)}
          </p>
          <p className="text-sm text-text-secondary">
            {slot.from} - {slot.to}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const BioSection = ({ bio }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">About Me</h3>
    <p className="whitespace-pre-line text-text-primary">
      {bio}
    </p>
  </div>
);

export default TutorTab;