import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex-center bg-bg px-4">
      <div className="card w-full max-w-md text-center animate-fade-in">
      
        <div className="text-error text-6xl font-extrabold mb-2">
          403
        </div>

        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Unauthorized Access
        </h1>


        <p className="text-text-secondary mb-6">
          You don’t have permission to view this page.  
          Please contact an administrator or go back.
        </p>


        <div className="flex gap-3 justify-center stack-mobile">
          <button
            onClick={() => navigate(-1)}
            className="btn-outline full-width-mobile"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn-primary full-width-mobile"
          >
            Go Home
          </button>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-sm text-text-muted">
          Error Code: <span className="font-medium">403</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
