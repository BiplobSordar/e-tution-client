import React from "react";
import { useGetMyApplicationsQuery, useGetMyOngoingTuitionsQuery } from "../../features/teacher/teacherApi";
import { FaFileAlt, FaBook, FaDollarSign } from "react-icons/fa";

const DashboardCard = ({ title, value, icon, bg = "bg-primary" }) => (
  <div className={`p-4 rounded-xl shadow-md flex items-center gap-4 ${bg} text-white`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const TeacherDashboard = () => {
  const { data: applicationsData, isLoading: isLoadingApps } = useGetMyApplicationsQuery();
  const { data: ongoingData, isLoading: isLoadingOngoing } = useGetMyOngoingTuitionsQuery();

  if (isLoadingApps || isLoadingOngoing) {
    return <div className="flex-center h-64 text-gray-500">Loading dashboard...</div>;
  }

  const applications = applicationsData?.data || [];
  const tuitions = ongoingData?.data || [];

  const totalRevenue = tuitions.reduce((acc, tuition) => acc + (tuition.totalFee || 0), 0);

  const pendingApplications = applications.filter(app => app.myApplication?.status === "pending").length;
  const acceptedApplications = applications.filter(app => app.myApplication?.status === "accepted").length;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
      <p className="text-text-secondary">Overview of your tuitions and earnings</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Applications" 
          value={applications.length} 
          icon={<FaFileAlt />} 
        />
        <DashboardCard 
          title="Pending Applications" 
          value={pendingApplications} 
          icon={<FaFileAlt />} 
          bg="bg-yellow-500"
        />
        <DashboardCard 
          title="Ongoing Tuitions" 
          value={tuitions.length} 
          icon={<FaBook />} 
          bg="bg-blue-500"
        />
        <DashboardCard 
          title="Total Revenue" 
          value={`৳${totalRevenue}`} 
          icon={<FaDollarSign />} 
          bg="bg-green-500"
        />
      </div>


      {tuitions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">Ongoing Tuitions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Grade</th>
                  <th className="px-4 py-2 text-left">Subjects</th>
                  <th className="px-4 py-2 text-left">Total Fee</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map(tuition => (
                  <tr key={tuition._id} className="border-t border-border">
                    <td className="px-4 py-2">{tuition.title}</td>
                    <td className="px-4 py-2">{tuition.grade}</td>
                    <td className="px-4 py-2">{tuition.subjects.join(", ")}</td>
                    <td className="px-4 py-2">৳{tuition.totalFee}</td>
                    <td className="px-4 py-2">{tuition.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
