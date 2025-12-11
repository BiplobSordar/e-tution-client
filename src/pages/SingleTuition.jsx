import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  useApplyTuitionMutation,
  useGetTuitionQuery,
  useGetRecommendedTuitionsQuery
} from "../features/tution/tutionApi";
import { toast } from "react-hot-toast";
import TuitionCard from "../components/TuitionCard";
import { FaBookOpen } from "react-icons/fa";
import { useSelector } from "react-redux";

const SingleTuition = () => {
  const { id } = useParams()
  const { isAuthenticated, user, loading: authLoading } = useSelector((state) => state.auth);

  const { data: tuition, isLoading } = useGetTuitionQuery(id);
  const [applyTuition, { isLoading: isApplying }] = useApplyTuitionMutation();


  const { data: recommendedTuitions } = useGetRecommendedTuitionsQuery(
    {
      page: 1,
      limit: 4,
      grade: tuition?.grade,
      subject: tuition?.subjects?.[0],
      city: tuition?.location?.city,
      tuitionType: tuition?.tuitionType
    },
    { skip: !tuition }
  );

  const handleApply = async () => {
    try {
      await applyTuition(id).unwrap();
      toast.success("Applied successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply");
    }
  };


  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div className="skeleton h-12 w-3/4 rounded-lg"></div>
        <div className="skeleton h-6 w-1/3 rounded-lg"></div>
        <div className="skeleton h-4 w-full rounded-lg"></div>
        <div className="skeleton h-64 w-full rounded-lg"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="skeleton h-32 w-full rounded-lg"></div>
          <div className="skeleton h-32 w-full rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
 
        <div className="text-primary text-7xl animate-fade-in">
          <FaBookOpen />
        </div>


        <h2 className="text-2xl font-semibold text-text-primary animate-fade-in">
          Oops! Tuition Not Found
        </h2>
        <p className="text-text-secondary text-center max-w-md animate-fade-in">
          The tuition you are looking for might have been removed or does not exist. Try browsing our tuitions to find the right one for you.
        </p>

      
        <Link
          to="/tuitions"
          className="btn-secondary px-6 py-3 font-semibold rounded-lg shadow hover:shadow-lg transition-all animate-fade-in"
        >
          Browse Tuitions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-10">
  
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">{tuition.title}</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <span
            className={`status-badge-${tuition.status === "open" ? "active" : "default"
              }`}
          >
            {tuition.status.toUpperCase()}
          </span>
          <span className="role-badge-student">{tuition.tuitionType}</span>
          <span className="text-text-secondary">{tuition.grade} Grade</span>
        </div>
        {user && tuition.status === "open" && (
        <div className="flex justify-end">
          <button
            className="btn-primary"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply Now"}
          </button>
        </div>
      )}
      </div>


      



      <p className="text-text-secondary">{tuition.description}</p>

      <div>
        <h2 className="font-semibold text-text-primary mb-2">Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {tuition.subjects.map((subj) => (
            <span key={subj} className="badge badge-info">
              {subj}
            </span>
          ))}
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-text-secondary font-medium mb-1">Total Fee</h3>
          <p className="text-text-primary font-semibold">${tuition.totalFee}</p>
        </div>
        <div className="card">
          <h3 className="text-text-secondary font-medium mb-1">Location</h3>
          <p className="text-text-primary">
            {tuition.location.city}, {tuition.location.area}
          </p>
          {tuition.location.address && (
            <p className="text-text-secondary">{tuition.location.address}</p>
          )}
        </div>
      </div>

      
      {tuition.finalSchedule?.schedule?.length > 0 && (
        <div>
          <h2 className="text-text-primary font-semibold mb-2">Final Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tuition.finalSchedule.schedule.map((slot, idx) => (
              <div key={idx} className="card">
                <p className="text-text-secondary">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.day]}
                </p>
                <p className="font-medium">{slot.subject}</p>
                <p className="text-text-secondary">{slot.from} - {slot.to}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    
      {tuition.scheduleProposals?.length > 0 && (
        <div>
          <h2 className="text-text-primary font-semibold mb-2">
            Proposed Schedules by Students
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tuition.scheduleProposals
              .filter(p => p.role === "student")
              .map((proposal, idx) => (
                <div key={idx} className="card">
                  <p className="text-text-secondary mb-1">
                    Proposed By: <span className="font-medium">{proposal.proposedBy}</span>
                  </p>
                  {proposal.schedule.map((slot, sidx) => (
                    <div key={sidx} className="mb-1">
                      <p className="text-text-secondary text-sm">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.day]}: {slot.subject} ({slot.from} - {slot.to})
                      </p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}


   
      {recommendedTuitions?.tuitions?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Recommended Tuitions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTuitions.tuitions
              .filter(t => t._id !== tuition._id)
              .map(t => (
                <TuitionCard key={t._id} tution={t} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTuition;
