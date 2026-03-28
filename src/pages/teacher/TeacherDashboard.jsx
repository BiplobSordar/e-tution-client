// import React from "react";
// import { useGetMyApplicationsQuery, useGetMyOngoingTuitionsQuery } from "../../features/teacher/teacherApi";
// import { FaFileAlt, FaBook, FaDollarSign } from "react-icons/fa";

// const DashboardCard = ({ title, value, icon, bg = "bg-primary" }) => (
//   <div className={`p-4 rounded-xl shadow-md flex items-center gap-4 ${bg} text-white`}>
//     <div className="text-3xl">{icon}</div>
//     <div>
//       <p className="text-sm">{title}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// const TeacherDashboard = () => {
//   const { data: applicationsData, isLoading: isLoadingApps } = useGetMyApplicationsQuery();
//   const { data: ongoingData, isLoading: isLoadingOngoing } = useGetMyOngoingTuitionsQuery();

//   if (isLoadingApps || isLoadingOngoing) {
//     return <div className="flex-center h-64 text-gray-500">Loading dashboard...</div>;
//   }

//   const applications = applicationsData?.data || [];
//   const tuitions = ongoingData?.data || [];

//   const totalRevenue = tuitions.reduce((acc, tuition) => acc + (tuition.totalFee || 0), 0);

//   const pendingApplications = applications.filter(app => app.myApplication?.status === "pending").length;
//   const acceptedApplications = applications.filter(app => app.myApplication?.status === "accepted").length;

//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
//       <p className="text-text-secondary">Overview of your tuitions and earnings</p>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <DashboardCard 
//           title="Total Applications" 
//           value={applications.length} 
//           icon={<FaFileAlt />} 
//         />
//         <DashboardCard 
//           title="Pending Applications" 
//           value={pendingApplications} 
//           icon={<FaFileAlt />} 
//           bg="bg-yellow-500"
//         />
//         <DashboardCard 
//           title="Ongoing Tuitions" 
//           value={tuitions.length} 
//           icon={<FaBook />} 
//           bg="bg-blue-500"
//         />
//         <DashboardCard 
//           title="Total Revenue" 
//           value={`৳${totalRevenue}`} 
//           icon={<FaDollarSign />} 
//           bg="bg-green-500"
//         />
//       </div>


//       {tuitions.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold text-text-primary mb-2">Ongoing Tuitions</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-border rounded-lg">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Title</th>
//                   <th className="px-4 py-2 text-left">Grade</th>
//                   <th className="px-4 py-2 text-left">Subjects</th>
//                   <th className="px-4 py-2 text-left">Total Fee</th>
//                   <th className="px-4 py-2 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tuitions.map(tuition => (
//                   <tr key={tuition._id} className="border-t border-border">
//                     <td className="px-4 py-2">{tuition.title}</td>
//                     <td className="px-4 py-2">{tuition.grade}</td>
//                     <td className="px-4 py-2">{tuition.subjects.join(", ")}</td>
//                     <td className="px-4 py-2">৳{tuition.totalFee}</td>
//                     <td className="px-4 py-2">{tuition.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherDashboard;



import React from "react";
import { useGetMyApplicationsQuery, useGetMyOngoingTuitionsQuery } from "../../features/teacher/teacherApi";
import { FaFileAlt, FaBook, FaDollarSign } from "react-icons/fa";

// Helper to get badge class based on tuition status
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "open":
      return "status-badge-active"; // or appropriate class
    case "pending_approval":
      return "status-badge-pending";
    case "assigned":
    case "in-progress":
      return "status-badge-active";
    case "completed":
      return "badge-success"; // using badge-success from globals
    case "cancelled":
      return "badge-error";
    default:
      return "status-badge-default";
  }
};

const DashboardCard = ({ title, value, icon, color = "primary" }) => {
  // Map color to CSS variable background
  const bgColorMap = {
    primary: "var(--primary)",
    warning: "var(--warning)",
    info: "var(--info)",
    success: "var(--success)",
  };
  const bgColor = bgColorMap[color] || "var(--primary)";

  return (
    <div
      className="rounded-xl shadow-md flex items-center gap-4 text-white p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  const { data: applicationsData, isLoading: isLoadingApps } = useGetMyApplicationsQuery();
  const { data: ongoingData, isLoading: isLoadingOngoing } = useGetMyOngoingTuitionsQuery();

  if (isLoadingApps || isLoadingOngoing) {
    return (
      <div className="flex-center h-64 text-text-secondary">
        Loading dashboard...
      </div>
    );
  }

  const applications = applicationsData?.data || [];
  const tuitions = ongoingData?.data || [];

  const totalRevenue = tuitions.reduce((acc, tuition) => acc + (tuition.totalFee || 0), 0);

  const pendingApplications = applications.filter(app => app.myApplication?.status === "pending").length;
  const acceptedApplications = applications.filter(app => app.myApplication?.status === "accepted").length;

  return (
    <div className="p-4 space-y-6 bg-bg">
      <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
      <p className="text-text-secondary">Overview of your tuitions and earnings</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Applications"
          value={applications.length}
          icon={<FaFileAlt />}
          color="primary"
        />
        <DashboardCard
          title="Pending Applications"
          value={pendingApplications}
          icon={<FaFileAlt />}
          color="warning"
        />
        <DashboardCard
          title="Ongoing Tuitions"
          value={tuitions.length}
          icon={<FaBook />}
          color="info"
        />
        <DashboardCard
          title="Total Revenue"
          value={`৳${totalRevenue}`}
          icon={<FaDollarSign />}
          color="success"
        />
      </div>

      {tuitions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">Ongoing Tuitions</h2>
          <div className="overflow-x-auto bg-card-bg rounded-lg border border-border">
            <table className="min-w-full">
              <thead className="bg-hover-bg">
                <tr>
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Title</th>
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Grade</th>
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Subjects</th>
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Total Fee</th>
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map(tuition => (
                  <tr key={tuition._id} className="border-t border-border">
                    <td className="px-4 py-2 text-text-primary">{tuition.title}</td>
                    <td className="px-4 py-2 text-text-primary">{tuition.grade}</td>
                    <td className="px-4 py-2 text-text-primary">{tuition.subjects.join(", ")}</td>
                    <td className="px-4 py-2 text-text-primary">৳{tuition.totalFee}</td>
                    <td className="px-4 py-2">
                      <span className={getStatusBadgeClass(tuition.status)}>
                        {tuition.status}
                      </span>
                    </td>
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