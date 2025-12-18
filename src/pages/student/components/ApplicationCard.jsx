// src/pages/applied-tutors/components/ApplicationCard.jsx
import React from "react";
import StatusBadge from "../components/StatusBadge";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useCreateCheckoutSessionMutation, useRejectTutorMutation } from "../../../features/tution/tutionApi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const ApplicationCard = ({
  application,
  tuitionId,
refetch,
  hasRealData
}) => {

  const [createCheckoutSession, { isLoading, isSuccess, isError, error, data  }] = useCreateCheckoutSessionMutation()
  const [rejectTutor, { isLoading: rejectTutonIsLoading, isSuccess: rejectTutonIsSuccess, isError: rejectTutonIsError, error: rejectTutonError, data: rejectTutonData }] = useRejectTutorMutation()
  const navigate = useNavigate()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isPending = application.status === "pending";
 

  useEffect(() => {
    if (isSuccess && data?.url) {
      
      window.location.href = data.url;
    }
  }, [isSuccess, data]);


  return (
    <div
      className="dashboard-card hover:border-primary transition-all duration-200 hover:shadow-lg cursor-pointer"

    >
      <div className="flex items-start gap-3">

        <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-light flex-shrink-0">
          {application.tutor.avatar ? (
            <img
              src={application.tutor.avatar}
              alt={application.tutor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex-center text-primary text-lg font-bold">
              {application.tutor.name?.charAt(0)}
            </div>
          )}
        </div>


        <div className="flex-1 min-w-0">
          <div className="flex-between mb-1">
            <h4 className="text-lg font-semibold truncate">
              {application.tutor.name}
            </h4>
            <StatusBadge status={application.status} size="sm" />
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {application.tutor.subjects?.slice(0, 3).map((subject, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-primary-light text-primary"
              >
                {subject}
              </span>
            ))}
          </div>


          <div className="flex justify-between text-sm text-text-secondary">
            <span>₹{application.proposedRate}/month</span>
            <span>{formatDate(application.appliedAt)}</span>
          </div>


          {application.message && (
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              “{application.message}”
            </p>
          )}
        </div>
      </div>


      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-text-secondary">
          Review & take action
        </span>

        <div className="flex items-center gap-2">
     
          <button
            disabled={!isPending}
            onClick={(e) => {
              e.stopPropagation();
              createCheckoutSession({
                tuitionId,
                tutorId: application?.tutor?._id
              }).unwrap()
              refetch()
            }}
            title="Accept Application"
            style={{
              backgroundColor: isPending ? "var(--success)" : "var(--hover-bg)",
              color: isPending ? "#ffffff" : "var(--text-muted)",
            }}
            className="p-2 cursor-pointer rounded-md transition-all duration-200
               hover:opacity-90 disabled:cursor-not-allowed"
          >
            <FaCheck size={14} />
          </button>

        
          <button
            disabled={!isPending}
            onClick={(e) => {
              e.stopPropagation();
             rejectTutor({
                tuitionId,
                tutorId: application?.tutor?._id
              })
            }}
            title="Reject Application"
            style={{
              backgroundColor: isPending ? "var(--error)" : "var(--hover-bg)",
              color: isPending ? "#ffffff" : "var(--text-muted)",
            }}
            className="p-2 cursor-pointer rounded-md transition-all duration-200
               hover:opacity-90 disabled:cursor-not-allowed"
          >
            <FaTimes size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplicationCard;
