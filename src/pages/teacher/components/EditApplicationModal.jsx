import React, { useState } from "react";

const EditApplicationModal = ({
  tuitionId,
  application,
  onClose,
  onSuccess,
  updateMyApplication,
  isUpdating,
}) => {
  const [proposedRate, setProposedRate] = useState(
    application.proposedRate
  );
  const [message, setMessage] = useState(
    application.message || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMyApplication({
        tuitionId,
        data: {
          proposedRate,
          message,
        },
      }).unwrap();

      onSuccess(); 
    } catch (err) {
     
      console.error("Update application failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex-center bg-black/50">
      <div className="card w-full max-w-md animate-fade-in">

        <div className="flex-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Edit Application
          </h2>

          <button
            onClick={onClose}
            disabled={isUpdating}
            className="text-text-muted hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Proposed Rate (৳)
            </label>
            <input
              type="number"
              className="form-input"
              value={proposedRate}
              onChange={(e) =>
                setProposedRate(Number(e.target.value))
              }
              required
              disabled={isUpdating}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Message
            </label>
            <textarea
              className="form-input"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isUpdating}
            />
          </div>


          <div className="form-actions flex gap-2 justify-end">
            <button
              type="button"
              className="btn-outline"
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;
