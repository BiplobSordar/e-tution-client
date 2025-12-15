
import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="flex-center min-h-screen bg-bg p-4">
      <div className="card max-w-md w-full text-center animate-fade-in">
        <FiCheckCircle className="text-success text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
        <p className="text-text-secondary mb-6">
          Your payment has been received successfully. The tutor will be assigned shortly, and your tuition status has been updated.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Link to="/my-tuitions" className="btn-primary">
            Go to My Tuitions
          </Link>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
