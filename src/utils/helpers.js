import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
  FaUserShield,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <FaCheckCircle className="w-4 h-4" />;
    case 'pending': return <FaExclamationCircle className="w-4 h-4" />;
    case 'suspended': return <FaExclamationTriangle className="w-4 h-4" />;
    default: return <FaExclamationCircle className="w-4 h-4" />;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'status-badge-active';
    case 'pending': return 'status-badge-pending';
    case 'suspended': return 'status-badge-suspended';
    default: return 'status-badge-default';
  }
};

export const getRoleIcon = (role) => {
  switch (role) {
    case 'tutor': return <FaChalkboardTeacher className="w-4 h-4" />;
    case 'student': return <FaUserGraduate className="w-4 h-4" />;
    case 'guardian': return <FaUserFriends className="w-4 h-4" />;
    case 'admin': return <FaUserShield className="w-4 h-4" />;
    default: return <FaUser className="w-4 h-4" />;
  }
};

export const getRoleColor = (role) => {
  switch (role) {
    case 'tutor': return 'role-badge-tutor';
    case 'student': return 'role-badge-student';
    case 'guardian': return 'role-badge-guardian';
    case 'admin': return 'role-badge-admin';
    default: return 'role-badge-default';
  }
};

export const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber] || 'Unknown';
};