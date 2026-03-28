import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaCheckCircle,
  FaCalendar,
  FaBook,
  FaClock,
} from "react-icons/fa";

// ===== DUMMY DATA – REPLACE WITH API CALLS LATER =====
const mockProgressData = {
  "1": {
    name: "Rafiq Ahmed",
    grade: "10",
    overallProgress: 75,
    subjects: [
      { name: "Math", progress: 80, assignmentsCompleted: 12, totalAssignments: 15 },
      { name: "Physics", progress: 70, assignmentsCompleted: 7, totalAssignments: 10 },
      { name: "Chemistry", progress: 65, assignmentsCompleted: 8, totalAssignments: 12 },
    ],
    attendance: 92,
    assignmentsCompleted: 27,
    totalAssignments: 37,
    recentActivities: [
      { date: "2024-03-20", description: "Completed Math assignment: Algebra", type: "assignment" },
      { date: "2024-03-19", description: "Attended Physics class", type: "attendance" },
      { date: "2024-03-18", description: "Submitted Chemistry lab report", type: "assignment" },
    ],
    upcoming: [
      { date: "2024-03-25", description: "Math exam", type: "exam" },
      { date: "2024-03-28", description: "Physics quiz", type: "quiz" },
    ],
  },
  "2": {
    name: "Sumaiya Akter",
    grade: "8",
    overallProgress: 85,
    subjects: [
      { name: "Bangla", progress: 90, assignmentsCompleted: 9, totalAssignments: 10 },
      { name: "English", progress: 88, assignmentsCompleted: 14, totalAssignments: 16 },
      { name: "Science", progress: 82, assignmentsCompleted: 9, totalAssignments: 11 },
    ],
    attendance: 95,
    assignmentsCompleted: 32,
    totalAssignments: 37,
    recentActivities: [
      { date: "2024-03-20", description: "Scored A+ in English test", type: "exam" },
      { date: "2024-03-19", description: "Submitted Science project", type: "assignment" },
    ],
    upcoming: [
      { date: "2024-03-26", description: "Bangla oral test", type: "exam" },
    ],
  },
  "3": {
    name: "Tanvir Hossain",
    grade: "12",
    overallProgress: 60,
    subjects: [
      { name: "Higher Math", progress: 55, assignmentsCompleted: 5, totalAssignments: 9 },
      { name: "Physics", progress: 65, assignmentsCompleted: 6, totalAssignments: 9 },
      { name: "ICT", progress: 70, assignmentsCompleted: 7, totalAssignments: 10 },
    ],
    attendance: 78,
    assignmentsCompleted: 18,
    totalAssignments: 28,
    recentActivities: [
      { date: "2024-03-20", description: "Missed Physics class", type: "attendance" },
      { date: "2024-03-18", description: "Completed ICT assignment", type: "assignment" },
    ],
    upcoming: [
      { date: "2024-03-24", description: "Higher Math exam", type: "exam" },
      { date: "2024-03-27", description: "Physics lab submission", type: "assignment" },
    ],
  },
  "4": {
    name: "Fatima Begum",
    grade: "5",
    overallProgress: 92,
    subjects: [
      { name: "Bangla", progress: 95, assignmentsCompleted: 10, totalAssignments: 10 },
      { name: "English", progress: 90, assignmentsCompleted: 9, totalAssignments: 10 },
      { name: "Math", progress: 88, assignmentsCompleted: 8, totalAssignments: 9 },
      { name: "Science", progress: 92, assignmentsCompleted: 11, totalAssignments: 12 },
    ],
    attendance: 98,
    assignmentsCompleted: 38,
    totalAssignments: 41,
    recentActivities: [
      { date: "2024-03-21", description: "Scored 100% in Math quiz", type: "exam" },
      { date: "2024-03-20", description: "Submitted Science project", type: "assignment" },
    ],
    upcoming: [
      { date: "2024-03-28", description: "English composition test", type: "exam" },
    ],
  },
};
// =================================================

const StudentProgress = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ===== REPLACE THIS WITH REAL API CALL =====
    // Example: const { data, isLoading } = useGetStudentProgressQuery(studentId);
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const data = mockProgressData[studentId];
        if (data) setStudent(data);
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex-center h-64">
        <div className="text-text-secondary text-sm sm:text-base">Loading progress...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-12 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">Student not found</h2>
        <button onClick={() => navigate("/guardian/students")} className="btn-primary">
          Back to Students
        </button>
      </div>
    );
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-error";
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header with back button */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => navigate("/guardian/students")}
          className="p-2 rounded-full hover:bg-hover-bg transition"
          aria-label="Back"
        >
          <FaArrowLeft className="text-text-primary text-sm sm:text-base" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">{student.name}</h1>
          <p className="text-sm sm:text-base text-text-secondary">Grade {student.grade}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
            <FaChartLine className="text-xl sm:text-2xl text-primary" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Overall Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">{student.overallProgress}%</p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-success/10 rounded-full">
            <FaCheckCircle className="text-xl sm:text-2xl text-success" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Assignments Completed</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">
              {student.assignmentsCompleted}/{student.totalAssignments}
            </p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-info/10 rounded-full">
            <FaClock className="text-xl sm:text-2xl text-info" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Attendance</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">{student.attendance}%</p>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-card">
          <div className="p-2 sm:p-3 bg-warning/10 rounded-full">
            <FaBook className="text-xl sm:text-2xl text-warning" />
          </div>
          <div>
            <p className="text-text-secondary text-xs sm:text-sm">Subjects Enrolled</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">{student.subjects.length}</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Progress */}
      <div className="bg-card-bg border border-border rounded-lg shadow-card p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
          Subject-wise Progress
        </h2>
        <div className="space-y-6">
          {student.subjects.map((subject, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs sm:text-sm text-text-secondary mb-1">
                <span>{subject.name}</span>
                <span>{subject.progress}%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(subject.progress)}`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-text-secondary whitespace-nowrap">
                  {subject.assignmentsCompleted}/{subject.totalAssignments}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card-bg border border-border rounded-lg shadow-card overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
            <h3 className="font-semibold text-text-primary text-sm sm:text-base">
              Recent Activities
            </h3>
          </div>
          <ul className="divide-y divide-border">
            {student.recentActivities.map((activity, idx) => (
              <li key={idx} className="px-4 sm:px-6 py-3 hover:bg-hover-bg">
                <p className="text-text-primary text-sm sm:text-base">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                  <FaCalendar />
                  <span>{activity.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card-bg border border-border rounded-lg shadow-card overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
            <h3 className="font-semibold text-text-primary text-sm sm:text-base">
              Upcoming Events
            </h3>
          </div>
          <ul className="divide-y divide-border">
            {student.upcoming.map((event, idx) => (
              <li key={idx} className="px-4 sm:px-6 py-3 hover:bg-hover-bg">
                <p className="text-text-primary text-sm sm:text-base">{event.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                  <FaCalendar />
                  <span>{event.date}</span>
                </div>
              </li>
            ))}
            {student.upcoming.length === 0 && (
              <li className="px-4 sm:px-6 py-4 text-text-secondary text-center text-sm sm:text-base">
                No upcoming events.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;