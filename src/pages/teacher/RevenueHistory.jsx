import React from "react";
import { useGetMyOngoingTuitionsQuery } from "../../features/teacher/teacherApi";
import OngoingTuitionCard from "./components/OngoingTuitionCard";

const RevenueHistory = () => {
  const { data, isLoading, isError } = useGetMyOngoingTuitionsQuery();


  if (isLoading) {
    return (
      <div className="flex-center h-64 text-gray-500">
        Loading revenue history...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-center h-64 text-red-500">
        Failed to load revenue history.
      </div>
    );
  }

  const tuitions = data?.data || [];

  const totalRevenue = tuitions.reduce(
    (acc, tuition) => acc + (tuition.totalFee || 0),
    0
  );

  if (!tuitions.length) {
    return (
      <div className="flex-center flex-col h-64 text-gray-500 space-y-2">
        <p className="text-lg font-medium">No revenue history yet.</p>
        <p className="text-sm text-gray-400">
          Any tuitions assigned to you and paid will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-4">

      <div className="mb-6 flex-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Revenue History
          </h1>
          <p className="text-text-secondary mt-1">
            Your assigned tuitions and total earnings
          </p>
        </div>

 
        <div className="bg-primary text-white px-4 py-2 rounded-lg shadow">
          <p className="text-sm">Total Revenue</p>
          <p className="text-lg font-bold">৳{totalRevenue}</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tuitions.map((tuition) => (
          <OngoingTuitionCard key={tuition._id} tuition={tuition} showFee />
        ))}
      </div>
    </div>
  );
};

export default RevenueHistory;
