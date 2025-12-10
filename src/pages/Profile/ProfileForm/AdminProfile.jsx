import React from 'react';
import { FaUserShield } from 'react-icons/fa';

const AdminProfile = ({ register }) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
      <FaUserShield className="w-5 h-5 mr-2 text-primary" />
      Administrator Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AdminField
        label="Department"
        name="adminProfile.department"
        register={register}
        placeholder="e.g., Administration, Support, Academic"
      />
    </div>
  </div>
);

const AdminField = ({ label, name, register, placeholder }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type="text"
      {...register(name)}
      className="form-input"
      placeholder={placeholder}
    />
  </div>
);

export default AdminProfile;