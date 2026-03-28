import React, { useState } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "../../features/user/userApi";
import { useGetMyTuitionsQuery } from "../../features/tution/tutionApi";
import { Link } from "react-router-dom";
import ProfileFormModal from "../../components/ProfileFormModal";
import ProfileForm from "../Profile/ProfileForm/ProfileForm";
import toast from "react-hot-toast";
import AddGuardianModal from "./components/AddGuardianModal";


const StudentDashboard = () => {
  const { data: studentData, isLoading: pofileIsLoading } = useGetMyProfileQuery();

  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('edit');
  const [addGuardianModalOpen, setAddGuardianModalOpen] = useState(false);





  const { data: user, isLoading, isError, error, refetch: refetchProfile } = useGetMyProfileQuery();
  const [updateMyProfile, { isLoading: loading }] = useUpdateMyProfileMutation()
  const { data: tuitions, isLoading: isUpdateLoading } = useGetMyTuitionsQuery()


  const handleSave = async (updatedData) => {
   

    try {



      const response = await updateMyProfile(updatedData).unwrap();
      console.log(response)






      toast.success('Profile updated successfully!');
      await refetchProfile();
      setShowFormModal(false);

    } catch (error) {
      console.error('Error updating profile:', error);


      await refetchProfile();

      toast.error(
        error.data?.message ||
        error.message ||
        'Failed to update profile. Please try again.'

      );
    }
  };





  const handleCancel = () => {
    setShowFormModal(false);
  };
  const stats = {
    activeTuitions: tuitions?.tuitions.length,
    pendingApplications: tuitions?.tuitions
      .reduce(
        (acc, t) =>
          acc + (t.applications?.filter(a => a.status === "pending").length || 0),
        0
      ),
    totalGuardians: studentData?.guardians?.length || 0
  };
  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="dashboard-card skeleton h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="dashboard-card skeleton h-64"></div>
          </div>
          <div>
            <div className="dashboard-card skeleton h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen transition-colors duration-200">
      <main className="container mx-auto px-4 py-6">


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="stat-card">
            <p className="text-sm text-text-secondary">Active Tuitions</p>
            <h3 className="text-3xl font-bold mt-2">{stats.activeTuitions}</h3>
          </div>

          <div className="stat-card">
            <p className="text-sm text-text-secondary">Pending Applications</p>
            <h3 className="text-3xl font-bold mt-2">{stats.pendingApplications}</h3>
          </div>

          <div className="stat-card">
            <p className="text-sm text-text-secondary">Guardians</p>
            <h3 className="text-3xl font-bold mt-2">{stats.totalGuardians}</h3>
          </div>

          <div className="stat-card">
            <p className="text-sm text-text-secondary">Profile Completion</p>
            <h3 className="text-3xl font-bold mt-2">
              {studentData?.profileCompletion?.percentage || 0}%
            </h3>
          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          <div className="lg:col-span-2 space-y-6">

            <div className="dashboard-card">
              <div className="flex-between mb-6">
                <h2 className="text-xl font-semibold">Active Tuitions</h2>
                {/* <button className="btn-primary">+ Post Tuition</button> */}
                <Link
                  to="/student/post-tuition"
                  className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post Tuition
                </Link>

              </div>

              <div className="space-y-4">
                {tuitions?.tuitions.map(tuition => (
                  <div
                    key={tuition._id}
                    className="p-4 border rounded-lg hover:border-primary"
                  >
                    <h3 className="font-semibold mb-2">{tuition.title}</h3>

                    <p className="text-sm text-text-secondary mb-2">
                      {tuition.subjects?.join(", ")} • {tuition.grade}
                    </p>

                    <div className="flex gap-2">
                      <span className="status-badge-active">
                        {tuition.status}
                      </span>
                      <span className="status-badge-pending">
                        {tuition.paymentStatus}
                      </span>
                    </div>

                    {tuition.assignedTutor && (
                      <div className="flex items-center gap-3 mt-3">
                        <img
                          src={tuition.assignedTutor.avatarUrl}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">
                            {tuition.assignedTutor.name}
                          </p>
                          <p className="text-sm text-text-secondary">
                            ⭐ {tuition.assignedTutor.rating}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>


          <div className="space-y-6">


            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Student Profile</h2>

              <p className="font-medium">
                {studentData?.studentProfile?.grade} •{" "}
                {studentData?.studentProfile?.school}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {studentData?.studentProfile?.subjectsInterested?.map(sub => (
                  <span
                    key={sub}
                    className="px-3 py-1 text-sm rounded-full bg-primary-light"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              <button onClick={() => { setShowFormModal(true) }} className="btn-outline w-full mt-4">
                Edit Profile
              </button>
            </div>


            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Guardians</h2>

              {studentData?.guardians?.map(g => (
                <div key={g.guardianId} className="flex-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{g.name}</p>
                    <p className="text-sm text-text-secondary">{g.relation}</p>
                  </div>
                  <span className="text-sm text-success">
                    {g.canViewProgress && "Can View"}
                  </span>
                </div>
              ))}

              <button onClick={()=>{setAddGuardianModalOpen(true)}} className="btn-outline w-full mt-3">
                + Add Guardian
              </button>
            </div>

            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

              {studentData?.recentActivity?.map((a, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm">{a.message}</p>
                  <p className="text-xs text-text-secondary">{a.timestamp}</p>
                </div>
              ))}
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
            refetchUser={refetchProfile}
          />

        </ProfileFormModal>

        <AddGuardianModal
          isOpen={addGuardianModalOpen}
          onClose={() => setAddGuardianModalOpen(false)}
         
        />
      </main>
    </div>
  );
};

export default StudentDashboard;
