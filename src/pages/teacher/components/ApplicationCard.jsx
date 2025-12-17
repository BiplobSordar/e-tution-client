import React, { useState } from "react";
import toast from "react-hot-toast";
import EditApplicationModal from "./EditApplicationModal";
import {
  useUpdateMyApplicationMutation,
  useWithdrawMyApplicationMutation,
} from "../../../features/teacher/teacherApi";

const statusClassMap = {
  pending: "status-badge-pending",
  accepted: "status-badge-active",
  rejected: "status-badge-suspended",
};

const ApplicationCard = ({ tuition, refetch }) => {
  const [open, setOpen] = useState(false);

  const [
    updateMyApplication,
    { isLoading: isUpdating },
  ] = useUpdateMyApplicationMutation();

  const [
    withdrawMyApplication,
    { isLoading: isWithdrawing },
  ] = useWithdrawMyApplicationMutation();

  const {
    _id,
    title,
    subjects = [],
    grade,
    tuitionType,
    location,
    totalFee,
    postedBy,
    myApplication,
  } = tuition;

  if (!myApplication) return null;


  const handleWithdraw = async () => {
    try {
      await withdrawMyApplication(_id).unwrap();
      toast.success("Application withdrawn successfully");
      refetch();
    } catch (err) {
      console.log(err)
      toast.error(
        err?.data?.message || "Failed to withdraw application"
      );
    }
  };

  return (
    <>
      <div className="dashboard-card animate-fade-in">

        <div className="flex-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {title}
          </h2>

          <span
            className={
              statusClassMap[myApplication.status] ||
              "status-badge-default"
            }
          >
            {myApplication.status}
          </span>
        </div>

    
        <div className="space-y-2 text-sm text-text-secondary">
          <div>
            <span className="font-medium">Grade:</span> {grade}
          </div>

          <div>
            <span className="font-medium">Subjects:</span>{" "}
            {subjects.join(", ")}
          </div>

          <div>
            <span className="font-medium">Type:</span>{" "}
            <span className="capitalize">{tuitionType}</span>
          </div>

          {location?.city && (
            <div>
              <span className="font-medium">Location:</span>{" "}
              {location.city}, {location.area}
            </div>
          )}
        </div>


        <div className="my-4 border-t border-border" />

       
        <div className="space-y-2 text-sm">
          <div className="flex-between">
            <span className="text-text-muted">Proposed Rate</span>
            <span className="font-semibold text-text-primary">
              ৳{myApplication.proposedRate}
            </span>
          </div>

          <div className="flex-between">
            <span className="text-text-muted">Total Fee</span>
            <span className="font-semibold text-text-primary">
              ৳{totalFee}
            </span>
          </div>
        </div>


        <div className="mt-4 flex-between stack-mobile">
          <div className="text-sm text-text-muted">
            Posted by{" "}
            <span className="font-medium text-text-primary">
              {postedBy?.name || "Student"}
            </span>
          </div>

          {myApplication.status === "pending" && (
            <div className="flex gap-2">
              <button
                className="btn-outline"
                onClick={() => setOpen(true)}
                disabled={isUpdating || isWithdrawing}
              >
                Edit
              </button>

              <button
                className="btn-secondary"
                onClick={handleWithdraw}
                disabled={isWithdrawing}
              >
                {isWithdrawing ? "Withdrawing..." : "Withdraw"}
              </button>
            </div>
          )}
        </div>
      </div>


      {open && (
        <EditApplicationModal
          tuitionId={_id}
          application={myApplication}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            toast.success("Application updated successfully");
            setOpen(false);
            refetch();
          }}
          updateMyApplication={updateMyApplication}
          isUpdating={isUpdating}
        />
      )}
    </>
  );
};

export default ApplicationCard;
