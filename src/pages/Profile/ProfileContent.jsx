import React from 'react';
import OverviewTab from './tabs/OverviewTab';
import ProfileTab from './tabs/ProfileTab';
import DetailsTab from './tabs/DetailsTab';
import TutorTab from './tabs/TutorTab';
import StudentTab from './tabs/StudentTab';
import GuardianTab from './tabs/GuardianTab';

const ProfileContent = ({ user, activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} />;
      case 'profile':
        return <ProfileTab user={user} />;
      case 'details':
        return <DetailsTab user={user} />;
      case 'teacher':
        return user.role === 'teacher' ? <TutorTab user={user} /> : null;
      case 'student':
        return user.role === 'student' ? <StudentTab user={user} /> : null;
      case 'guardian':
        return user.role === 'guardian' ? <GuardianTab user={user} /> : null;
      default:
        return <OverviewTab user={user} />;
    }
  };

  return (
    <div className="lg:col-span-2">
      {renderTabContent()}
    </div>
  );
};

export default ProfileContent;