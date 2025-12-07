
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async ({ email }) => {
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ type: "success", text: "Password reset email sent. Check your inbox." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Enter your email and we'll send a link to reset your password.
        </p>

        {message && (
          <div
            className={`p-3 mb-3 rounded ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              className="w-full border border-[var(--border)] rounded px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? "Sending..." : "Send reset email"}
          </button>

          <div className="text-sm text-[var(--text-secondary)] text-center mt-3">
            Remember your password? <Link to="/login" className="text-[var(--primary)]">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
