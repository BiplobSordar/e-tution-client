import React, { useState } from "react";
import {
  useGetTuitionsQuery,
  useApproveTuitionMutation,
  useRejectTuitionMutation,
  useUpdateTuitionStatusMutation,
  useDeleteTuitionMutation
} from "../../features/admin/adminApi";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  FiCheck,
  FiX,
  FiEye,
  FiTrash2,
  FiFilter,
  FiSearch,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiBook,
  FiClock,
  FiDownload,
  FiUnlock,
  FiUsers,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TuitionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  
  const { 
    data, 
    isLoading: isLoadingTuitions, 
    isError, 
    refetch 
  } = useGetTuitionsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: statusFilter !== "all" ? statusFilter : undefined,
    tuitionType: typeFilter !== "all" ? typeFilter : undefined,
    grade: gradeFilter !== "all" ? gradeFilter : undefined,
  });

  const [approveTuition] = useApproveTuitionMutation();
  const [rejectTuition] = useRejectTuitionMutation();
  const [updateStatus] = useUpdateTuitionStatusMutation();
  const [deleteTuition] = useDeleteTuitionMutation();

  const startAction = (id, actionType) => {
    setActionLoading(prev => ({ ...prev, [`${id}_${actionType}`]: true }));
  };

  const endAction = (id, actionType) => {
    setActionLoading(prev => ({ ...prev, [`${id}_${actionType}`]: false }));
  };

  const isActionLoading = (id, actionType) => {
    return actionLoading[`${id}_${actionType}`] || false;
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this tuition? It will become visible to tutors.")) {
      return;
    }
    
    startAction(id, 'approve');
    try {
      const result = await approveTuition(id).unwrap();
      if (result.success) {
        toast.success(result.message || "Tuition approved successfully!");
        refetch();
      } else {
        toast.error(result.message || "Failed to approve tuition");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to approve tuition");
    } finally {
      endAction(id, 'approve');
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    startAction(rejectingId, 'reject');
    try {
      const result = await rejectTuition({ 
        id: rejectingId, 
        reason: rejectReason 
      }).unwrap();
      
      if (result.success) {
        toast.success(result.message || "Tuition rejected successfully!");
        setIsRejectModalOpen(false);
        setRejectReason("");
        setRejectingId(null);
        refetch();
      } else {
        toast.error(result.message || "Failed to reject tuition");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject tuition");
    } finally {
      endAction(rejectingId, 'reject');
    }
  };

  const openRejectModal = (id) => {
    setRejectingId(id);
    setIsRejectModalOpen(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    startAction(id, 'status');
    try {
      const result = await updateStatus({ 
        id, 
        status: newStatus,
        reason: `Status changed to ${newStatus} by admin`
      }).unwrap();
      
      if (result.success) {
        toast.success(result.message || `Status updated to ${newStatus}`);
        refetch();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    } finally {
      endAction(id, 'status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tuition? This action cannot be undone.")) {
      return;
    }

    startAction(id, 'delete');
    try {
      const result = await deleteTuition(id).unwrap();
      if (result.success) {
        toast.success(result.message || "Tuition deleted successfully!");
        refetch();
      } else {
        toast.error(result.message || "Failed to delete tuition");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete tuition");
    } finally {
      endAction(id, 'delete');
    }
  };

  const viewDetails = (tuition) => {
    setSelectedTuition(tuition);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "online":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "offline":
        return "bg-green-100 text-green-800 border-green-200";
      case "hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAdminApprovalColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-secondary-light text-secondary border-secondary";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoadingTuitions) {
    return (
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="dashboard-card animate-pulse">
              <div className="h-3 bg-hover-bg rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-hover-bg rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="dashboard-card animate-pulse">
          <div className="h-64 bg-hover-bg rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="dashboard-card text-center py-8 sm:py-12">
          <FiAlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-error mx-auto mb-4" />
          <p className="text-text-secondary">Failed to load tuitions. Please try again.</p>
          <button 
            onClick={refetch} 
            className="btn-primary mt-4 px-4 py-2"
            disabled={isLoadingTuitions}
          >
            {isLoadingTuitions ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : null}
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tuitions = data?.data || [];
  const stats = data?.stats || {};
  const pagination = data?.pagination || {};

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const totalPages = pagination.pages || 1;
    const maxVisiblePages = 5;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      if (start > 1) pages.push(1);
      if (start > 2) pages.push('...');

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push('...');
      if (end < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="p-4 sm:p-6 w-full ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">Tuition Management</h1>
          <p className="text-text-secondary text-sm sm:text-base mt-1 sm:mt-2">
            Review, approve, and manage tuition posts
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => toast.success("Export feature coming soon!")}
            className="btn-outline flex items-center gap-2 text-sm px-3 sm:px-4 py-2"
            disabled={tuitions.length === 0}
          >
            <FiDownload className="text-sm" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={refetch}
            className="btn-primary flex items-center gap-2 text-sm px-3 sm:px-4 py-2"
            disabled={isLoadingTuitions}
          >
            {isLoadingTuitions ? (
              <AiOutlineLoading3Quarters className="animate-spin text-sm" />
            ) : (
              <span className="hidden sm:inline">Refresh</span>
            )}
            <span className="sm:hidden">↻</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">

        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">Total Tuitions</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.total || 0}</h3>
            </div>
            <div className="text-primary">
              <HiOutlineAcademicCap size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">Open</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.open || 0}</h3>
            </div>
            <div className="text-green-500">
              <FiUnlock size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">Assigned</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.assigned || 0}</h3>
            </div>
            <div className="text-blue-500">
              <FiUsers size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">In Progress</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.inProgress || 0}</h3>
            </div>
            <div className="text-yellow-500">
              <FiActivity size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">Completed</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.completed || 0}</h3>
            </div>
            <div className="text-purple-500">
              <FiCheckCircle size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs sm:text-sm">Cancelled</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{stats.cancelled || 0}</h3>
            </div>
            <div className="text-red-500">
              <FiXCircle size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="dashboard-card mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="lg:w-1/3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm sm:text-base" />
              <input
                type="text"
                placeholder="Search tuitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-9 sm:pl-10 text-sm sm:text-base py-2"
              />
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm sm:text-base" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-input pl-9 sm:pl-10 text-sm sm:text-base py-2 w-full"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="form-input text-sm sm:text-base py-2 w-full"
                >
                  <option value="all">All Types</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="form-input text-sm sm:text-base py-2 w-full"
                >
                  <option value="all">All Grades</option>
                  <option value="HSC">HSC</option>
                  <option value="SSC">SSC</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, pagination.total || 0)} of {pagination.total || 0} tuitions
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
                setGradeFilter("all");
              }}
              className="btn-outline text-xs sm:text-sm px-3 py-1.5"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block table-container mb-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="table-header">
                <th className="py-3 px-4 text-left text-sm font-medium">Tuition Details</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Posted By</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Subjects & Grade</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status & Type</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Admin Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-state py-8 sm:py-12">
                    <div className="text-center">
                      <FiSearch className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                      <p className="text-text-secondary">No tuitions found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tuitions.map((tuition) => (
                  <tr key={tuition._id} className="table-row">
                    <td className="py-4 px-4">
                      <div>
                        <h4 className="font-medium text-text-primary text-sm mb-1">{tuition.title}</h4>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                          {tuition.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <FiDollarSign className="text-green-500 text-xs" />
                            <span className="font-medium">${tuition.totalFee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin className="text-blue-500 text-xs" />
                            <span>{tuition.location?.city || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiCalendar className="text-purple-500 text-xs" />
                            <span>{format(new Date(tuition.createdAt), "MMM dd")}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light flex-center flex-shrink-0">
                          {tuition.postedBy?.avatarUrl ? (
                            <img 
                              src={tuition.postedBy.avatarUrl} 
                              alt={tuition.postedBy.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <span className="font-semibold text-primary text-sm">
                              {tuition.postedBy?.name?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary text-sm truncate">{tuition.postedBy?.name || "Unknown"}</p>
                          <p className="text-xs text-text-secondary truncate">{tuition.postedBy?.email}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {tuition.subjects?.slice(0, 3).map((subject, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              <FiBook className="mr-1" size={10} />
                              {subject}
                            </span>
                          ))}
                          {tuition.subjects?.length > 3 && (
                            <span className="text-xs text-text-secondary">+{tuition.subjects.length - 3} more</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <HiOutlineAcademicCap className="text-green-500 text-sm" />
                          <span>Grade: {tuition.grade || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <FiClock className="text-yellow-500 text-sm" />
                          <span>{tuition.applications?.length || 0} applications</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tuition.status)}`}>
                          {tuition.status}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(tuition.tuitionType)}`}>
                          {tuition.tuitionType}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getAdminApprovalColor(tuition.adminApprovalStatus)}`}>
                          {tuition.adminApprovalStatus || "pending"}
                        </span>
                        <div className="text-xs text-text-secondary">
                          {tuition.assignedTutor ? (
                            <div className="flex items-center gap-1">
                              <FiUser className="text-green-500" />
                              <span className="truncate">Assigned to {tuition.assignedTutor.name}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <FiUser className="text-gray-500" />
                              <span>No tutor assigned</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => viewDetails(tuition)}
                            className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1"
                          >
                            <FiEye size={12} />
                            View
                          </button>
                          {tuition.adminApprovalStatus === "pending" && (
                            <button
                              onClick={() => handleApprove(tuition._id)}
                              disabled={isActionLoading(tuition._id, 'approve')}
                              className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
                            >
                              {isActionLoading(tuition._id, 'approve') ? (
                                <AiOutlineLoading3Quarters className="animate-spin mr-1" size={12} />
                              ) : (
                                <FiCheck size={12} />
                              )}
                              {isActionLoading(tuition._id, 'approve') ? "..." : "Approve"}
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {tuition.adminApprovalStatus === "pending" && (
                            <button
                              onClick={() => openRejectModal(tuition._id)}
                              disabled={isActionLoading(tuition._id, 'reject')}
                              className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              {isActionLoading(tuition._id, 'reject') ? (
                                <AiOutlineLoading3Quarters className="animate-spin mr-1" size={12} />
                              ) : (
                                <FiX size={12} />
                              )}
                              {isActionLoading(tuition._id, 'reject') ? "..." : "Reject"}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(tuition._id)}
                            disabled={isActionLoading(tuition._id, 'delete')}
                            className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            {isActionLoading(tuition._id, 'delete') ? (
                              <AiOutlineLoading3Quarters className="animate-spin mr-1" size={12} />
                            ) : (
                              <FiTrash2 size={12} />
                            )}
                            {isActionLoading(tuition._id, 'delete') ? "..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet View (768px - 1024px) */}
      <div className="hidden md:block lg:hidden mb-6">
        <div className="grid grid-cols-1 gap-4">
          {tuitions.length === 0 ? (
            <div className="dashboard-card py-12 text-center">
              <FiSearch className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
              <p className="text-text-secondary">No tuitions found matching your criteria</p>
            </div>
          ) : (
            tuitions.map((tuition) => (
              <div key={tuition._id} className="dashboard-card">
                <div className="space-y-4">
                  <div className="flex-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-primary text-sm">{tuition.title}</h3>
                      <p className="text-xs text-text-secondary">
                        Posted {format(new Date(tuition.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tuition.status)}`}>
                        {tuition.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getAdminApprovalColor(tuition.adminApprovalStatus)}`}>
                        {tuition.adminApprovalStatus || "pending"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light flex-center flex-shrink-0">
                          {tuition.postedBy?.avatarUrl ? (
                            <img 
                              src={tuition.postedBy.avatarUrl} 
                              alt={tuition.postedBy.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <span className="font-semibold text-primary text-sm">
                              {tuition.postedBy?.name?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{tuition.postedBy?.name}</p>
                          <p className="text-xs text-text-secondary truncate">{tuition.postedBy?.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <FiDollarSign className="text-green-500" />
                          <span>${tuition.totalFee}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <HiOutlineAcademicCap className="text-green-500" />
                          <span>{tuition.grade || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {tuition.subjects?.slice(0, 3).map((subject, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {subject}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FiMapPin className="text-blue-500" />
                          <span>{tuition.location?.city || "N/A"}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <button
                            onClick={() => viewDetails(tuition)}
                            className="btn-outline w-full text-xs py-1.5 flex items-center justify-center gap-1"
                          >
                            <FiEye size={12} />
                            Details
                          </button>
                        </div>
                        {tuition.adminApprovalStatus === "pending" && (
                          <div className="flex-1">
                            <button
                              onClick={() => handleApprove(tuition._id)}
                              disabled={isActionLoading(tuition._id, 'approve')}
                              className="btn-primary w-full text-xs py-1.5 flex items-center justify-center gap-1"
                            >
                              {isActionLoading(tuition._id, 'approve') ? (
                                <AiOutlineLoading3Quarters className="animate-spin" size={12} />
                              ) : (
                                <FiCheck size={12} />
                              )}
                              {isActionLoading(tuition._id, 'approve') ? "..." : "Approve"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mb-6">
        {tuitions.length === 0 ? (
          <div className="dashboard-card py-12 text-center">
            <FiSearch className="w-10 h-10 text-text-secondary mx-auto mb-3 opacity-50" />
            <p className="text-text-secondary text-sm">No tuitions found matching your criteria</p>
          </div>
        ) : (
          tuitions.map((tuition) => (
            <div key={tuition._id} className="dashboard-card">
              <div className="space-y-4">
                <div className="flex-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text-primary text-sm">{tuition.title}</h3>
                    <p className="text-xs text-text-secondary">
                      Posted {format(new Date(tuition.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getAdminApprovalColor(tuition.adminApprovalStatus)}`}>
                      {tuition.adminApprovalStatus || "pending"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-hover-bg p-3 rounded-lg">
                    <p className="text-xs text-text-secondary mb-1">Fee</p>
                    <p className="font-medium text-sm">${tuition.totalFee}</p>
                  </div>
                  <div className="bg-hover-bg p-3 rounded-lg">
                    <p className="text-xs text-text-secondary mb-1">Grade</p>
                    <p className="font-medium text-sm">{tuition.grade || "N/A"}</p>
                  </div>
                  <div className="bg-hover-bg p-3 rounded-lg">
                    <p className="text-xs text-text-secondary mb-1">Location</p>
                    <p className="font-medium text-sm truncate">{tuition.location?.city || "N/A"}</p>
                  </div>
                  <div className="bg-hover-bg p-3 rounded-lg">
                    <p className="text-xs text-text-secondary mb-1">Applications</p>
                    <p className="font-medium text-sm">{tuition.applications?.length || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-light flex-center flex-shrink-0">
                    {tuition.postedBy?.avatarUrl ? (
                      <img 
                        src={tuition.postedBy.avatarUrl} 
                        alt={tuition.postedBy.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="font-semibold text-primary text-xs">
                        {tuition.postedBy?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{tuition.postedBy?.name}</p>
                    <p className="text-xs text-text-secondary truncate">{tuition.postedBy?.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tuition.subjects?.slice(0, 3).map((subject, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <button
                    onClick={() => viewDetails(tuition)}
                    className="btn-outline flex-1 text-xs py-2 flex items-center justify-center gap-1"
                  >
                    <FiEye size={12} />
                    View
                  </button>
                  {tuition.adminApprovalStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(tuition._id)}
                        disabled={isActionLoading(tuition._id, 'approve')}
                        className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1"
                      >
                        {isActionLoading(tuition._id, 'approve') ? (
                          <AiOutlineLoading3Quarters className="animate-spin" size={12} />
                        ) : (
                          <FiCheck size={12} />
                        )}
                        {isActionLoading(tuition._id, 'approve') ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => openRejectModal(tuition._id)}
                        disabled={isActionLoading(tuition._id, 'reject')}
                        className="btn-outline flex-1 text-xs py-2 flex items-center justify-center gap-1 text-red-600 border-red-600"
                      >
                        {isActionLoading(tuition._id, 'reject') ? (
                          <AiOutlineLoading3Quarters className="animate-spin" size={12} />
                        ) : (
                          <FiX size={12} />
                        )}
                        {isActionLoading(tuition._id, 'reject') ? "..." : "Reject"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.total > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-xs sm:text-sm text-text-secondary">
            Page {currentPage} of {pagination.pages || 1}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <FiChevronsLeft size={16} />
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <FiChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1 mx-2">
              {generatePageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'btn-outline'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages || 1))}
              disabled={currentPage === (pagination.pages || 1)}
              className="btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <FiChevronRight size={16} />
            </button>
            
            <button
              onClick={() => setCurrentPage(pagination.pages || 1)}
              disabled={currentPage === (pagination.pages || 1)}
              className="btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <FiChevronsRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-text-secondary">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="form-input text-xs sm:text-sm py-1.5"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedTuition && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsDetailModalOpen(false)} />
          <div className="flex items-start justify-center min-h-screen p-2 sm:p-4">
            <div className="relative bg-card-bg rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-2 sm:m-4 border border-border">
              <div className="flex-between p-4 sm:p-6 border-b border-border">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-text-primary truncate">{selectedTuition.title}</h2>
                  <p className="text-text-secondary text-sm">Tuition Details</p>
                </div>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-text-secondary hover:text-text-primary p-1 ml-2"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">Basic Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-text-secondary">Description</p>
                        <p className="mt-1 text-sm sm:text-base">{selectedTuition.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Total Fee</p>
                        <p className="mt-1 font-bold text-lg sm:text-xl">${selectedTuition.totalFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Grade Level</p>
                        <p className="mt-1 text-sm sm:text-base">{selectedTuition.grade || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Tuition Type</p>
                        <p className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedTuition.tuitionType)}`}>
                            {selectedTuition.tuitionType}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Admin Status</p>
                        <p className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getAdminApprovalColor(selectedTuition.adminApprovalStatus)}`}>
                            {selectedTuition.adminApprovalStatus || "pending"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedTuition.location && (
                    <div>
                      <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">Location</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-text-secondary">City</p>
                          <p className="mt-1 text-sm sm:text-base">{selectedTuition.location.city}</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Area</p>
                          <p className="mt-1 text-sm sm:text-base">{selectedTuition.location.area}</p>
                        </div>
                        {selectedTuition.location.address && (
                          <div className="sm:col-span-2">
                            <p className="text-sm text-text-secondary">Address</p>
                            <p className="mt-1 text-sm sm:text-base">{selectedTuition.location.address}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">Posted By</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-light flex-center flex-shrink-0">
                        {selectedTuition.postedBy?.avatarUrl ? (
                          <img 
                            src={selectedTuition.postedBy.avatarUrl} 
                            alt={selectedTuition.postedBy.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <span className="font-semibold text-primary">
                            {selectedTuition.postedBy?.name?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{selectedTuition.postedBy?.name}</p>
                        <p className="text-sm text-text-secondary truncate">{selectedTuition.postedBy?.email}</p>
                        {selectedTuition.postedBy?.phone && (
                          <p className="text-sm text-text-secondary truncate">{selectedTuition.postedBy.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTuition.subjects?.map((subject, idx) => (
                        <span key={idx} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-800 text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedTuition.applications && selectedTuition.applications.length > 0 && (
                    <div>
                      <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">
                        Tutor Applications ({selectedTuition.applications.length})
                      </h3>
                      <div className="space-y-3">
                        {selectedTuition.applications.map((app, idx) => (
                          <div key={idx} className="p-3 border border-border rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light flex-center flex-shrink-0">
                                {app.tutor?.avatarUrl ? (
                                  <img 
                                    src={app.tutor.avatarUrl} 
                                    alt={app.tutor.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <span className="font-semibold text-primary">
                                    {app.tutor?.name?.charAt(0) || 'T'}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm sm:text-base truncate">{app.tutor?.name}</p>
                                <p className="text-sm text-text-secondary">Proposed: ${app.proposedRate}/hr</p>
                              </div>
                            </div>
                            {app.message && (
                              <p className="text-sm text-text-secondary mt-2">{app.message}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTuition.statusHistory && selectedTuition.statusHistory.length > 0 && (
                    <div>
                      <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4 text-sm sm:text-base">Status History</h3>
                      <div className="space-y-3">
                        {selectedTuition.statusHistory.map((history, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm sm:text-base">{history.status}</p>
                              <p className="text-sm text-text-secondary">
                                {format(new Date(history.changedAt), "MMM dd, yyyy HH:mm")}
                              </p>
                              {history.reason && (
                                <p className="text-sm text-text-secondary mt-1">{history.reason}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-actions mt-6">
                  <button
                    type="button"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  {selectedTuition.adminApprovalStatus === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleApprove(selectedTuition._id);
                          setIsDetailModalOpen(false);
                        }}
                        disabled={isActionLoading(selectedTuition._id, 'approve')}
                        className="btn-primary"
                      >
                        {isActionLoading(selectedTuition._id, 'approve') ? (
                          <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                        ) : null}
                        Approve Tuition
                      </button>
                      <button
                        onClick={() => {
                          setIsDetailModalOpen(false);
                          setRejectingId(selectedTuition._id);
                          setIsRejectModalOpen(true);
                        }}
                        disabled={isActionLoading(selectedTuition._id, 'reject')}
                        className="btn-outline text-red-600 border-red-600"
                      >
                        Reject Tuition
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsRejectModalOpen(false)} />
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-card-bg rounded-lg shadow-lg w-full max-w-md border border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Reject Tuition</h3>
                <p className="text-text-secondary mb-4">
                  Please provide a reason for rejecting this tuition. This will be recorded in the status history.
                </p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="form-input h-32 mb-4"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsRejectModalOpen(false);
                      setRejectReason("");
                      setRejectingId(null);
                    }}
                    className="btn-outline"
                    disabled={isRejecting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isRejecting || !rejectReason.trim()}
                    className="btn-primary bg-red-600 hover:bg-red-700 flex items-center gap-2"
                  >
                    {isRejecting ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : null}
                    Confirm Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionManagement;