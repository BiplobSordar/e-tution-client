import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

const GuardianProfile = ({ register }) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
      <FaUserFriends className="w-5 h-5 mr-2 text-primary" />
      Guardian Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GuardianField
        label="Occupation"
        name="guardianProfile.occupation"
        register={register}
        placeholder="e.g., Software Engineer, Doctor"
      />
      
      <GuardianField
        label="Emergency Contact Number"
        name="guardianProfile.emergencyContact"
        register={register}
        type="tel"
        placeholder="+1 234 567 8900"
      />
    </div>
  </div>
);

const GuardianField = ({ label, name, register, type = 'text', placeholder }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="form-input"
      placeholder={placeholder}
    />
  </div>
);

export default GuardianProfile;