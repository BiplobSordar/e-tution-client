import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar,
  FaBook, FaDollarSign, FaClock, FaStar, FaUsers, 
  FaShieldAlt, FaBriefcase, FaAward, FaBullseye, 
  FaGraduationCap, FaFileAlt, FaHome, FaSchool, 
  FaEdit, FaSave, FaTimes, FaCheckCircle, FaExclamationCircle,
  FaExclamationTriangle, FaLock, FaChalkboardTeacher,
  FaUserGraduate, FaUserFriends, FaUserShield
} from 'react-icons/fa';
import ProfileForm from '../components/ProfileForm';
import ProfileFormModal from '../components/ProfileFormModal';


const ProfilePage = ({ userId='admin', currentUser }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
 const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('edit'); // 'edit' or 'create'

  // Dummy data for all user types
  const dummyUsers = {
    student: {
      _id: 'student123',
      uid: 'STU2024001',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@student.com',
      phone: '+919876543210',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      role: 'student',
      studentProfile: {
        grade: '12th Grade',
        school: 'Delhi Public School',
        subjectsInterested: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
        learningGoals: [
          'Score 95% in board exams',
          'Clear IIT JEE entrance',
          'Improve problem-solving skills',
          'Master calculus concepts'
        ],
        guardianContact: 'parents@email.com'
      },
      guardians: [
        {
          guardianId: 'guardian1',
          relation: 'Father',
          canViewProgress: true,
          addedAt: '2024-01-15T10:30:00Z'
        },
        {
          guardianId: 'guardian2',
          relation: 'Mother',
          canViewProgress: true,
          addedAt: '2024-01-15T10:30:00Z'
        }
      ],
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'New registration', changedAt: '2024-01-10T09:15:30Z' },
        { status: 'active', reason: 'Profile completed', changedAt: '2024-01-11T14:20:45Z' }
      ],
      dateOfBirth: '2006-05-15T00:00:00Z',
      address: {
        street: '45, Sector 14',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        zipCode: '201301'
      },
      createdAt: '2024-01-10T09:15:30Z',
      updatedAt: '2024-01-20T16:45:22Z'
    },
    tutor: {
      _id: 'tutor456',
      uid: 'TUT2024001',
      name: 'Dr. Priya Patel',
      email: 'priya.patel@tutor.com',
      phone: '+919012345678',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      role: 'tutor',
      tutorProfile: {
        subjects: ['Mathematics', 'Physics', 'Advanced Calculus'],
        hourlyRate: 1200,
        experienceYears: 8,
        bio: 'PhD in Mathematics with 8 years of teaching experience. Specialized in JEE and NEET preparation.',
        qualifications: ['PhD Mathematics', 'M.Sc Physics', 'B.Ed'],
        rating: 4.8,
        totalReviews: 156,
        availability: [
          { day: 1, from: '09:00', to: '17:00' }, // Monday
          { day: 2, from: '09:00', to: '17:00' }, // Tuesday
          { day: 3, from: '14:00', to: '20:00' }, // Wednesday
          { day: 5, from: '10:00', to: '18:00' }, // Friday
          { day: 6, from: '09:00', to: '15:00' }  // Saturday
        ]
      },
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'Application submitted', changedAt: '2023-12-01T10:00:00Z' },
        { status: 'active', reason: 'Verified and approved', changedAt: '2023-12-05T14:30:00Z' }
      ],
      dateOfBirth: '1988-08-20T00:00:00Z',
      address: {
        street: 'B-12, South Extension',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110049'
      },
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    guardian: {
      _id: 'guardian789',
      uid: 'GUA2024001',
      name: 'Mr. Amit Verma',
      email: 'amit.verma@email.com',
      phone: '+919988776655',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
      role: 'guardian',
      guardianProfile: {
        occupation: 'Software Engineer',
        emergencyContact: '+919900112233',
        studentsUnderCare: ['student123', 'student456']
      },
      guardianOf: ['student123'],
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'Registration', changedAt: '2024-01-05T11:20:00Z' },
        { status: 'active', reason: 'Email verified', changedAt: '2024-01-05T12:00:00Z' }
      ],
      dateOfBirth: '1980-03-10T00:00:00Z',
      address: {
        street: 'H-45, GK Enclave',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110048'
      },
      createdAt: '2024-01-05T11:20:00Z',
      updatedAt: '2024-01-20T10:15:00Z'
    },
    admin: {
      _id: 'admin101',
      uid: 'ADM2024001',
      name: 'Mrs. Anjali Kapoor',
      email: 'admin@etution.com',
      phone: '+919001122334',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      role: 'admin',
      adminProfile: {
        department: 'Administration',
        lastLogin: '2024-01-20T09:30:00Z'
      },
      status: 'active',
      statusHistory: [
        { status: 'active', reason: 'System admin', changedAt: '2023-11-01T09:00:00Z' }
      ],
      dateOfBirth: '1985-12-25T00:00:00Z',
      address: {
        street: 'Corporate Office, Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        zipCode: '201309'
      },
      createdAt: '2023-11-01T09:00:00Z',
      updatedAt: '2024-01-20T09:30:00Z'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let userType = 'student';
      if (userId === 'tutor') userType = 'tutor';
      else if (userId === 'guardian') userType = 'guardian';
      else if (userId === 'admin') userType = 'admin';
      
      const fetchedUser = dummyUsers[userType];
      setUser(fetchedUser);
      setLoading(false);
      
      // Check if profile needs completion (simulated check)
      const isProfileComplete = checkProfileCompleteness(fetchedUser);
      if (!isProfileComplete && currentUser?._id === fetchedUser?._id) {
        setFormMode('create');
        setShowFormModal(true);
      }
    }, 500);
  }, [userId]);

  const checkProfileCompleteness = (userData) => {
    if (!userData) return false;
    
    // Basic checks based on role
    switch (userData.role) {
      case 'tutor':
        return userData.tutorProfile?.subjects?.length > 0;
      case 'student':
        return userData.studentProfile?.grade && userData.studentProfile?.school;
      case 'guardian':
        return userData.guardianProfile?.occupation;
      default:
        return true;
    }
  };

  const handleSave = async (updatedData) => {
    // Simulate API call
    console.log('Saving data:', updatedData);
    
    // Update user state with new data
    setUser(prev => ({
      ...prev,
      ...updatedData,
      [updatedData.role + 'Profile']: updatedData[updatedData.role + 'Profile']
    }));
    
    setShowFormModal(false);
    
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setShowFormModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheckCircle className="w-4 h-4" />;
      case 'pending': return <FaExclamationCircle className="w-4 h-4" />;
      case 'suspended': return <FaExclamationTriangle className="w-4 h-4" />;
      default: return <FaExclamationCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-badge-active';
      case 'pending': return 'status-badge-pending';
      case 'suspended': return 'status-badge-suspended';
      default: return 'status-badge-default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'tutor': return <FaChalkboardTeacher className="w-4 h-4" />;
      case 'student': return <FaUserGraduate className="w-4 h-4" />;
      case 'guardian': return <FaUserFriends className="w-4 h-4" />;
      case 'admin': return <FaUserShield className="w-4 h-4" />;
      default: return <FaUser className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'tutor': return 'role-badge-tutor';
      case 'student': return 'role-badge-student';
      case 'guardian': return 'role-badge-guardian';
      case 'admin': return 'role-badge-admin';
      default: return 'role-badge-default';
    }
  };

  const isProfileComplete = user ? checkProfileCompleteness(user) : false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <FaExclamationCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">User not found</h3>
          <p className="text-text-secondary">The requested profile could not be loaded.</p>
        </div>
      </div>
    );
  }
  return (
    <>
    <div className="min-h-screen bg-bg text-text-primary transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {!isProfileComplete && currentUser?._id === user._id && (
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
          )}
        {/* Header Section */}
        <div className="rounded-2xl shadow-lg overflow-hidden mb-8 bg-card-bg border border-border">
          <div className="relative h-48 bg-gradient-to-r from-primary to-indigo-600">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setShowFormModal(!showFormModal)}
                className="btn-primary flex items-center"
              >
                {editMode ? (
                  <>
                    <FaTimes className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <FaEdit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="relative px-4 sm:px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff&size=128`;
                      }}
                    />
                  </div>
                  <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                    user.status === 'active' ? 'bg-green-500' :
                    user.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                </div>
              </div>
              
              {/* User Info */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                      {user.name}
                    </h1>
                    <div className="flex flex-wrap items-center mt-2 gap-4">
                      <div className="flex items-center text-text-secondary">
                        <FaEnvelope className="w-4 h-4 mr-2" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center text-text-secondary">
                          <FaPhone className="w-4 h-4 mr-2" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Role & Status Badges */}
                  <div className="mt-4 md:mt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-2 capitalize">{user.role}</span>
                      </span>
                      
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="ml-2 capitalize">{user.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Tabs Navigation */}
                <div className="mt-6 border-b border-border">
                  <nav className="flex flex-wrap space-x-8">
                    {['overview', 'profile', 'details'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                          activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                    
                    {/* Role-specific tabs */}
                    {user.role === 'tutor' && (
                      <button
                        onClick={() => setActiveTab('tutor')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                          activeTab === 'tutor'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        Tutor Info
                      </button>
                    )}
                    
                    {user.role === 'student' && (
                      <button
                        onClick={() => setActiveTab('student')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                          activeTab === 'student'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        Academic Info
                      </button>
                    )}
                    
                    {user.role === 'guardian' && (
                      <button
                        onClick={() => setActiveTab('guardian')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                          activeTab === 'guardian'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        Guardian Info
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <FaEnvelope className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {user.phone && (
                  <div className="flex items-start">
                    <FaPhone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-text-secondary" />
                    <div>
                      <p className="font-medium text-text-primary">Phone</p>
                      <p className="text-text-secondary">{user.phone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <FaEnvelope className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-text-secondary" />
                  <div>
                    <p className="font-medium text-text-primary">Email</p>
                    <p className="text-text-secondary">{user.email}</p>
                  </div>
                </div>
                
                {user.address && (
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-text-secondary" />
                    <div>
                      <p className="font-medium text-text-primary">Address</p>
                      <p className="text-text-secondary">
                        {user.address.street && `${user.address.street}, `}
                        {user.address.city && `${user.address.city}, `}
                        {user.address.state && `${user.address.state}, `}
                        {user.address.country && `${user.address.country}`}
                        {user.address.zipCode && ` - ${user.address.zipCode}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Information Card */}
            <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <FaShieldAlt className="w-5 h-5 mr-2 text-primary" />
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Member Since</span>
                  <span className="font-medium text-text-primary">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Last Updated</span>
                  <span className="font-medium text-text-primary">
                    {new Date(user.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">User ID</span>
                  <span className="font-medium text-sm text-text-secondary">{user.uid}</span>
                </div>
              </div>
            </div>

            {/* Date of Birth Card */}
            {user.dateOfBirth && (
              <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                  <FaCalendar className="w-5 h-5 mr-2 text-primary" />
                  Date of Birth
                </h3>
                <p className="text-text-secondary">
                  {new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && <OverviewTab user={user} />}
            {activeTab === 'profile' && <ProfileTab user={user} editMode={editMode} onSave={handleSave} />}
            {activeTab === 'details' && <DetailsTab user={user} />}
            {activeTab === 'tutor' && user.role === 'tutor' && <TutorTab user={user} />}
            {activeTab === 'student' && user.role === 'student' && <StudentTab user={user} />}
            {activeTab === 'guardian' && user.role === 'guardian' && <GuardianTab user={user} />}
          </div>
        </div>
      </div>
    </div>
     <ProfileFormModal
        isOpen={showFormModal}
        onClose={handleCancel}
        title={formMode === 'create' ? 'Complete Your Profile' : 'Edit Profile'}
      >
        <ProfileForm
          user={user}
          onSave={handleSave}
          onCancel={handleCancel}
          mode={formMode}
        />
      </ProfileFormModal>
    </>
  );
};

// Sub-components for each tab
const OverviewTab = ({ user }) => (
  <div className="space-y-6">
    <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
      <h3 className="text-xl font-semibold mb-6 text-text-primary">Overview</h3>
      
      <div className="space-y-4">
        {user.role === 'tutor' && user.tutorProfile && (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
            <h4 className="font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-300">
              <FaChalkboardTeacher className="w-5 h-5 mr-2" />
              Tutor Profile
            </h4>
            <p className="text-blue-700 dark:text-blue-400">
              Specializes in {user.tutorProfile.subjects?.length || 0} subjects with {user.tutorProfile.experienceYears || 0} years of teaching experience.
              {user.tutorProfile.hourlyRate && ` Hourly rate: ₹${user.tutorProfile.hourlyRate}`}
            </p>
          </div>
        )}
        
        {user.role === 'student' && user.studentProfile && (
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50">
            <h4 className="font-semibold mb-2 flex items-center text-green-800 dark:text-green-300">
              <FaUserGraduate className="w-5 h-5 mr-2" />
              Student Profile
            </h4>
            <p className="text-green-700 dark:text-green-400">
              {user.studentProfile.grade && `Grade: ${user.studentProfile.grade}`}
              {user.studentProfile.school && ` at ${user.studentProfile.school}`}
              {user.studentProfile.subjectsInterested?.length > 0 && 
                ` • Interested in ${user.studentProfile.subjectsInterested.length} subjects`}
            </p>
          </div>
        )}
        
        {user.role === 'guardian' && user.guardianProfile && (
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
            <h4 className="font-semibold mb-2 flex items-center text-purple-800 dark:text-purple-300">
              <FaUserFriends className="w-5 h-5 mr-2" />
              Guardian Profile
            </h4>
            <p className="text-purple-700 dark:text-purple-400">
              {user.guardianProfile.occupation && `Occupation: ${user.guardianProfile.occupation}`}
              {user.guardianOf?.length > 0 && ` • Caring for ${user.guardianOf.length} students`}
            </p>
          </div>
        )}
        
        {user.role === 'admin' && user.adminProfile && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50">
            <h4 className="font-semibold mb-2 flex items-center text-red-800 dark:text-red-300">
              <FaUserShield className="w-5 h-5 mr-2" />
              Administrator
            </h4>
            <p className="text-red-700 dark:text-red-400">
              {user.adminProfile.department && `Department: ${user.adminProfile.department}`}
              {user.adminProfile.lastLogin && 
                ` • Last login: ${new Date(user.adminProfile.lastLogin).toLocaleDateString()}`}
            </p>
          </div>
        )}
        
        {/* Status History Preview */}
        {user.statusHistory?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3 text-text-primary">Recent Status Changes</h4>
            <div className="space-y-3">
              {user.statusHistory.slice(0, 3).map((history, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-hover-bg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      history.status === 'active' ? 'bg-green-500' :
                      history.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <div>
                      <span className="font-medium capitalize text-text-primary">{history.status}</span>
                      {history.reason && <p className="text-sm text-text-secondary">{history.reason}</p>}
                    </div>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {new Date(history.changedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ProfileTab = ({ user, editMode, onSave }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-xl font-semibold mb-6 text-text-primary">Personal Information</h3>
    
    <div className="space-y-6">
      {/* Basic Info */}
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

      {/* Address Details */}
      {user.address && (
        <div>
          <h4 className="font-medium mb-3 flex items-center text-text-primary">
            <FaHome className="w-5 h-5 mr-2 text-primary" />
            Address Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.address.street && (
              <div>
                <p className="text-sm text-text-secondary">Street</p>
                <p className="font-medium text-text-primary">{user.address.street}</p>
              </div>
            )}
            {user.address.city && (
              <div>
                <p className="text-sm text-text-secondary">City</p>
                <p className="font-medium text-text-primary">{user.address.city}</p>
              </div>
            )}
            {user.address.state && (
              <div>
                <p className="text-sm text-text-secondary">State</p>
                <p className="font-medium text-text-primary">{user.address.state}</p>
              </div>
            )}
            {user.address.country && (
              <div>
                <p className="text-sm text-text-secondary">Country</p>
                <p className="font-medium text-text-primary">{user.address.country}</p>
              </div>
            )}
            {user.address.zipCode && (
              <div>
                <p className="text-sm text-text-secondary">ZIP Code</p>
                <p className="font-medium text-text-primary">{user.address.zipCode}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

const DetailsTab = ({ user }) => (
  <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
    <h3 className="text-xl font-semibold mb-6 text-text-primary">Account Details</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-lg bg-hover-bg">
        <div>
          <p className="font-medium text-text-primary">Account Created</p>
          <p className="text-sm text-text-secondary">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
        <FaCalendar className="w-5 h-5 text-text-secondary" />
      </div>
      
      <div className="flex items-center justify-between p-4 rounded-lg bg-hover-bg">
        <div>
          <p className="font-medium text-text-primary">Profile Last Updated</p>
          <p className="text-sm text-text-secondary">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
        <FaEdit className="w-5 h-5 text-text-secondary" />
      </div>
      
      {user.adminProfile?.lastLogin && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-hover-bg">
          <div>
            <p className="font-medium text-text-primary">Last Login</p>
            <p className="text-sm text-text-secondary">
              {new Date(user.adminProfile.lastLogin).toLocaleString()}
            </p>
          </div>
          <FaLock className="w-5 h-5 text-text-secondary" />
        </div>
      )}
    </div>
  </div>
);

const TutorTab = ({ user }) => (
  <div className="space-y-6">
    {/* Tutor Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center">
          <FaBook className="w-8 h-8 text-primary mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Subjects</p>
            <p className="text-lg font-semibold text-text-primary">
              {user.tutorProfile?.subjects?.length || 0}
            </p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center">
          <FaDollarSign className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Hourly Rate</p>
            <p className="text-lg font-semibold text-text-primary">
              ₹{user.tutorProfile?.hourlyRate || 'Not set'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center">
          <FaStar className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Rating</p>
            <p className="text-lg font-semibold text-text-primary">
              {user.tutorProfile?.rating || 0}/5
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Subjects */}
    {user.tutorProfile?.subjects?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {user.tutorProfile.subjects.map((subject, index) => (
            <span key={index} className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
              {subject}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Qualifications */}
    {user.tutorProfile?.qualifications?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
          <FaAward className="w-5 h-5 mr-2 text-primary" />
          Qualifications
        </h3>
        <ul className="space-y-2">
          {user.tutorProfile.qualifications.map((qual, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-text-primary">{qual}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Availability */}
    {user.tutorProfile?.availability?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
          <FaClock className="w-5 h-5 mr-2 text-primary" />
          Availability
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {user.tutorProfile.availability.map((slot, index) => (
            <div key={index} className="p-3 rounded-lg bg-hover-bg">
              <p className="font-medium text-text-primary">
                {getDayName(slot.day)}
              </p>
              <p className="text-sm text-text-secondary">
                {slot.from} - {slot.to}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Bio */}
    {user.tutorProfile?.bio && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">About Me</h3>
        <p className="whitespace-pre-line text-text-primary">
          {user.tutorProfile.bio}
        </p>
      </div>
    )}
  </div>
);

const StudentTab = ({ user }) => (
  <div className="space-y-6">
    {/* Student Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center mb-4">
          <FaSchool className="w-8 h-8 text-secondary mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Grade & School</p>
            <p className="text-lg font-semibold text-text-primary">
              {user.studentProfile?.grade || 'Not specified'}
              {user.studentProfile?.school && ` • ${user.studentProfile.school}`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center mb-4">
          <FaBullseye className="w-8 h-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Learning Goals</p>
            <p className="text-lg font-semibold text-text-primary">
              {user.studentProfile?.learningGoals?.length || 0} Goals
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Subjects Interested */}
    {user.studentProfile?.subjectsInterested?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Subjects Interested</h3>
        <div className="flex flex-wrap gap-2">
          {user.studentProfile.subjectsInterested.map((subject, index) => (
            <span key={index} className="px-4 py-2 rounded-full font-medium bg-secondary/10 text-secondary border border-secondary/20">
              {subject}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Learning Goals */}
    {user.studentProfile?.learningGoals?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Learning Goals</h3>
        <div className="space-y-3">
          {user.studentProfile.learningGoals.map((goal, index) => (
            <div key={index} className="flex items-start p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <span className="text-purple-700 dark:text-purple-300">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Guardians */}
    {user.guardians?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
          <FaUsers className="w-5 h-5 mr-2 text-primary" />
          Guardians
        </h3>
        <div className="space-y-4">
          {user.guardians.map((guardian, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-hover-bg">
              <div>
                <p className="font-medium text-text-primary">
                  {guardian.relation || 'Guardian'}
                </p>
                <p className="text-sm text-text-secondary">
                  Can view progress: {guardian.canViewProgress ? 'Yes' : 'No'}
                </p>
              </div>
              <span className="text-sm text-text-secondary">
                Added: {new Date(guardian.addedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const GuardianTab = ({ user }) => (
  <div className="space-y-6">
    {/* Guardian Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <div className="flex items-center">
          <FaUsers className="w-8 h-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-text-secondary">Students Under Care</p>
            <p className="text-lg font-semibold text-text-primary">
              {user.guardianOf?.length || 0}
            </p>
          </div>
        </div>
      </div>
      
      {user.guardianProfile?.occupation && (
        <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
          <div className="flex items-center">
            <FaBriefcase className="w-8 h-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Occupation</p>
              <p className="text-lg font-semibold text-text-primary">
                {user.guardianProfile.occupation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Emergency Contact */}
    {user.guardianProfile?.emergencyContact && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Emergency Contact</h3>
        <div className="flex items-center p-3 bg-hover-bg rounded-lg">
          <FaPhone className="w-5 h-5 text-primary mr-3" />
          <span className="text-text-primary">
            {user.guardianProfile.emergencyContact}
          </span>
        </div>
      </div>
    )}

    {/* Students Under Care */}
    {user.guardianOf?.length > 0 && (
      <div className="rounded-xl shadow-sm border p-6 bg-card-bg border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Students Under Care</h3>
        <div className="space-y-3">
          {user.guardianOf.map((studentId, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg bg-hover-bg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <FaGraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Student {index + 1}</p>
                <p className="text-sm text-text-secondary">ID: {studentId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  
);

// Helper function
const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber] || 'Unknown';
};

export default ProfilePage;









// import React, { useState, useEffect } from 'react';
// import ProfileContent from '../components/ProfileContent';
// import ProfileHeader from '../components/ProfileHeader';
// import ProfileSidebar from '../components/ProfileSidebar';
// import LoadingState from '../components/LoadingState';
// import ErrorState from '../components/ErrorState';
// import { dummyUsers } from '../data/dummyData';

// const ProfilePage = ({ userId, currentUser }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     // Simulate API call with dummy data
//     setTimeout(() => {
//       // Determine which user to show based on URL or props
//       let userType = 'student';
//       if (userId === 'tutor') userType = 'tutor';
//       else if (userId === 'guardian') userType = 'guardian';
//       else if (userId === 'admin') userType = 'admin';
      
//       setUser(dummyUsers[userType]);
//       setLoading(false);
//     }, 500);
//   }, [userId]);

//   const handleSave = async (updatedData) => {
//     // Simulate save operation
//     console.log('Saving data:', updatedData);
//     setUser(prev => ({ ...prev, ...updatedData }));
//     setEditMode(false);
//   };

//   if (loading) return <LoadingState />;
//   if (!user) return <ErrorState />;
  
//   return (
//     <div className="min-h-screen bg-bg text-text-primary transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <ProfileHeader 
//           user={user}
//           editMode={editMode}
//           setEditMode={setEditMode}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />
        
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//           <ProfileSidebar user={user} />
          
//           <div className="lg:col-span-2">
//             <ProfileContent 
//               user={user}
//               activeTab={activeTab}
//               editMode={editMode}
//               onSave={handleSave}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;