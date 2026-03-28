// import React from "react";
// import { useSelector } from "react-redux";
// import { FaUserCheck, FaUserTimes, FaClock, FaUserPlus } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import {
//   useGetGuardianRequestsQuery,
  
// } from "../../features/guardian/guardianApi";

// const GuardianRequests = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { data, isLoading, error } = useGetGuardianRequestsQuery(undefined, {
//     skip: !user?._id,
//   });
// const [updateStatus, { isLoading: updating }] = useUpdateRequestStatusMutation();

//   const requests = data?.data || [];

//   const handleAction = async (requestId, action) => {
//     try {
//       await updateStatus({ requestId, status: action }).unwrap();
//       toast.success(`Request ${action}d successfully`);
//     } catch (err) {
//       toast.error(err.data?.message || `Failed to ${action} request`);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "accepted":
//         return <span className="badge-success">Accepted</span>;
//       case "rejected":
//         return <span className="badge-error">Rejected</span>;
//       default:
//         return <span className="status-badge-pending">Pending</span>;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex-center h-64">
//         <div className="text-text-secondary text-sm sm:text-base">Loading requests...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12 px-4 sm:px-0">
//         <p className="text-error">Error loading requests. Please try again later.</p>
//       </div>
//     );
//   }

//   if (requests.length === 0) {
//     return (
//       <div className="text-center py-12 px-4 sm:px-0">
//         <div className="flex justify-center mb-4">
//           <FaUserPlus className="text-4xl sm:text-5xl text-text-secondary" />
//         </div>
//         <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
//           No requests found
//         </h2>
//         <p className="text-text-secondary text-sm sm:text-base">
//           You have no guardian requests at the moment.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-4 sm:px-0">
//       <div>
//         <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
//           Guardian Requests
//         </h1>
//         <p className="text-sm sm:text-base text-text-secondary">
//           All requests sent to you from students or guardians
//         </p>
//       </div>

//       <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
//         {requests.map((request) => (
//           <div
//             key={request._id}
//             className="bg-card-bg border border-border rounded-lg shadow-card p-4 sm:p-6 transition hover:shadow-lg"
//           >
//             <div className="flex items-start justify-between flex-wrap gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
//                   <FaUserCheck className="text-primary text-lg sm:text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-text-primary text-sm sm:text-base">
//                     {request.student?.name || "Student"}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-text-secondary">
//                     Grade: {request.student?.studentProfile?.grade || "N/A"}
//                   </p>
//                 </div>
//               </div>
//               {getStatusBadge(request.status)}
//             </div>

//             <div className="mt-4 space-y-2">
//               <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
//                 <FaClock className="flex-shrink-0" />
//                 <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
//               </div>
//               {request.relation && (
//                 <div className="text-xs sm:text-sm text-text-secondary">
//                   Relation: {request.relation}
//                 </div>
//               )}
//               <div className="text-xs sm:text-sm text-text-secondary">
//                 Requested by: {request.requestedBy === "student" ? "Student" : "Guardian"}
//               </div>
//             </div>

//             {request.status === "pending" && (
//               <div className="mt-6 flex gap-3">
//                 <button
//                   onClick={() => handleAction(request._id, "accepted")}
//                   // disabled={updating}
//                   className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-2.5"
//                 >
//                   <FaUserCheck className="text-sm sm:text-base" />
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleAction(request._id, "rejected")}
//                   // disabled={updating}
//                   className="flex-1 btn-outline flex items-center justify-center gap-2 text-error border-error/30 hover:bg-error/10 text-sm sm:text-base py-2 sm:py-2.5"
//                 >
//                   <FaUserTimes className="text-sm sm:text-base" />
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GuardianRequests;



import React from 'react';
import { useSelector } from 'react-redux';
import {
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaUserPlus,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import {
  useGetGuardianRequestsQuery,
  useUpdateRequestStatusMutation,
} from '../../features/guardian/guardianApi';

const GuardianRequests = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error ,refetch } = useGetGuardianRequestsQuery(undefined, {
    skip: !user?._id,
  });
  const [updateStatus, { isLoading: updating }] = useUpdateRequestStatusMutation();

  const requests = data?.data || [];
console.log(requests,'this is the data')
  const handleAction = async (requestId, action) => {
    try {
      await updateStatus({ requestId, status: action }).unwrap();
      toast.success(`Request ${action}d successfully`);
      refetch()
    } catch (err) {
      toast.error(err.data?.message || `Failed to ${action} request`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <span className="badge-success">Accepted</span>;
      case 'rejected':
        return <span className="badge-error">Rejected</span>;
      default:
        return <span className="status-badge-pending">Pending</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-center h-64">
        <div className="text-text-secondary text-sm sm:text-base">
          Loading requests...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 sm:px-0">
        <p className="text-error">Error loading requests. Please try again later.</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 px-4 sm:px-0">
        <div className="flex justify-center mb-4">
          <FaUserPlus className="text-4xl sm:text-5xl text-text-secondary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
          No requests found
        </h2>
        <p className="text-text-secondary text-sm sm:text-base">
          You have no guardian requests at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
          Guardian Requests
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          All requests sent to you from students or guardians
        </p>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-card-bg border border-border rounded-lg shadow-card p-4 sm:p-6 transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                  <FaUserCheck className="text-primary text-lg sm:text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm sm:text-base">
                    {request.student?.name || 'Student'}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Grade: {request.student?.studentProfile?.grade || 'N/A'}
                  </p>
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <FaClock className="flex-shrink-0" />
                <span>
                  Requested: {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
              {request.relation && (
                <div className="text-xs sm:text-sm text-text-secondary">
                  Relation: {request.relation}
                </div>
              )}
              <div className="text-xs sm:text-sm text-text-secondary">
                Requested by:{' '}
                {request.requestedBy === 'student' ? 'Student' : 'Guardian'}
              </div>
            </div>

            {/* Action Buttons (only for pending) */}
            {request.status === 'pending' && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleAction(request._id, 'accepted')}
                  disabled={updating}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-2.5"
                >
                  <FaUserCheck className="text-sm sm:text-base" />
                  Accept
                </button>
                <button
                  onClick={() => handleAction(request._id, 'rejected')}
                  disabled={updating}
                  className="flex-1 btn-outline flex items-center justify-center gap-2 text-error border-error/30 hover:bg-error/10 text-sm sm:text-base py-2 sm:py-2.5"
                >
                  <FaUserTimes className="text-sm sm:text-base" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuardianRequests;