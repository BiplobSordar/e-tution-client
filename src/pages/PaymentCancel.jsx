
import React from "react";
import { Link } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";

const PaymentCancel = () => {
  return (
    <div className="flex-center min-h-screen bg-bg p-4">
      <div className="card max-w-md w-full text-center animate-fade-in">
        <FiXCircle className="text-error text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-semibold mb-2">Payment Cancelled</h1>
        <p className="text-text-secondary mb-6">
          Your payment was not completed. You can try again or choose another tuition.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Link to="/my-tuitions" className="btn-primary">
            Retry Payment
          </Link>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
