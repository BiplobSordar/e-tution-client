import { useParams } from 'react-router-dom';

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  GraduationCap,
  Star,
  Clock,
  Award,
  FileText,
  Users,
  School,
  Target,
  Briefcase,
  Shield,
  MessageCircle,
  DollarSign,
  CheckCircle,
  XCircle,
  Heart,
  Home,
  Globe,
  UserCheck,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useGetUserProfileByIdQuery } from '../features/user/userApi';

const PublicProfilePage = () => {
  const { userId } = useParams();
  
  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetUserProfileByIdQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !userId
  });

  const user = userData?.data || userData;


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };


  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    try {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    } catch {
      return null;
    }
  };


  const getRoleBadge = (role) => {
    switch (role) {
      case 'teacher': return 'role-badge-tutor';
      case 'student': return 'role-badge-student';
      case 'guardian': return 'role-badge-guardian';
      case 'admin': return 'role-badge-admin';
      default: return 'role-badge-default';
    }
  };


  const formatStatus = (status) => {
  if (!status) return 'Unknown'; 
  return status.charAt(0).toUpperCase() + status.slice(1);
};


const getStatusBadge = (status) => {
  if (!status) return 'status-badge-default';
  switch (status) {
    case 'active': return 'status-badge-active';
    case 'pending': return 'status-badge-pending';
    case 'suspended': return 'status-badge-suspended';
    case 'restricted': return 'status-badge-default';
    case 'banned': return 'status-badge-suspended';
    case 'deleted': return 'status-badge-suspended';
    default: return 'status-badge-default';
  }
};
console.log('this is the user user',user)


  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
    
          <div className="skeleton h-64 rounded-2xl"></div>
          
      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton h-40 rounded-xl"></div>
              <div className="skeleton h-60 rounded-xl"></div>
              <div className="skeleton h-48 rounded-xl"></div>
            </div>
            <div className="space-y-4">
              <div className="skeleton h-48 rounded-xl"></div>
              <div className="skeleton h-40 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-error/10 flex items-center justify-center">
            <AlertCircle className="text-error" size={36} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">Profile Unavailable</h2>
          <p className="text-text-secondary mb-6">
            {error?.data?.message || 'Failed to load user profile. The user may not exist or their profile may be private.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => refetch()}
              className="btn-primary"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="btn-outline"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

 
  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center">
            <UserCheck className="text-warning" size={36} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">User Not Found</h2>
          <p className="text-text-secondary mb-6">
            The user profile you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-card-bg rounded-2xl shadow-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
           
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                <img
                  src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff&size=256`}
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-border"
                />
                
              </div>
              
      
              <div className="mt-2">
                <span className={getStatusBadge(user.status)}>
                  {formatStatus(user.status)}
                  
                </span>
              </div>
              <div className="mt-2">
                  <span className={getRoleBadge(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">{user.name}</h1>
                  
               
                  {user.role === 'teacher' && user.tutorProfile?.rating > 0 && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < Math.floor(user.tutorProfile.rating) ? "fill-warning text-warning" : "text-text-muted"}
                          />
                        ))}
                      </div>
                      <span className="text-text-secondary">
                        {user.tutorProfile.rating.toFixed(1)} ({user.tutorProfile.totalReviews} reviews)
                      </span>
                    </div>
                  )}


                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {user.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-text-secondary" />
                        <span className="text-text-secondary truncate">{user.email}</span>
                      </div>
                    )}
                    
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-text-secondary" />
                        <span className="text-text-secondary">{user.phone}</span>
                      </div>
                    )}
                    
                    {user.address?.city && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-text-secondary" />
                        <span className="text-text-secondary">{user.address.city}</span>
                      </div>
                    )}
                  </div>
                </div>

          
                <div className="flex-shrink-0">
                  <div className="bg-primary-light rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {user.profileCompletion?.percentage || 0}%
                      </div>
                      <div className="text-sm text-text-secondary">Profile Complete</div>
                      <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${user.profileCompletion?.percentage || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.role === 'teacher' && user.tutorProfile && (
                  <>
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Hourly Rate</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">৳{user.tutorProfile.hourlyRate || 0}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Experience</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.tutorProfile.experienceYears || 0} yrs</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Subjects</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.tutorProfile.subjects?.length || 0}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Reviews</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.tutorProfile.totalReviews || 0}</p>
                    </div>
                  </>
                )}

                {user.role === 'student' && user.studentProfile && (
                  <>
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <School className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Grade</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.studentProfile.grade || 'N/A'}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Subjects</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.studentProfile.subjectsInterested?.length || 0}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Goals</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.studentProfile.learningGoals?.length || 0}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Guardians</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.guardians?.length || 0}</p>
                    </div>
                  </>
                )}

                {user.role === 'guardian' && user.guardianProfile && (
                  <>
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Occupation</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.guardianProfile.occupation || 'N/A'}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Students</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.guardianProfile.studentsUnderCare?.length || 0}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Emergency</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary truncate">
                        {user.guardianProfile.emergencyContact ? 'Set' : 'Not set'}
                      </p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Status</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{formatStatus(user.status)}</p>
                    </div>
                  </>
                )}

                {user.role === 'admin' && user.adminProfile && (
                  <>
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-primary" size={20} />
                        <span className="text-sm text-text-secondary">Department</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">{user.adminProfile.department || 'N/A'}</p>
                    </div>
                    
                    <div className="bg-hover-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="text-secondary" size={20} />
                        <span className="text-sm text-text-secondary">Last Login</span>
                      </div>
                      <p className="text-xl font-bold text-text-primary">
                        {user.adminProfile.lastLogin ? formatDate(user.adminProfile.lastLogin) : 'N/A'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2 space-y-6">
         
            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                {user.role === 'teacher' ? (
                  <>
                    <GraduationCap size={20} />
                    About Tutor
                  </>
                ) : user.role === 'student' ? (
                  <>
                    <School size={20} />
                    About Student
                  </>
                ) : user.role === 'guardian' ? (
                  <>
                    <Shield size={20} />
                    About Guardian
                  </>
                ) : (
                  <>
                    <Briefcase size={20} />
                    About Admin
                  </>
                )}
              </h2>
              
              {user.role === 'teacher' && user.tutorProfile?.bio ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-text-primary whitespace-pre-line">{user.tutorProfile.bio}</p>
                </div>
              ) : user.role === 'student' && (user.studentProfile?.learningGoals?.length > 0 || user.studentProfile?.grade) ? (
                <div className="space-y-4">
                  <p className="text-text-primary">
                    {user.studentProfile.grade && `Currently in ${user.studentProfile.grade} at `}
                    {user.studentProfile.school || 'school'}.
                  </p>
                  
                  {user.studentProfile.learningGoals?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                        <Target size={18} />
                        Learning Goals
                      </h3>
                      <ul className="space-y-2">
                        {user.studentProfile.learningGoals.map((goal, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Heart size={16} className="text-primary mt-1 flex-shrink-0" />
                            <span className="text-text-primary">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-text-muted italic">No information available</p>
              )}
            </div>

 
            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <BookOpen size={20} />
                {user.role === 'teacher' ? 'Subjects Taught' : 
                 user.role === 'student' ? 'Subjects Interested In' : 
                 user.role === 'guardian' ? 'Areas of Interest' : 
                 'Responsibilities'}
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {user.role === 'teacher' && user.tutorProfile?.subjects?.length > 0 ? (
                  user.tutorProfile.subjects.map((subject, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-primary-light text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      {subject}
                    </span>
                  ))
                ) : user.role === 'student' && user.studentProfile?.subjectsInterested?.length > 0 ? (
                  user.studentProfile.subjectsInterested.map((subject, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-secondary-light text-secondary rounded-full font-medium hover:bg-secondary hover:text-white transition-colors duration-200"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <p className="text-text-muted italic">No subjects or interests listed</p>
                )}
              </div>
            </div>


            {user.role === 'teacher' && user.tutorProfile && (
              <>

                {user.tutorProfile.qualifications?.length > 0 && (
                  <div className="bg-card-bg rounded-2xl shadow-card p-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Award size={20} />
                      Qualifications
                    </h2>
                    <div className="space-y-3">
                      {user.tutorProfile.qualifications.map((qualification, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-hover-bg rounded-lg">
                          <CheckCircle size={18} className="text-success mt-1 flex-shrink-0" />
                          <span className="text-text-primary">{qualification}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {user.tutorProfile.availability?.length > 0 && (
                  <div className="bg-card-bg rounded-2xl shadow-card p-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Calendar size={20} />
                      Weekly Availability
                    </h2>
                    <div className="space-y-3">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
                        const slot = user.tutorProfile.availability.find(s => s.day === index);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-hover-bg rounded-lg">
                            <span className="text-text-primary font-medium">{day}</span>
                            {slot ? (
                              <span className="text-primary font-semibold">
                                {slot.from} - {slot.to}
                              </span>
                            ) : (
                              <span className="text-text-muted italic">Not available</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}


                {user.tutorProfile.documents?.length > 0 && (
                  <div className="bg-card-bg rounded-2xl shadow-card p-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <FileText size={20} />
                      Verified Documents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {user.tutorProfile.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-hover-bg rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-text-secondary" />
                            <span className="text-text-primary truncate">{doc}</span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                            Verified
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}


            {user.role === 'student' && user.studentProfile && (
              <div className="bg-card-bg rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <School size={20} />
                  Academic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text-secondary mb-2">Current Grade</h3>
                    <p className="text-text-primary text-lg">{user.studentProfile.grade || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-secondary mb-2">School/Institution</h3>
                    <p className="text-text-primary text-lg">{user.studentProfile.school || 'Not specified'}</p>
                  </div>
                </div>
                

                {user.studentProfile.guardianContact && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold text-text-secondary mb-2 flex items-center gap-2">
                      <Users size={18} />
                      Guardian Contact
                    </h3>
                    <p className="text-text-primary">{user.studentProfile.guardianContact}</p>
                  </div>
                )}
              </div>
            )}

            {user.role === 'guardian' && user.guardianProfile && (
              <div className="bg-card-bg rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Shield size={20} />
                  Guardian Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text-secondary mb-2">Occupation</h3>
                    <p className="text-text-primary text-lg">{user.guardianProfile.occupation || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-secondary mb-2">Emergency Contact</h3>
                    <p className="text-text-primary text-lg">{user.guardianProfile.emergencyContact || 'Not set'}</p>
                  </div>
                </div>
          
                {user.guardianProfile.studentsUnderCare?.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold text-text-secondary mb-3">Students Under Care</h3>
                    <div className="text-text-primary">
                      Caring for {user.guardianProfile.studentsUnderCare.length} student(s)
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>


          <div className="space-y-6">
    
            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">Contact Information</h2>
              <div className="space-y-4">
                {user.email && (
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-text-secondary">Email Address</p>
                      <a 
                        href={`mailto:${user.email}`}
                        className="text-primary hover:text-primary-hover break-all font-medium"
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-text-secondary">Phone Number</p>
                      <a 
                        href={`tel:${user.phone}`}
                        className="text-primary hover:text-primary-hover font-medium"
                      >
                        {user.phone}
                      </a>
                    </div>
                  </div>
                )}

                {user.dateOfBirth && (
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-text-secondary">Date of Birth</p>
                      <p className="text-text-primary font-medium">
                        {formatDate(user.dateOfBirth)}
                        {calculateAge(user.dateOfBirth) && ` (${calculateAge(user.dateOfBirth)} years)`}
                      </p>
                    </div>
                  </div>
                )}

    
                {user.address && (user.address.city || user.address.street) && (
                  <div className="flex items-start gap-3">
                    <Home size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-text-secondary">Address</p>
                      <p className="text-text-primary font-medium">
                        {user.address.street && `${user.address.street}, `}
                        {user.address.area && `${user.address.area}, `}
                        {user.address.city}
                        {user.address.state && `, ${user.address.state}`}
                        {user.address.country && `, ${user.address.country}`}
                        {user.address.zipCode && ` - ${user.address.zipCode}`}
                      </p>
                    </div>
                  </div>
                )}


                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-text-secondary">Member Since</p>
                    <p className="text-text-primary font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>

          
                {user.role === 'teacher' && (
                  <div className="pt-4 border-t border-border mt-4">
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                      <MessageCircle size={18} />
                      Contact for Tuition
                    </button>
                  </div>
                )}
              </div>
            </div>

       
            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Shield size={20} />
                Profile Verification
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-text-secondary" />
                    <span className="text-text-primary">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-success text-sm">Verified</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-text-secondary" />
                    <span className="text-text-primary">Phone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.phone ? (
                      <>
                        <CheckCircle size={16} className="text-success" />
                        <span className="text-success text-sm">Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-warning" />
                        <span className="text-warning text-sm">Not set</span>
                      </>
                    )}
                  </div>
                </div>

                {user.role === 'teacher' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-text-secondary" />
                        <span className="text-text-primary">Documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.tutorProfile?.documents?.length > 0 ? (
                          <>
                            <CheckCircle size={16} className="text-success" />
                            <span className="text-success text-sm">Verified</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-warning" />
                            <span className="text-warning text-sm">Required</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-text-secondary" />
                        <span className="text-text-primary">Qualifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.tutorProfile?.qualifications?.length > 0 ? (
                          <>
                            <CheckCircle size={16} className="text-success" />
                            <span className="text-success text-sm">Verified</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-warning" />
                            <span className="text-warning text-sm">Required</span>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}


                {user.uid && (
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-text-secondary mb-1">User ID</div>
                    <div className="font-mono text-sm text-text-primary bg-hover-bg p-2 rounded break-all">
                      {user.uid}
                    </div>
                  </div>
                )}
              </div>
            </div>


            {user.role === 'student' && user.guardians?.length > 0 && (
              <div className="bg-card-bg rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Users size={20} />
                  Guardians ({user.guardians.length})
                </h2>
                <div className="space-y-3">
                  {user.guardians.slice(0, 3).map((guardian, index) => (
                    <div key={index} className="p-3 bg-hover-bg rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                          <Users size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium">
                            {guardian.relation || 'Guardian'}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {guardian.canViewProgress ? 'Can view progress' : 'Limited access'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {user.guardians.length > 3 && (
                    <p className="text-center text-text-secondary text-sm">
                      +{user.guardians.length - 3} more guardian(s)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;