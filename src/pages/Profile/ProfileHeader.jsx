import React from 'react';
import { 
  FaEnvelope, FaPhone, FaEdit, FaTimes 
} from 'react-icons/fa';
import { getRoleIcon, getRoleColor, getStatusIcon, getStatusColor } from './profileHelpers';

const ProfileHeader = ({ user, activeTab, setActiveTab, setShowFormModal }) => {
  const tabs = ['overview', 'profile', 'details'];
  

  if (user.role === 'teacher') tabs.push('tutor');
  if (user.role === 'student') tabs.push('student');
  if (user.role === 'guardian') tabs.push('guardian');

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden mb-8 bg-card-bg border border-border">
      <div className="relative h-48 bg-gradient-to-r from-primary to-indigo-600">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowFormModal(true)}
            className="btn-primary flex items-center"
          >
            <FaEdit className="w-4 h-4 mr-2" />
            Edit
          </button>
        </div>
      </div>
      
      <div className="relative px-4 sm:px-8 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16">

          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={user.avatarUrl||'/profile.avif'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/profile.avif`;
                  }}
                />
              </div>
              <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                user.status === 'active' ? 'bg-green-500' :
                user.status === 'pending' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
            </div>
          </div>
          
       
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center mt-2 gap-4">
                  <div className="flex items-center text-text-secondary">
                    <FaEnvelope className="w-4 h-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-text-secondary">
                      <FaPhone className="w-4 h-4 mr-2" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
   
              <div className="mt-4 md:mt-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    <span className="ml-2 capitalize">{user.role}</span>
                  </span>
                  
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                    {getStatusIcon(user.status)}
                    <span className="ml-2 capitalize">{user.status}</span>
                  </span>
                </div>
              </div>
            </div>
   
            <div className="mt-6 border-b border-border">
              <nav className="flex flex-wrap space-x-8">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ tab, activeTab, setActiveTab }) => {
  const tabLabels = {
    overview: 'Overview',
    profile: 'Profile',
    details: 'Details',
    tutor: 'Tutor Info',
    student: 'Academic Info',
    guardian: 'Guardian Info'
  };

  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
        activeTab === tab
          ? 'border-primary text-primary'
          : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
      }`}
    >
      {tabLabels[tab] || tab}
    </button>
  );
};

export default ProfileHeader;