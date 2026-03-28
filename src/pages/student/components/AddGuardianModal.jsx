import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useAddGuardianMutation } from "../../../features/user/userApi";
import toast from "react-hot-toast";

const AddGuardianModal = ({ isOpen, onClose }) => {
  const [addGuardian, { isLoading }] = useAddGuardianMutation();

  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState("");
  const [canViewProgress, setCanViewProgress] = useState(true);
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setRelation("");
    setCanViewProgress(true);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Guardian email is required.");
      return;
    }

    if (!relation.trim()) {
      setError("Relation is required (e.g., Mother, Father).");
      return;
    }

    try {
      await addGuardian({
        guardianEmail: email,
        relation,
        canViewProgress,
      }).unwrap();

      toast.success("Guardian request sent successfully ");

      resetForm();
      onClose();

    } catch (err) {
      const message =
        err?.data?.message || "Failed to send guardian request";

      setError(message);
      resetForm()
      toast.error(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md md:max-w-lg bg-card-bg text-text-primary rounded-lg shadow-lg border border-border animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-2 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            Add Guardian
          </h2>

          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Guardian Email */}
          <div className="form-group">
            <label className="form-label">
              Guardian Email <span className="text-error">*</span>
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full"
              placeholder="guardian@example.com"
              disabled={isLoading}
              required
            />

            <p className="text-xs text-text-muted mt-1">
              The guardian must already have a registered account.
            </p>
          </div>

          {/* Relation */}
          <div className="form-group">
            <label className="form-label">
              Relation <span className="text-error">*</span>
            </label>

            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="form-input w-full"
              placeholder="e.g., Mother, Father"
              disabled={isLoading}
              required
            />
          </div>

          {/* Can View Progress */}
          <div className="form-group flex items-center gap-3">
            <input
              type="checkbox"
              checked={canViewProgress}
              onChange={(e) => setCanViewProgress(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded"
              disabled={isLoading}
            />

            <label className="form-label mb-0">
              Allow guardian to view academic progress
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded bg-red-100 border border-red-300 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline w-full sm:w-auto"
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}

              {isLoading ? "Sending..." : "Add Guardian"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddGuardianModal;