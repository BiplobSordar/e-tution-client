



import React, { useState } from "react";
import { FaEye, FaChalkboardTeacher, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetGuardianStudentsQuery } from "../../features/guardian/guardianApi";

const MyStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetGuardianStudentsQuery();
  console.log(error)

  const dashboard = data?.data || {
    students: [],
    totalStudents: 0,
    activeTuitions: 0,
    pendingTuitions: 0,
    avgProgress: 0,
  };
  const students = dashboard.students;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-error";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="badge-success">Active</span>;
      case "pending":
        return <span className="status-badge-pending">Pending</span>;
      default:
        return <span className="status-badge-default">Inactive</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-center h-64">
        <div className="text-text-secondary text-sm sm:text-base">Loading students...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 sm:px-0">
        <p className="text-error">Error loading students. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">My Students</h1>
          <p className="text-sm sm:text-base text-text-secondary">
            Manage and monitor your children's educational journey
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
            <FaEye className="text-xl sm:text-2xl text-primary" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Total Students</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">
              {dashboard.totalStudents}
            </p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-success/10 rounded-full">
            <FaChalkboardTeacher className="text-xl sm:text-2xl text-success" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Active Tuitions</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">
              {dashboard.activeTuitions}
            </p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-warning/10 rounded-full">
            <FaChalkboardTeacher className="text-xl sm:text-2xl text-warning" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Pending Tuitions</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">
              {dashboard.pendingTuitions}
            </p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-info/10 rounded-full">
            <FaEye className="text-xl sm:text-2xl text-info" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Avg. Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">
              {dashboard.avgProgress}%
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input w-full pl-10"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
      </div>

      {/* Students Table */}
      <div className="bg-card-bg border border-border rounded-lg shadow-card overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
          <h2 className="text-base sm:text-lg font-semibold text-text-primary">Student List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-hover-bg">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Name</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Grade</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Subjects</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Progress</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Last Active</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Status</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-6 py-6 sm:py-8 text-center text-text-secondary text-sm sm:text-base">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t border-border hover:bg-hover-bg">
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-text-primary font-medium text-sm sm:text-base">
                      {student.name}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-text-primary text-sm sm:text-base">
                      {student.grade}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-text-primary text-sm sm:text-base">
                      {student.subjects.join(", ")}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-text-secondary">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-text-secondary text-xs sm:text-sm">
                      {student.lastActive}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      {getStatusBadge(student.tuitionStatus)}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/guardian/students/${student.id}/progress`)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-full transition"
                          title="View Progress"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => navigate(`/guardian/students/${student.id}/tuition`)}
                          className="p-2 text-info hover:bg-info/10 rounded-full transition"
                          title="Manage Tuition"
                        >
                          <FaChalkboardTeacher />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyStudents;