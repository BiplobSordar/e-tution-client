import React from 'react';
import { FaCalendar, FaEdit, FaLock } from 'react-icons/fa';

const DetailsTab = ({ user }) => {
  return (
    <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
      <h3 className="text-xl font-semibold mb-6 text-text-primary">Account Details</h3>
      
      <div className="space-y-4">
        <DetailItem
          icon={<FaCalendar className="w-5 h-5 text-text-secondary" />}
          label="Account Created"
          value={new Date(user.createdAt).toLocaleString()}
        />
        
        <DetailItem
          icon={<FaEdit className="w-5 h-5 text-text-secondary" />}
          label="Profile Last Updated"
          value={new Date(user.updatedAt).toLocaleString()}
        />
        
        {user.adminProfile?.lastLogin && (
          <DetailItem
            icon={<FaLock className="w-5 h-5 text-text-secondary" />}
            label="Last Login"
            value={new Date(user.adminProfile.lastLogin).toLocaleString()}
          />
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-hover-bg">
    <div>
      <p className="font-medium text-text-primary">{label}</p>
      <p className="text-sm text-text-secondary">{value}</p>
    </div>
    {icon}
  </div>
);

export default DetailsTab;