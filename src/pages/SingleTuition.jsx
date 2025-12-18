


import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetTuitionQuery,
  useGetRecommendedTuitionsQuery,
  useDeleteTuitionMutation
} from "../features/tution/tutionApi";
import { toast } from "react-hot-toast";
import TuitionCard from "../components/TuitionCard";
import { 
  FaBookOpen, 
  FaUser, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaMoneyBill,
  FaTrash,
  FaEdit,
  FaBan
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";

const SingleTuition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data: tuition, isLoading, refetch } = useGetTuitionQuery(id);
  const [deleteTuition, { isLoading: isDeleting }] = useDeleteTuitionMutation();

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
    navigate(`/apply-tution/${tuition?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      toast.error("You must be logged in to delete a tuition");
      return;
    }

   
    if (user.id !== tuition?.postedBy?._id) {
      toast.error("Only the owner can delete this tuition");
      return;
    }

    
    const canDelete =  tuition?.paymentStatus === "unpaid";
    console.log(tuition,'this is the value of can delete')
    
    if (!canDelete) {
      toast.error(
        tuition?.assignedTutor 
          ? "Cannot delete tuition that has an assigned tutor" 
          : "Cannot delete tuition that has been paid"
      );
      return;
    }

    if (!window.confirm("Are you sure you want to delete this tuition? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteTuition(id).unwrap();
      toast.success("Tuition deleted successfully");
      navigate("/tuitions");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete tuition");
    }
  };

  const canDelete = () => {
    if (!user || !tuition) return false;
    

    const isOwner = user._id === tuition.postedBy?._id;
    
 
    const hasNoAssignedTutor = tuition.assignedTutor === null || tuition.assignedTutor === undefined;
    const isUnpaid = tuition.paymentStatus === "unpaid";
    
    return isOwner && hasNoAssignedTutor && isUnpaid;
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
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary whitespace-normal break-words">
              {tuition.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                tuition.status === 'open' ? 'bg-green-100 text-green-800' :
                tuition.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                tuition.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                tuition.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {tuition.status.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tuition.tuitionType}
              </span>
              <span className="text-text-secondary">{tuition.grade} Grade</span>
              <span className="text-text-secondary flex items-center gap-2">
                <FaCalendarAlt /> {new Date(tuition.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

  
          <div className="flex flex-wrap gap-3">
            {user && tuition.status === "open" && user.role === "teacher" && (
              <button
                className="btn-primary flex items-center gap-2"
                onClick={handleApply}
              >
                Apply Now
              </button>
            )}

         
            {canDelete() && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn-outline border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}
              </button>
            )}

          
            {user && user._id === tuition.postedBy?._id && (
              <Link
                to={`/edit-tuition/${tuition._id}`}
                className="btn-outline flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </Link>
            )}
          </div>
        </div>

    
        {tuition.adminApprovalStatus && (
          <div className={`flex items-center gap-2 mt-3 ${
            tuition.adminApprovalStatus === 'approved' ? 'text-green-600' :
            tuition.adminApprovalStatus === 'rejected' ? 'text-red-600' :
            'text-yellow-600'
          }`}>
            <FiAlertCircle />
            <span className="font-medium">Admin Status: </span>
            <span className="capitalize">{tuition.adminApprovalStatus}</span>
          </div>
        )}


        {user && user._id === tuition.postedBy?._id && !canDelete() && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <FaBan className="text-yellow-600 mt-1" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">
                  Deletion Conditions
                </p>
                <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                  {tuition.assignedTutor && (
                    <li>• Cannot delete: Tutor has been assigned</li>
                  )}
                  {tuition.paymentStatus !== "unpaid" && (
                    <li>• Cannot delete: Payment has been processed</li>
                  )}
                  {tuition.status === "completed" && (
                    <li>• Cannot delete: Tuition is already completed</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>


      <div className="prose max-w-none">
        <p className="text-text-secondary leading-relaxed text-lg">{tuition.description}</p>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3 text-text-secondary">
            <FaMoneyBill className="text-xl" /> 
            <span className="font-medium">Total Fee</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            ৳ {tuition.totalFee?.toLocaleString()}
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-text-secondary">
              Payment Status:{" "}
              <span className={`font-medium capitalize ${
                tuition.paymentStatus === 'paid' ? 'text-green-600' :
                tuition.paymentStatus === 'pending' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {tuition.paymentStatus}
              </span>
            </p>
            {tuition.paymentIntentId && (
              <p className="text-xs text-text-secondary">
                Payment ID: {tuition.paymentIntentId.substring(0, 20)}...
              </p>
            )}
          </div>
        </div>


        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3 text-text-secondary">
            <FaMapMarkerAlt className="text-xl" /> 
            <span className="font-medium">Location</span>
          </div>
          <div className="space-y-2">
            <p className="text-text-primary font-medium">
              {tuition.location.city}, {tuition.location.area}
            </p>
            <p className="text-text-secondary text-sm">{tuition.location.address}</p>
            <p className="text-sm text-text-secondary">
              Tuition Type:{" "}
              <span className="font-medium">{tuition.tuitionType}</span>
            </p>
          </div>
        </div>


        {tuition.assignedTutor ? (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3 text-text-secondary">
              <FaUser className="text-xl" />
              <span className="font-medium">Assigned Tutor</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <span className="font-bold text-primary">
                  {tuition.assignedTutor.name?.charAt(0) || 'T'}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary">{tuition.assignedTutor.name}</p>
                <p className="text-sm text-text-secondary">{tuition.assignedTutor.email}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-text-secondary">
                Assigned on: {new Date(tuition.assignedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3 text-text-secondary">
              <FaUser className="text-xl" />
              <span className="font-medium">Posted By</span>
            </div>
            <Link to={`/public/${tuition.postedBy?._id}`} className="block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {tuition.postedBy?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-text-primary hover:text-primary transition-colors">
                    {tuition.postedBy?.name}
                  </p>
                  <p className="text-sm text-text-secondary">{tuition.postedBy?.email}</p>
                </div>
              </div>
            </Link>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-text-secondary">
                Posted on: {new Date(tuition.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>


      <div className="card p-6">
        <h2 className="font-semibold text-text-primary text-xl mb-4">Subjects</h2>
        <div className="flex flex-wrap gap-3">
          {tuition.subjects.map((subject, index) => (
            <span 
              key={index} 
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {tuition.applications && tuition.applications.length > 0 && (
        <div className="card p-6">
          <h2 className="font-semibold text-text-primary text-xl mb-4">
            Tutor Applications ({tuition.applications.length})
          </h2>
          <p className="text-text-secondary">
            {tuition.applications.length} tutor(s) have applied for this tuition.
            {user && user._id === tuition.postedBy?._id && (
              <Link to={`/tuition-applications/${tuition._id}`} className="text-primary hover:underline ml-2">
                View applications
              </Link>
            )}
          </p>
        </div>
      )}


      {tuition.scheduleProposals?.length > 0 && (
        <div className="card p-6">
          <h2 className="text-text-primary font-semibold text-xl mb-4">
            Proposed Schedules
          </h2>
          <div className="space-y-4">
            {tuition.scheduleProposals.map((proposal, idx) => (
              <div key={idx} className="border border-border rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  Proposed By:{" "}
                  <span className="font-medium text-text-primary">
                    {proposal?.postedBy?.name || proposal?.role || "Unknown"}
                  </span>
                </p>
                <div className="mt-3 space-y-2">
                  {proposal.schedule?.map((slot, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm">
                      <span className="font-medium min-w-24">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.day] || "Day"}
                      </span>
                      <span className="text-text-primary">
                        {slot.subject}
                      </span>
                      <span className="text-text-secondary">
                        {slot.from} - {slot.to}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

     
      {recommendedTuitions?.data?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
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