import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
      <p className="text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => navigate(-1)} 
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default Unauthorized;
