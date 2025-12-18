import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  ArrowLeft,
  DollarSign,
  MessageSquare,
  Calendar,
  Clock,
  BookOpen,
  MapPin,
  User,
  GraduationCap,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import {
  useGetTuitionQuery,
  useApplyForTuitionMutation,
  useCheckApplicationStatusQuery
} from '../features/tution/tutionApi';

const TuitionApplicationPage = () => {
  const { tuitionId } = useParams();
  const navigate = useNavigate();
  const { user: currentUserData, loading: userLoading } = useSelector((state) => state.auth);

  const {
    data: tuitionData,
    isLoading: tuitionLoading,
    isError: tuitionError,
    error: tuitionErrorData,
    refetch: refetchTuition,
  } = useGetTuitionQuery(tuitionId, {
    skip: !tuitionId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: applicationStatus,
    isLoading: statusLoading,
    isError: statusError,
  } = useCheckApplicationStatusQuery(tuitionId, {
    skip: !tuitionId || !currentUserData,
  });

  const [applyForTuition, {
    isLoading: applying,
    isError: applyError,
    error: applyErrorData,
    isSuccess: applySuccess,
    reset: resetApply,
  }] = useApplyForTuitionMutation();

  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [activeTab, setActiveTab] = useState('application');
  const [validationErrors, setValidationErrors] = useState({});


  const [applicationForm, setApplicationForm] = useState({
    proposedRate: '',
    message: '',
  });

  const tuition = tuitionData?.data || tuitionData;
  const teacher = currentUserData?.data || currentUserData;

  useEffect(() => {
    if (tuition?.subjects && tuition.subjects.length > 0) {
      const initialSlot = {
        day: 0,
        subject: tuition.subjects[0],
        from: '09:00',
        to: '10:30',
      };
      setScheduleSlots([initialSlot]);
    }
  }, [tuition]);

  useEffect(() => {
    if (teacher?.tutorProfile?.hourlyRate) {
      setApplicationForm(prev => ({
        ...prev,
        proposedRate: teacher.tutorProfile.hourlyRate.toString()
      }));
    }
  }, [teacher]);

  useEffect(() => {
    if (applySuccess) {
      toast.success('Application submitted successfully!');
      navigate(`/teacher/my-applications`);
      resetApply();
    }
  }, [applySuccess, navigate, tuitionId, resetApply]);

  useEffect(() => {
    if (applyError) {
      const errorMessage = applyErrorData?.data?.message ||
        applyErrorData?.message ||
        'Failed to submit application';
      toast.error(errorMessage);
    }
  }, [applyError, applyErrorData]);

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ];

  const timeSlots = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00',
  ];

  const addScheduleSlot = () => {
    const newSlot = {
      day: 0,
      subject: tuition?.subjects?.[0] || '',
      from: '09:00',
      to: '10:30',
    };
    setScheduleSlots([...scheduleSlots, newSlot]);
  };

  const removeScheduleSlot = (index) => {
    if (scheduleSlots.length > 1) {
      const updatedSlots = scheduleSlots.filter((_, i) => i !== index);
      setScheduleSlots(updatedSlots);
    }
  };

  const updateScheduleSlot = (index, field, value) => {
    const updatedSlots = [...scheduleSlots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setScheduleSlots(updatedSlots);
  };

  const calculateTotalHours = () => {
    return scheduleSlots.reduce((total, slot) => {
      const fromTime = new Date(`2000-01-01T${slot.from}`);
      const toTime = new Date(`2000-01-01T${slot.to}`);
      const hours = (toTime - fromTime) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
  };

  const calculateWeeklyAmount = () => {
    const hourlyRate = parseFloat(applicationForm.proposedRate) || 0;
    const totalHours = calculateTotalHours();
    return (hourlyRate * totalHours).toFixed(2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const validateForm = () => {
    const errors = {};

    if (!applicationForm.proposedRate || parseFloat(applicationForm.proposedRate) <= 0) {
      errors.rate = 'Please enter a valid hourly rate';
    }

    if (scheduleSlots.length === 0) {
      errors.schedule = 'Please add at least one schedule slot';
    }

    scheduleSlots.forEach((slot, index) => {
      const fromTime = new Date(`2000-01-01T${slot.from}`);
      const toTime = new Date(`2000-01-01T${slot.to}`);

      if (fromTime >= toTime) {
        errors[`slot-${index}`] = 'End time must be after start time';
      }

      if (!slot.subject) {
        errors[`slot-subject-${index}`] = 'Please select a subject';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplicationInputChange = (field, value) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinueToSchedule = () => {
    // Validate required fields before proceeding
    if (!applicationForm.proposedRate || parseFloat(applicationForm.proposedRate) <= 0) {
      toast.error('Please enter a valid hourly rate');
      return;
    }
    setActiveTab('schedule');
  };

  const handleSubmitApplication = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!teacher || teacher.role !== 'teacher') {
      toast.error('Only teachers can apply for tuitions');
      return;
    }

    if (scheduleSlots.length === 0) {
      toast.error('Please add at least one schedule slot');
      return;
    }

    try {
      const applicationData = {
        proposedRate: parseFloat(applicationForm.proposedRate),
        message: applicationForm.message,
        scheduleProposal: {
          proposedBy: teacher._id,
          role: 'teacher',
          schedule: scheduleSlots,
        },
      };

      await applyForTuition({ tuitionId, ...applicationData }).unwrap();
    } catch (error) {
      console.error('Application error:', error);
    }
  };

  const isLoading = tuitionLoading || userLoading || statusLoading;
  const isError = tuitionError || statusError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="skeleton h-12 w-48 mb-6 rounded-xl"></div>
          <div className="skeleton h-64 rounded-2xl mb-6"></div>
          <div className="skeleton h-96 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage = tuitionErrorData?.data?.message ||
      'Failed to load tuition details';

    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
            <AlertCircle className="text-error" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Error Loading Page</h2>
          <p className="text-text-secondary mb-4">{errorMessage}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                refetchTuition();
              }}
              className="btn-primary"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/tutions')}
              className="btn-outline"
            >
              Browse Tuitions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (teacher?.role !== 'teacher') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning/10 flex items-center justify-center">
            <AlertCircle className="text-warning" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Access Restricted</h2>
          <p className="text-text-secondary mb-4">
            Only teachers can apply for tuition posts. Please log in with a teacher account.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const isAlreadyApplied = applicationStatus?.data?.applied ||
    tuition?.applications?.some(app =>
      app.tutor === teacher?._id
    );

  if (isAlreadyApplied) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning/10 flex items-center justify-center">
            <CheckCircle className="text-warning" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Already Applied</h2>
          <p className="text-text-secondary mb-4">
            You have already applied for this tuition post. Please wait for the student's response.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(`/tuitions/${tuitionId}`)}
              className="btn-outline"
            >
              View Tuition
            </button>
            <button
              onClick={() => navigate('/teacher/applications')}
              className="btn-primary"
            >
              My Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
            <AlertCircle className="text-error" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Tuition Not Found</h2>
          <p className="text-text-secondary mb-6">The tuition post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/tuitions')}
            className="btn-primary"
          >
            Browse Tuitions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-4"
            disabled={applying}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold text-text-primary">Apply for Tuition</h1>
          <p className="text-text-secondary mt-2">
            Submit your application to teach {tuition.grade || 'this student'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card-bg rounded-2xl shadow-card p-6 mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <BookOpen size={20} />
                Tuition Details
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {tuition.title}
                  </h3>
                  <p className="text-text-secondary">{tuition.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Grade Level</p>
                    <p className="text-text-primary font-medium">
                      {tuition.grade || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Tuition Type</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${tuition.tuitionType === 'online'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : tuition.tuitionType === 'offline'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                    >
                      {tuition.tuitionType?.charAt(0).toUpperCase() +
                        tuition.tuitionType?.slice(1)}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Subjects</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tuition.subjects?.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-text-secondary" />
                      <span className="text-text-primary">
                        {tuition.location?.area && `${tuition.location.area}, `}
                        {tuition.location?.city}
                        {tuition.tuitionType === 'online' && ' (Online)'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Posted By</p>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-text-secondary" />
                      <span className="text-text-primary">
                        {tuition.postedBy?.name || 'Student'}
                        {tuition.guardianPosted && ' (via Guardian)'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Budget</p>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-secondary" />
                      <span className="text-text-primary font-medium">
                        {formatCurrency(tuition.totalFee)}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {tuition.paymentStatus === 'paid' ? ' (Paid)' : ' (Unpaid)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${tuition.status === 'open'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : tuition.status === 'assigned'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}
                    >
                      {tuition.status?.charAt(0).toUpperCase() +
                        tuition.status?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <div className="flex border-b border-border mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('application')}
                  className={`px-4 py-3 font-medium transition-colors ${activeTab === 'application'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text-secondary hover:text-primary'
                    }`}
                  disabled={applying}
                >
                  Application Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`px-4 py-3 font-medium transition-colors ${activeTab === 'schedule'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text-secondary hover:text-primary'
                    }`}
                  disabled={applying}
                >
                  Schedule Proposal
                </button>
              </div>

              {activeTab === 'application' ? (
                <div className="space-y-6">
                  <div className="form-group">
                    <label className="form-label flex items-center gap-2">
                      <DollarSign size={18} />
                      Proposed Hourly Rate (BDT)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={applicationForm.proposedRate}
                        onChange={(e) => handleApplicationInputChange('proposedRate', e.target.value)}
                        className={`form-input ${validationErrors.rate ? 'border-error' : ''
                          }`}
                        placeholder="Enter your hourly rate"
                        step="0.01"
                        disabled={applying}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                        BDT/hr
                      </div>
                    </div>
                    {validationErrors.rate && (
                      <p className="text-error text-sm mt-1">
                        {validationErrors.rate}
                      </p>
                    )}
                    {teacher?.tutorProfile?.hourlyRate && (
                      <p className="text-text-secondary text-sm mt-2">
                        Your default rate:{' '}
                        {formatCurrency(teacher.tutorProfile.hourlyRate)}/hr
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label flex items-center gap-2">
                      <MessageSquare size={18} />
                      Message to Student
                    </label>
                    <textarea
                      value={applicationForm.message}
                      onChange={(e) => handleApplicationInputChange('message', e.target.value)}
                      className="form-input min-h-[120px] resize-none"
                      placeholder="Introduce yourself, explain your teaching approach, or share why you're a good fit for this tuition..."
                      rows={4}
                      disabled={applying}
                      maxLength={1000}
                    />
                    <p className="text-text-secondary text-sm mt-2">
                      Optional but recommended. A good message increases your
                      chances of being selected.
                    </p>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <div></div>
                    <button
                      type="button"
                      onClick={handleContinueToSchedule}
                      className="btn-primary disabled:opacity-50"
                      disabled={applying}
                    >
                      Continue to Schedule →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-text-primary">
                        Weekly Schedule
                      </h3>
                      <button
                        type="button"
                        onClick={addScheduleSlot}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-light text-primary rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                        disabled={applying}
                      >
                        <Plus size={18} />
                        Add Time Slot
                      </button>
                    </div>

                    {validationErrors.schedule && (
                      <p className="text-error text-sm">
                        {validationErrors.schedule}
                      </p>
                    )}

                    <p className="text-text-secondary text-sm">
                      Add the days and times you're available to teach. You can
                      add multiple time slots.
                    </p>

                    <div className="space-y-4">
                      {scheduleSlots.map((slot, index) => (
                        <div key={index} className="bg-hover-bg rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-text-primary">
                              Time Slot {index + 1}
                            </h4>
                            {scheduleSlots.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeScheduleSlot(index)}
                                className="text-error hover:text-error-hover disabled:opacity-50"
                                disabled={applying}
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-2">
                                Day
                              </label>
                              <select
                                value={slot.day}
                                onChange={(e) =>
                                  updateScheduleSlot(
                                    index,
                                    'day',
                                    parseInt(e.target.value)
                                  )
                                }
                                className="form-input"
                                disabled={applying}
                              >
                                {days.map((day) => (
                                  <option key={day.value} value={day.value}>
                                    {day.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-2">
                                Start Time
                              </label>
                              <select
                                value={slot.from}
                                onChange={(e) =>
                                  updateScheduleSlot(index, 'from', e.target.value)
                                }
                                className="form-input"
                                disabled={applying}
                              >
                                {timeSlots.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-2">
                                End Time
                              </label>
                              <select
                                value={slot.to}
                                onChange={(e) =>
                                  updateScheduleSlot(index, 'to', e.target.value)
                                }
                                className="form-input"
                                disabled={applying}
                              >
                                {timeSlots.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                              Subject for this slot
                            </label>
                            <select
                              value={slot.subject}
                              onChange={(e) =>
                                updateScheduleSlot(index, 'subject', e.target.value)
                              }
                              className="form-input"
                              disabled={applying}
                            >
                              {tuition.subjects?.map((subject) => (
                                <option key={subject} value={subject}>
                                  {subject}
                                </option>
                              ))}
                            </select>
                          </div>

                          {validationErrors[`slot-${index}`] && (
                            <p className="text-error text-sm mt-2">
                              {validationErrors[`slot-${index}`]}
                            </p>
                          )}
                          {validationErrors[`slot-subject-${index}`] && (
                            <p className="text-error text-sm mt-2">
                              {validationErrors[`slot-subject-${index}`]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {scheduleSlots.length > 0 && (
                      <div className="bg-primary-light rounded-xl p-4">
                        <h4 className="font-semibold text-primary mb-2">
                          Schedule Summary
                        </h4>
                        <div className="space-y-2">
                          {scheduleSlots.map((slot, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-text-primary">
                                {days.find((d) => d.value === slot.day)?.label}:{' '}
                                {slot.subject}
                              </span>
                              <span className="text-text-secondary">
                                {slot.from} - {slot.to}
                              </span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-primary/20">
                            <div className="flex items-center justify-between">
                              <span className="text-text-primary font-medium">
                                Total Weekly Hours:
                              </span>
                              <span className="text-primary font-bold">
                                {calculateTotalHours().toFixed(1)} hours
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setActiveTab('application')}
                      className="btn-outline disabled:opacity-50"
                      disabled={applying}
                    >
                      ← Back to Application
                    </button>

                    <button
                      onClick={handleSubmitApplication}
                      disabled={applying}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {applying ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Application Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Hourly Rate</span>
                  <span className="text-text-primary font-medium">
                    {applicationForm.proposedRate ? formatCurrency(applicationForm.proposedRate) : 'Not set'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Time Slots</span>
                  <span className="text-text-primary font-medium">
                    {scheduleSlots.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Weekly Hours</span>
                  <span className="text-text-primary font-medium">
                    {calculateTotalHours().toFixed(1)}
                  </span>
                </div>

                {applicationForm.proposedRate && scheduleSlots.length > 0 && (
                  <>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-text-primary font-semibold">
                        Weekly Amount
                      </span>
                      <span className="text-primary font-bold text-lg">
                        {formatCurrency(calculateWeeklyAmount())}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary text-sm">
                        Monthly (approx.)
                      </span>
                      <span className="text-text-primary font-medium">
                        {formatCurrency(calculateWeeklyAmount() * 4)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {teacher && (
              <div className="bg-card-bg rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <User size={20} />
                  Your Profile
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        teacher.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          teacher.name
                        )}&background=4F46E5&color=fff`
                      }
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {teacher.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {teacher.tutorProfile?.experienceYears || 0} years
                        experience
                      </p>
                    </div>
                  </div>

                  {teacher.tutorProfile?.subjects && (
                    <div>
                      <h4 className="font-medium text-text-secondary text-sm mb-2">
                        Your Subjects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.tutorProfile.subjects
                          .slice(0, 5)
                          .map((subject, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-hover-bg text-text-primary rounded text-xs"
                            >
                              {subject}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {teacher.tutorProfile?.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(teacher.tutorProfile.rating)
                                ? 'text-warning'
                                : 'text-text-muted'
                              }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-text-secondary text-sm">
                        {teacher.tutorProfile.rating.toFixed(1)} (
                        {teacher.tutorProfile.totalReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-card-bg rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Application Tips
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">
                    Be competitive with your rate - consider the student's
                    budget
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">
                    Personalize your message to increase chances of selection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">
                    Propose a realistic schedule that matches your availability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">
                    Make sure your profile is complete before applying
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">
                    You can modify your application until it's reviewed by the
                    student
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
              <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                <AlertCircle size={18} className="text-warning" />
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• You can only apply once per tuition post</li>
                <li>• Your application will be visible to the student</li>
                <li>• You'll be notified when the student responds</li>
                <li>• Ensure your contact information is up-to-date</li>
                <li>• You may be contacted for an interview</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionApplicationPage;