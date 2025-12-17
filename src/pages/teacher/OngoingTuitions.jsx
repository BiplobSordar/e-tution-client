import React from "react";
import { useGetMyOngoingTuitionsQuery } from "../../features/teacher/teacherApi";
import OngoingTuitionCard from "./components/OngoingTuitionCard";

const OngoingTuitions = () => {
  const { data, isLoading, isError } = useGetMyOngoingTuitionsQuery();


  if (isLoading) {
    return (
      <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md h-56"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-center h-64 text-red-500">
        Failed to load ongoing tuitions.
      </div>
    );
  }


  if (!data?.data?.length) {
    return (
      <div className="flex-center flex-col h-64 text-gray-500 space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">No ongoing tuitions yet.</p>
        <p className="text-sm text-gray-400">
          Any tuitions assigned to you will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-4">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-primary">
          Ongoing Tuitions
        </h1>
        <p className="text-text-secondary mt-1">
          Tuitions currently assigned to you
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((tuition) => (
          <OngoingTuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </div>
    </div>
  );
};

export default OngoingTuitions;


