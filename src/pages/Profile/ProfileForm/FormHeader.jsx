import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const FormHeader = ({ mode, onCancel, isSubmitting }) => (
  <div className="border-b border-border pb-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {mode === 'create' ? 'Complete Your Profile' : 'Edit Profile'}
        </h2>
        <p className="text-text-secondary mt-1">
          {mode === 'create' 
            ? 'Please fill in your details to complete your profile' 
            : 'Update your profile information'}
        </p>
      </div>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline flex items-center"
        >
          <FaTimes className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center"
        >
          <FaSave className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
);

export default FormHeader;