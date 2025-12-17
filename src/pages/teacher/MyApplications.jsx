import React from "react";
import { useGetMyApplicationsQuery } from "../../features/teacher/teacherApi";
import ApplicationCard from "./components/ApplicationCard";



const MyApplications = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useGetMyApplicationsQuery();

  const applications = data?.data || [];


  if (isLoading) {
    return (
      <div className="grid-responsive">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="dashboard-card skeleton h-56" />
        ))}
      </div>
    );
  }


  if (isError) {
    return (
      <div className="empty-state">
        <p className="text-error">
          {error?.data?.message || "Failed to load applications"}
        </p>
      </div>
    );
  }


  if (!applications.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📄</div>
        <p>You haven’t applied to any tuition yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-primary">
          My Applications
        </h1>
        <p className="text-text-secondary mt-1">
          Track the status of your tuition applications
        </p>
      </div>


      <div className="grid-responsive">
        {applications.map((tuition) => (
          
          <ApplicationCard key={tuition._id} tuition={tuition} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default MyApplications;





