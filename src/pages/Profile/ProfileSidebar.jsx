import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendar, FaShieldAlt 
} from 'react-icons/fa';

const ProfileSidebar = ({ user }) => {
  return (
    <div className="lg:col-span-1 space-y-6">
    
      <ContactCard user={user} />
      
  
      <AccountCard user={user} />
      

      {user.dateOfBirth && (
        <DateOfBirthCard dateOfBirth={user.dateOfBirth} />
      )}
    </div>
  );
};

const ContactCard = ({ user }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaEnvelope className="w-5 h-5 mr-2 text-primary" />
      Contact Information
    </h3>
    
    <div className="space-y-4">
      {user.phone && (
        <ContactItem icon={<FaPhone />} label="Phone" value={user.phone} />
      )}
      
      <ContactItem icon={<FaEnvelope />} label="Email" value={user.email} />
      
      {user.address && (
        <ContactItem 
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={`${user.address.street ? `${user.address.street}, ` : ''}
                  ${user.address.city ? `${user.address.city}, ` : ''}
                  ${user.address.state ? `${user.address.state}, ` : ''}
                  ${user.address.country || ''}
                  ${user.address.zipCode ? ` - ${user.address.zipCode}` : ''}`}
        />
      )}
    </div>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-text-secondary">
      {icon}
    </div>
    <div>
      <p className="font-medium text-text-primary">{label}</p>
      <p className="text-text-secondary">{value}</p>
    </div>
  </div>
);

const AccountCard = ({ user }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaShieldAlt className="w-5 h-5 mr-2 text-primary" />
      Account Information
    </h3>
    <div className="space-y-3">
      <AccountItem label="Member Since" value={user.createdAt} />
      <AccountItem label="Last Updated" value={user.updatedAt} />
      <AccountItem label="User ID" value={user.uid} />
    </div>
  </div>
);

const AccountItem = ({ label, value }) => {
  const formatDate = (dateString) => {
    if (label === 'User ID') return value;
    
    return new Date(value).toLocaleDateString('en-US', {
      year: label === 'Last Updated' ? undefined : 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary">
        {formatDate(value)}
      </span>
    </div>
  );
};

const DateOfBirthCard = ({ dateOfBirth }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
      <FaCalendar className="w-5 h-5 mr-2 text-primary" />
      Date of Birth
    </h3>
    <p className="text-text-secondary">
      {new Date(dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </p>
  </div>
);

export default ProfileSidebar;