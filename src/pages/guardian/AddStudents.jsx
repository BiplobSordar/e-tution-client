// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// // Mock student list (replace with API call)
// const mockStudents = [
//   {
//     _id: "s1",
//     name: "Rafiq Ahmed",
//     email: "rafiq@example.com",
//     grade: "10",
//   },
//   {
//     _id: "s2",
//     name: "Sumaiya Akter",
//     email: "sumaiya@example.com",
//     grade: "8",
//   },
//   {
//     _id: "s3",
//     name: "Tanvir Hossain",
//     email: "tanvir@example.com",
//     grade: "12",
//   },
//   {
//     _id: "s4",
//     name: "Fatima Begum",
//     email: "fatima@example.com",
//     grade: "5",
//   },
//   {
//     _id: "s5",
//     name: "Nazmul Hasan",
//     email: "nazmul@example.com",
//     grade: "9",
//   },
// ];

// const AddStudent = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [relation, setRelation] = useState("");
//   const [canViewProgress, setCanViewProgress] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;

//     setSearching(true);
//     // Simulate API search
//     setTimeout(() => {
//       const filtered = mockStudents.filter(
//         (student) =>
//           student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           student.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filtered);
//       setSearching(false);
//     }, 500);
//   };

//   const handleSelectStudent = (student) => {
//     setSelectedStudent(student);
//     setSearchResults([]);
//     setSearchTerm("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedStudent) {
//       toast.error("Please select a student first.");
//       return;
//     }
//     if (!relation.trim()) {
//       toast.error("Please specify your relation to the student.");
//       return;
//     }

//     setLoading(true);
//     // Simulate API call to create guardian request
//     setTimeout(() => {
//       // In real app, send: { studentId: selectedStudent._id, relation, canViewProgress }
//       toast.success(`Request sent to ${selectedStudent.name}`);
//       setLoading(false);
//       // Clear form
//       setSelectedStudent(null);
//       setRelation("");
//       setCanViewProgress(true);
//       // Optionally navigate back to dashboard or stay
//       navigate("/guardian");
//     }, 1000);
//   };

//   const handleCancel = () => {
//     navigate("/guardian");
//   };

//   return (
//     <div className="max-w-full overflow-x-hidden space-y-8 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
//             Add Student to Your Profile
//           </h1>
//           <p className="text-sm sm:text-base text-text-secondary mt-1">
//             Search for a student and send a guardian request. Once accepted, you'll be able to monitor their progress.
//           </p>
//         </div>
//         <button
//           onClick={handleCancel}
//           className="btn-outline w-full sm:w-auto text-center"
//         >
//           Cancel
//         </button>
//       </div>

//       {/* Search Section */}
//       <div className="bg-card-bg border border-border rounded-lg shadow-card p-6">
//         <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
//           Find a Student
//         </h2>
//         <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="form-input w-full"
//               disabled={searching}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn-primary flex items-center justify-center gap-2 sm:w-auto"
//             disabled={searching}
//           >
//             {searching ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <>
//                 <FaSearch /> Search
//               </>
//             )}
//           </button>
//         </form>

//         {/* Search Results */}
//         {searchResults.length > 0 && (
//           <div className="mt-4 border border-border rounded-lg overflow-hidden">
//             <ul className="divide-y divide-border">
//               {searchResults.map((student) => (
//                 <li
//                   key={student._id}
//                   className="p-3 hover:bg-hover-bg cursor-pointer transition"
//                   onClick={() => handleSelectStudent(student)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-text-primary">{student.name}</p>
//                       <p className="text-xs text-text-secondary">{student.email}</p>
//                     </div>
//                     <div className="text-xs text-text-secondary">Grade {student.grade}</div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {searching && searchResults.length === 0 && (
//           <div className="mt-4 text-center text-text-secondary">Searching...</div>
//         )}

//         {!searching && searchTerm && searchResults.length === 0 && (
//           <div className="mt-4 text-center text-text-secondary">No students found.</div>
//         )}
//       </div>

//       {/* Selected Student Card */}
//       {selectedStudent && (
//         <div className="bg-card-bg border border-border rounded-lg shadow-card p-6">
//           <div className="flex justify-between items-start mb-4">
//             <h2 className="text-base sm:text-lg font-semibold text-text-primary">
//               Selected Student
//             </h2>
//             <button
//               onClick={() => setSelectedStudent(null)}
//               className="text-error hover:bg-error/10 p-1 rounded"
//             >
//               <FaTimes />
//             </button>
//           </div>
//           <div className="p-4 bg-hover-bg rounded-lg mb-4">
//             <p className="font-medium text-text-primary">{selectedStudent.name}</p>
//             <p className="text-sm text-text-secondary">{selectedStudent.email}</p>
//             <p className="text-sm text-text-secondary">Grade {selectedStudent.grade}</p>
//           </div>

//           {/* Relation & Options */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="form-group">
//               <label className="form-label">
//                 Your Relation to the Student <span className="text-error">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={relation}
//                 onChange={(e) => setRelation(e.target.value)}
//                 placeholder="e.g., Father, Mother, Uncle"
//                 className="form-input w-full"
//                 required
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 id="canViewProgress"
//                 checked={canViewProgress}
//                 onChange={(e) => setCanViewProgress(e.target.checked)}
//                 className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
//               />
//               <label htmlFor="canViewProgress" className="form-label mb-0">
//                 Allow me to view academic progress
//               </label>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn-primary flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <FaUserPlus /> Send Request
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="btn-outline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Explanation */}
//       <div className="text-sm text-text-secondary bg-card-bg border border-border rounded-lg p-4">
//         <p className="font-semibold mb-1">How it works:</p>
//         <ul className="list-disc list-inside space-y-1">
//           <li>Search for a student by name or email.</li>
//           <li>Select the student from the results.</li>
//           <li>Specify your relation to the student (e.g., Father, Mother).</li>
//           <li>Choose whether you want to view their academic progress.</li>
//           <li>Send the request. The student will receive a notification and can accept or reject.</li>
//           <li>Once accepted, the student will appear in your "My Students" list.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddStudent;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useCreateGuardianRequestMutation } from "../../features/guardian/guardianApi";

const AddStudent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [studentEmail, setStudentEmail] = useState("");
  const [relation, setRelation] = useState("");
  const [canViewProgress, setCanViewProgress] = useState(true);
  const [createRequest, { isLoading }] = useCreateGuardianRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentEmail.trim()) {
      toast.error("Please enter student's email.");
      return;
    }
    if (!relation.trim()) {
      toast.error("Please specify your relation to the student.");
      return;
    }

    try {
      await createRequest({
        studentEmail: studentEmail.trim(),
        relation,
        canViewProgress,
      }).unwrap();
      toast.success(`Request sent to ${studentEmail}`);
      // Clear form and navigate
      setStudentEmail("");
      setRelation("");
      setCanViewProgress(true);
      navigate("/guardian");
    } catch (err) {
      toast.error(err.data?.message || "Failed to send request");
    }
  };

  const handleCancel = () => {
    navigate("/guardian");
  };

  return (
    <div className="max-w-full overflow-x-hidden space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Add Student to Your Profile
          </h1>
          <p className="text-sm sm:text-base text-text-secondary mt-1">
            Enter the student's email address to send a guardian request.
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="btn-outline w-full sm:w-auto text-center"
        >
          Cancel
        </button>
      </div>

      {/* Form */}
      <div className="bg-card-bg border border-border rounded-lg shadow-card p-6">
        <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
          Student Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label">
              Student's Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="student@example.com"
              className="form-input w-full"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Your Relation to the Student <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="e.g., Father, Mother, Uncle"
              className="form-input w-full"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="canViewProgress"
              checked={canViewProgress}
              onChange={(e) => setCanViewProgress(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="canViewProgress" className="form-label mb-0">
              Allow me to view academic progress
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FaUserPlus /> Send Request
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Explanation */}
      <div className="text-sm text-text-secondary bg-card-bg border border-border rounded-lg p-4">
        <p className="font-semibold mb-1">How it works:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Enter the student's email address.</li>
          <li>Specify your relation to the student (e.g., Father, Mother).</li>
          <li>Choose whether you want to view their academic progress.</li>
          <li>Send the request. The student will receive a notification and can accept or reject.</li>
          <li>Once accepted, the student will appear in your "My Students" list.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddStudent;