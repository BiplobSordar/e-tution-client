import React from 'react';
import { FaHome } from 'react-icons/fa';

const ProfileTab = ({ user }) => {
  return (
    <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
      <h3 className="text-xl font-semibold mb-6 text-text-primary">Personal Information</h3>
      
      <div className="space-y-6">

        <div>
          <h4 className="font-medium mb-3 text-text-primary">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Full Name</p>
              <p className="font-medium text-text-primary">{user.name}</p>
            </div>
            {user.dateOfBirth && (
              <div>
                <p className="text-sm text-text-secondary">Date of Birth</p>
                <p className="font-medium text-text-primary">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>


        {user.address && (
          <AddressSection address={user.address} />
        )}
      </div>
    </div>
  );
};

const AddressSection = ({ address }) => (
  <div>
    <h4 className="font-medium mb-3 flex items-center text-text-primary">
      <FaHome className="w-5 h-5 mr-2 text-primary" />
      Address Details
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {address.street && (
        <AddressField label="Street" value={address.street} />
      )}
      {address.city && (
        <AddressField label="City" value={address.city} />
      )}
      {address.state && (
        <AddressField label="State" value={address.state} />
      )}
      {address.country && (
        <AddressField label="Country" value={address.country} />
      )}
      {address.zipCode && (
        <AddressField label="ZIP Code" value={address.zipCode} />
      )}
    </div>
  </div>
);

const AddressField = ({ label, value }) => (
  <div>
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="font-medium text-text-primary">{value}</p>
  </div>
);

export default ProfileTab;