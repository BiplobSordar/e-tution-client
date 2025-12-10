import React from 'react';
import { FaExclamationCircle, FaPlusCircle } from 'react-icons/fa';

const ProfileCompletionBanner = ({ setFormMode, setShowFormModal }) => {
  return (
    <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaExclamationCircle className="w-5 h-5 text-warning mr-3" />
          <div>
            <h3 className="font-semibold text-text-primary">Complete Your Profile</h3>
            <p className="text-sm text-text-secondary">
              Your profile is incomplete. Please add more information to get the full experience.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setFormMode('create');
            setShowFormModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <FaPlusCircle className="w-4 h-4 mr-2" />
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;