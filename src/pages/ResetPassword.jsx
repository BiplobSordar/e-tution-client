
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../config/firebase";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  const [status, setStatus] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


  useEffect(() => {
    if (!oobCode || mode !== "resetPassword") {
      setStatus({ type: "error", text: "Invalid password reset link." });
    }
  }, [oobCode, mode]);

  const onSubmit = async ({ password }) => {
    setStatus(null);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus({ type: "success", text: "Password has been reset successfully. You can now login." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Set a New Password</h2>

    
        {status && (
          <div
            className={`p-3 mb-3 rounded ${
              status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="w-full border border-[var(--border)] rounded px-3 py-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? "Setting..." : "Set New Password"}
          </button>

          <div className="text-sm mt-3 text-[var(--text-secondary)]">
            <Link to="/login" className="text-[var(--primary)]">Back to Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
