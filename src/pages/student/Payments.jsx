// Payments.jsx
import React from "react";
import { useGetPaidTuitionsQuery } from "../../features/tution/tutionApi";


const Payments = () => {
  const { data, isLoading, isError } = useGetPaidTuitionsQuery()

  if (isLoading) return <p className="text-text-secondary text-center py-10">Loading...</p>;
  if (isError) return <p className="text-error text-center py-10">Failed to load payments.</p>;

  const tuitions = data?.tuitions || [];

  if (tuitions.length === 0)
    return (
      <div className="empty-state">
        <div className="empty-state-icon">💳</div>
        No paid tuitions found.
      </div>
    );

  return (
    <div className="grid-responsive">
      {tuitions.map((tuition) => (
        <div key={tuition._id} className="card dashboard-card animate-fade-in">
          <h2 className="text-primary font-semibold text-lg mb-2">{tuition.title}</h2>
          <p className="text-text-secondary mb-2">{tuition.description}</p>

          <div className="flex-between mb-2">
            <span className="badge badge-success">Paid</span>
            <span className="text-text-secondary">Grade: {tuition.grade || "N/A"}</span>
          </div>

          {tuition.payment && (
            <div className="mt-2">
              <p className="text-text-secondary mb-1">
                <strong>Amount:</strong> {(tuition.payment.amount / 100).toFixed(2)}{" "}
                {tuition.payment.currency.toUpperCase()}
              </p>
              <p className="text-text-secondary mb-1">
                <strong>Status:</strong> {tuition.payment.status}
              </p>
              <p className="text-text-secondary mb-1">
                <strong>Date:</strong> {new Date(tuition.payment.created * 1000).toLocaleString()}
              </p>
              {tuition.payment.receiptUrl && (
                <a
                  href={tuition.payment.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline inline-block mt-2"
                >
                  View Receipt
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Payments;
