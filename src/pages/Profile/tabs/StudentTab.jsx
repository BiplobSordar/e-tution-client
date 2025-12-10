import React from 'react';
import { 
  FaSchool, FaBullseye, FaUsers, 
  FaGraduationCap, FaUserGraduate 
} from 'react-icons/fa';

const StudentTab = ({ user }) => {
  return (
    <div className="space-y-6">
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
          <div className="flex items-center mb-4">
            <FaSchool className="w-8 h-8 text-secondary mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Grade & School</p>
              <p className="text-lg font-semibold text-text-primary">
                {user.studentProfile?.grade || 'Not specified'}
                {user.studentProfile?.school && ` • ${user.studentProfile.school}`}
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
          <div className="flex items-center mb-4">
            <FaBullseye className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Learning Goals</p>
              <p className="text-lg font-semibold text-text-primary">
                {user.studentProfile?.learningGoals?.length || 0} Goals
              </p>
            </div>
          </div>
        </div>
      </div>

    
      {user.studentProfile?.subjectsInterested?.length > 0 && (
        <SubjectsInterestedSection subjects={user.studentProfile.subjectsInterested} />
      )}

      {user.studentProfile?.learningGoals?.length > 0 && (
        <LearningGoalsSection goals={user.studentProfile.learningGoals} />
      )}


      {user.guardians?.length > 0 && (
        <GuardiansSection guardians={user.guardians} />
      )}
    </div>
  );
};

const SubjectsInterestedSection = ({ subjects }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">Subjects Interested</h3>
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject, index) => (
        <span 
          key={index} 
          className="px-4 py-2 rounded-full font-medium bg-secondary/10 text-secondary border border-secondary/20"
        >
          {subject}
        </span>
      ))}
    </div>
  </div>
);

const LearningGoalsSection = ({ goals }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 text-text-primary">Learning Goals</h3>
    <div className="space-y-3">
      {goals.map((goal, index) => (
        <div 
          key={index} 
          className="flex items-start p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50"
        >
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
          <span className="text-purple-700 dark:text-purple-300">{goal}</span>
        </div>
      ))}
    </div>
  </div>
);

const GuardiansSection = ({ guardians }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaUsers className="w-5 h-5 mr-2 text-primary" />
      Guardians
    </h3>
    <div className="space-y-4">
      {guardians.map((guardian, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-hover-bg">
          <div>
            <p className="font-medium text-text-primary">
              {guardian.relation || 'Guardian'}
            </p>
            <p className="text-sm text-text-secondary">
              Can view progress: {guardian.canViewProgress ? 'Yes' : 'No'}
            </p>
          </div>
          <span className="text-sm text-text-secondary">
            Added: {new Date(guardian.addedAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default StudentTab;