import React from "react";
import { useParams, Link, } from "react-router-dom";
import {
  useApplyTuitionMutation,
  useGetTuitionQuery,
  useGetRecommendedTuitionsQuery
} from "../features/tution/tutionApi";
import { toast } from "react-hot-toast";
import TuitionCard from "../components/TuitionCard";
import { FaBookOpen, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";
import { useSelector } from "react-redux";

const SingleTuition = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

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
    if (!user || user.role !== "teacher") {
      toast.error("Only teachers can apply");
      return;
    }
    try {
      await applyTuition(id).unwrap();
      toast.success("Applied successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply");
    }
  };


  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">


        <div className="space-y-2">
          <div className="skeleton h-10 w-2/3"></div>
          <div className="skeleton h-4 w-1/4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="skeleton h-20 w-full rounded-xl"></div>
          <div className="skeleton h-20 w-full rounded-xl"></div>
          <div className="skeleton h-20 w-full rounded-xl"></div>
        </div>


        <div className="space-y-3">
          <div className="skeleton h-5 w-1/2"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-11/12"></div>
          <div className="skeleton h-4 w-3/4"></div>
        </div>


        <div className="rounded-xl border p-6 space-y-4">
          <div className="skeleton h-6 w-1/3"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/6"></div>
          </div>
        </div>

        <div className="skeleton h-56 w-full rounded-xl"></div>

        <div className="flex gap-4">
          <div className="skeleton h-10 w-32 rounded-lg"></div>
          <div className="skeleton h-10 w-32 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="text-primary text-7xl">
          <FaBookOpen />
        </div>
        <h2 className="text-2xl font-semibold text-text-primary">
          Tuition Not Found
        </h2>
        <p className="text-text-secondary text-center max-w-md">
          The tuition you tried to view is unavailable or removed.
        </p>
        <Link to="/tuitions" className="btn-secondary px-6 py-3">
          Browse Tuitions
        </Link>
      </div>
    );
  }



  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">


      <div className="space-y-3 w-full">
        <h1 className="text-xl font-semibold whitespace-normal break-words">
          {tuition.title}
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          <span className="status-badge-active">{tuition.status.toUpperCase()}</span>
          <span className="role-badge-student">{tuition.tuitionType}</span>
          <span className="text-text-secondary">{tuition.grade} Grade</span>
          <span className="text-text-secondary flex items-center gap-2">
            <FaCalendarAlt /> {new Date(tuition.createdAt).toLocaleDateString()}
          </span>
        </div>

        {user && tuition.status === "open" && (
          <button
            className="btn-primary"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply Now"}
          </button>
        )}
      </div>


      <p className="text-text-secondary leading-relaxed">{tuition.description}</p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <FaMoneyBill /> Total Fee
          </div>
          <p className="text-xl font-semibold text-text-primary">
            ৳ {tuition.totalFee}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Payment Status:{" "}
            <span className="font-medium capitalize">{tuition.paymentStatus}</span>
          </p>
        </div>


        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <FaMapMarkerAlt /> Location
          </div>
          <p className="text-text-primary font-medium">
            {tuition.location.city}, {tuition.location.area}
          </p>
          <p className="text-text-secondary">{tuition.location.address}</p>
        </div>
      </div>

      <Link className="text-blue-600" to={`/public/${tuition.postedBy?.id}`}>
        <div className="card p-4">
          <h3 className="text-text-primary font-semibold mb-2 flex items-center gap-2">
            <FaUser /> Posted By
          </h3>
          <p className="text-text-primary">{tuition.postedBy?.name}</p>
          <p className="text-text-secondary text-sm">{tuition.postedBy?.email}</p>
        </div>
      </Link>


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


      {tuition.scheduleProposals?.length > 0 && (
        <div>
          <h2 className="text-text-primary font-semibold mb-3">
            Proposed Schedules
          </h2>
          <div className="space-y-3">
            {tuition.scheduleProposals.map((proposal, idx) => (
              <div key={idx} className="card p-4">
                <p className="text-sm text-text-secondary">
                  Proposed By:{" "}

                  <span className="font-medium">{proposal?.role}</span>

                </p>

                <div className="mt-2 space-y-1">
                  {proposal.schedule.map((slot, i) => (
                    <p key={i} className="text-sm text-text-primary">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.day]}
                      : {slot.subject} ({slot.from} - {slot.to})
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {recommendedTuitions?.data?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Recommended Tuitions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTuitions.data
              .filter((t) => t._id !== tuition._id)
              .map((t) => (
                <TuitionCard key={t._id} tution={t} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTuition;
