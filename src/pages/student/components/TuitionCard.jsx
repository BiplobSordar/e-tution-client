
import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { daysOfWeek } from "../utils/constants";

const TuitionCard = ({ tuition, hasRealData }) => {

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const subjects = tuition.subjects || [];
  const applicationsCount = tuition.applications?.length ?? 0;
  const hasSchedule = tuition.finalSchedule?.schedule?.length > 0;
  const location = tuition.location || {};

  return (
    <div className="dashboard-card animate-fade-in">

 
      <div className="flex-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            {tuition.title || "Untitled Tuition"}
          </h3>
          <p className="text-text-secondary text-sm">
            Posted on {formatDate(tuition.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={tuition.status} size="sm" showIcon />
          {!tuition.isActive && <StatusBadge status="inactive" size="sm" />}
        </div>
      </div>


      <p className="text-text-secondary mb-4 line-clamp-2">
        {tuition.description || "No description provided."}
      </p>


      <div className="grid grid-cols-2 gap-3 mb-4">
        <Info label="Grade" value={tuition.grade} />
        <Info label="Type" value={tuition.tuitionType} capitalize />

        <div className="space-y-1">
          <p className="text-xs text-text-muted">Subjects</p>
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 3).map((subject, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-primary-light text-primary"
              >
                {subject}
              </span>
            ))}
            {subjects.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-hover-bg text-text-secondary">
                +{subjects.length - 3}
              </span>
            )}
            {subjects.length === 0 && (
              <span className="text-xs text-text-muted">N/A</span>
            )}
          </div>
        </div>

        <Info label="Fee" value={`৳${tuition.totalFee || 0}/month`} />
      </div>

      
      {(location.area || location.city) && (
        <div className="mb-4 flex items-start gap-2">
          <svg className="w-4 h-4 text-text-secondary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <div>
            <p className="text-sm text-text-primary">
              {[location.area, location.city].filter(Boolean).join(", ")}
            </p>
            {location.address && (
              <p className="text-xs text-text-secondary">{location.address}</p>
            )}
          </div>
        </div>
      )}

      
      {hasSchedule && (
        <div className="mb-4">
          <p className="text-sm font-medium text-text-primary mb-2">Schedule</p>
          <div className="space-y-2">
            {tuition.finalSchedule.schedule.map((slot, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-hover-bg min-w-[80px]">
                  {daysOfWeek[slot.day]}
                </span>
                <span className="text-text-secondary">
                  {formatTime(slot.from)} – {formatTime(slot.to)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

   
      <div className="pt-4 flex-col lg:flex-row border-t border-border flex-between gap-2 lg:gap-0">
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-secondary">
            {applicationsCount} applications
          </span>

          {tuition.assignedTutor && (
            <span className="text-sm text-success font-medium">
              Tutor Assigned
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {tuition.status === "open" && tuition.isActive && (
            <Link
              to={`/tuitions/${tuition._id}/applications`}
              className="btn-primary px-4 py-2 text-sm"
            >
              View Applications
            </Link>
          )}

          <Link
            to={`/tuitions/${tuition._id}`}
            className="btn-outline px-4 py-2 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>

      {!hasRealData && (
        <p className="mt-3 text-xs text-warning">
          ⚠ Demo data. Connect backend for real content.
        </p>
      )}
    </div>
  );
};

const Info = ({ label, value, capitalize }) => (
  <div className="space-y-1">
    <p className="text-xs text-text-muted">{label}</p>
    <p className={`text-sm font-medium text-text-primary ${capitalize ? "capitalize" : ""}`}>
      {value || "N/A"}
    </p>
  </div>
);

export default TuitionCard;
