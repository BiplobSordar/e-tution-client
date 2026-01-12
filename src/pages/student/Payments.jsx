

import { useGetPaidTuitionsQuery } from "../../features/tution/tutionApi";


const Payments = () => {
  const { data, isLoading, isError } = useGetPaidTuitionsQuery()

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="dashboard-card skeleton h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="dashboard-card skeleton h-64"></div>
          </div>
          <div>
            <div className="dashboard-card skeleton h-64"></div>
          </div>
        </div>
      </div>
    );
  }
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
