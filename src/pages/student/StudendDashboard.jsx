import React from "react";
import { useGetMyProfileQuery } from "../../features/user/userApi";
import { useGetMyTuitionsQuery } from "../../features/tution/tutionApi";

const StudentDashboard = () => {
  const { data: studentData, isLoading: pofileIsLoading } = useGetMyProfileQuery();



  const { data: tuitions, isLoading } = useGetMyTuitionsQuery()


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
  if (isLoading) return null;

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
                <button className="btn-primary">+ Post Tuition</button>
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

              <button className="btn-outline w-full mt-4">
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

              <button className="btn-outline w-full mt-3">
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

      </main>
    </div>
  );
};

export default StudentDashboard;
