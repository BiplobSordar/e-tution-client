
import React from 'react';
import {
  FaChalkboardTeacher, FaUserGraduate,
  FaUserFriends, FaUserShield
} from 'react-icons/fa';

const RoleSelection = ({ selectedRole, setSelectedRole, userRole }) => {
  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: <FaUserGraduate className="w-6 h-6" />,
      description: 'Learn from tutors'
    },
    {
      id: 'teacher',
      label: 'Tutor',
      icon: <FaChalkboardTeacher className="w-6 h-6" />,
      description: 'Teach students'
    },
    {
      id: 'guardian',
      label: 'Guardian',
      icon: <FaUserFriends className="w-6 h-6" />,
      description: 'Monitor students'
    },
    {
      id: 'admin',
      label: 'Administrator',
      icon: <FaUserShield className="w-6 h-6" />,
      description: 'Manage platform'
    }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
        Select Your Role
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={`p-4  cursor-pointer rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${selectedRole === role.id
                ? 'border-primary bg-primary-light'
                : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
            disabled={role.id != userRole}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${selectedRole === role.id ? 'bg-primary text-white' : 'bg-hover-bg text-text-secondary'
              }`}>
              {role.icon}
            </div>
            <span className="font-medium">{role.label}</span>
            <span className="text-sm text-text-secondary mt-1 text-center">
              {role.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;