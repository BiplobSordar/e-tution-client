import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProfileFormModal = ({ isOpen, onClose, children, title = 'Profile Form' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
   
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-card-bg rounded-2xl shadow-lg border border-border">
      
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer rounded-lg hover:bg-hover-bg transition-colors"
              aria-label="Close"
            >
              <FaTimes className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          
         
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormModal;