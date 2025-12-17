import React from "react";

const OngoingTuitionCard = ({ tuition }) => {
  const {
    title,
    subjects,
    grade,
    tuitionType,
    location,
    totalFee,
    status,
    postedBy,
  } = tuition;

  return (
    <div className="dashboard-card">
   
      <div className="flex-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="status-badge-active capitalize">
          {status}
        </span>
      </div>

    
      <div className="space-y-2 text-sm text-text-secondary">
        <div>
          <strong>Grade:</strong> {grade}
        </div>

        <div>
          <strong>Subjects:</strong> {subjects.join(", ")}
        </div>

        <div>
          <strong>Type:</strong>{" "}
          <span className="capitalize">{tuitionType}</span>
        </div>

        {location?.city && (
          <div>
            <strong>Location:</strong> {location.city}, {location.area}
          </div>
        )}
      </div>

      <div className="my-4 border-t" />


      <div className="flex-between text-sm">
        <span>
          Student:{" "}
          <strong>{postedBy?.name || "Guardian"}</strong>
        </span>

        <span className="font-semibold">
          ৳{totalFee}
        </span>
      </div>
    </div>
  );
};

export default OngoingTuitionCard;
