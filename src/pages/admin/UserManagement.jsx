import React, { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "../../features/admin/adminApi";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiDownload
} from 'react-icons/fi';

const UserManagement = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;


  const openEditModal = (user) => {
    setEditingUser({ ...user });
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };


  const toggleRowExpansion = (userId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: editingUser._id, ...editingUser }).unwrap();
      toast.success("User updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete user");
    }
  };


  const handleStatusChange = async (id, status) => {
    try {
      await updateUser({ id, status }).unwrap();
      toast.success(`User ${status} successfully`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const filteredUsers = data?.data?.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  }) || [];


  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);


  const stats = {
    total: data?.data?.length || 0,
    active: data?.data?.filter(u => u.status === 'active').length || 0,
    pending: data?.data?.filter(u => u.status === 'pending').length || 0,
    tutors: data?.data?.filter(u => u.role === 'teacher').length || 0,
    students: data?.data?.filter(u => u.role === 'student').length || 0,
    guardians: data?.data?.filter(u => u.role === 'guardian').length || 0,
    admins: data?.data?.filter(u => u.role === 'admin').length || 0,
  };

  
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'suspended': return 'badge-error';
      case 'restricted': return 'badge-warning';
      case 'banned': return 'badge-error';
      default: return 'badge-info';
    }
  };

 
  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'guardian': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (isLoading) return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="dashboard-card skeleton h-32"></div>
        ))}
      </div>
      <div className="table-container">
        <div className="skeleton h-64"></div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="p-4 md:p-6">
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <p className="text-text-secondary">Failed to load users. Please try again.</p>
        <button onClick={refetch} className="btn-primary mt-4">Retry</button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">

      <div className="flex-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary text-sm md:text-base mt-2">Manage all user accounts and permissions</p>
        </div>
        <button
          onClick={() => {
       
            toast.success("Export feature coming soon!");
          }}
          className="btn-outline flex items-center gap-2"
        >
          <FiDownload /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Total Users</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.total}</h3>
            </div>
            <div className="text-2xl md:text-3xl">👥</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Active</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.active}</h3>
            </div>
      
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Pending</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.pending}</h3>
            </div>
           
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Tutors</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.tutors}</h3>
            </div>
         
          </div>
        </div>
      </div>

      <div className="dashboard-card mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1">
            <div className="flex-1">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="form-input pl-10"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Student</option>
                  <option value="teacher">Tutor</option>
                  <option value="guardian">Guardian</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex-1">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="restricted">Restricted</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-text-secondary">
            Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length} users
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              className="btn-outline text-sm px-3 py-1.5"
            >
              Clear Filters
            </button>
            <button
              onClick={refetch}
              className="btn-primary text-sm px-3 py-1.5"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

    
      <div className="hidden md:block table-container mb-6">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th 
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => {
                  setSortField('name');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                <div className="flex items-center gap-1">
                  User
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th 
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => {
                  setSortField('role');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
              >
                <div className="flex items-center gap-1">
                  Role & Status
                  {sortField === 'role' && (
                    sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Profile Info</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state py-12">
                  <div className="empty-state-icon">🔍</div>
                  <p className="text-text-secondary mt-2">No users found matching your criteria</p>
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user._id} className="table-row">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light flex-center">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-semibold text-primary">
                            {user.name?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">
                          ID: {user.uid?.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <FiMail className="text-text-secondary" size={14} />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <FiPhone size={14} />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                        {user.role === 'teacher' ? 'Tutor' : user.role}
                      </span>
                      <div>
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user._id, e.target.value)}
                          className="form-input text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="restricted">Restricted</option>
                          <option value="banned">Banned</option>
                          <option value="deleted">Deleted</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div>
                      <div className="mb-2">
                        <div className="flex-between text-sm mb-1">
                          <span className="text-text-secondary">Profile</span>
                          <span className="font-medium">{user.profileCompletion?.percentage || 0}%</span>
                        </div>
                        <div className="w-full bg-hover-bg rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${user.profileCompletion?.percentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <FiCalendar size={14} />
                        <span>Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="btn-outline text-sm px-3 py-1.5 flex items-center gap-1"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn-outline text-sm px-3 py-1.5 flex items-center gap-1 text-error border-error hover:bg-error hover:text-white"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 mb-6">
        {currentUsers.length === 0 ? (
          <div className="empty-state py-12">
            <div className="empty-state-icon">🔍</div>
            <p className="text-text-secondary mt-2">No users found matching your criteria</p>
          </div>
        ) : (
          currentUsers.map((user) => (
            <div 
              key={user._id} 
              className={`dashboard-card overflow-hidden transition-all duration-300 ${
                expandedRows.has(user._id) ? 'border-primary' : ''
              }`}
            >
              <div 
                className="cursor-pointer"
                onClick={() => toggleRowExpansion(user._id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-light flex-center">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-semibold text-primary text-lg">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-text-secondary">
                    {expandedRows.has(user._id) ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                    {user.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                    {user.role === 'teacher' ? 'Tutor' : user.role}
                  </span>
                </div>
              </div>
              
         
              {expandedRows.has(user._id) && (
                <div className="pt-4 border-t border-border animate-fade-in">
                  <div className="space-y-4">
                
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FiMail className="text-text-secondary" size={16} />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2">
                            <FiPhone className="text-text-secondary" size={16} />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">Profile Information</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex-between text-sm mb-1">
                            <span>Completion</span>
                            <span>{user.profileCompletion?.percentage || 0}%</span>
                          </div>
                          <div className="w-full bg-hover-bg rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${user.profileCompletion?.percentage || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <FiCalendar size={14} />
                          <span>Joined: {format(new Date(user.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    
           
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-2">Account Status</h4>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className="form-input text-sm w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="restricted">Restricted</option>
                        <option value="banned">Banned</option>
                        <option value="deleted">Deleted</option>
                      </select>
                    </div>
                    
                 
                    <div className="pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn-primary flex-1 flex items-center justify-center gap-2 py-2"
                        >
                          <FiEdit2 size={16} /> Edit User
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn-outline flex-1 flex items-center justify-center gap-2 py-2 text-error border-error hover:bg-error hover:text-white"
                        >
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>


      {sortedUsers.length > usersPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-text-secondary">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'btn-outline'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 rounded-lg btn-outline flex items-center justify-center"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Show:</span>
            <select
              value={usersPerPage}
              onChange={(e) => {
                setUsersPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="form-input text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

  
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="flex items-start justify-center min-h-screen p-2 md:p-4">
            <div className="relative bg-card-bg rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-2 md:m-4">
           
              <div className="flex-between p-4 md:p-6 border-b border-border">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-text-primary">Edit User</h2>
                  <p className="text-text-secondary text-sm">Update user information and permissions</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-text-secondary hover:text-text-primary p-1"
                >
                  ✕
                </button>
              </div>
              
            
              <form onSubmit={handleUpdate} className="p-4 md:p-6">
                <div className="space-y-6">
        
                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          value={editingUser.name || ''}
                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          value={editingUser.email || ''}
                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          value={editingUser.phone || ''}
                          onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Avatar URL</label>
                        <input
                          type="url"
                          value={editingUser.avatarUrl || ''}
                          onChange={(e) => setEditingUser({...editingUser, avatarUrl: e.target.value})}
                          className="form-input"
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  
  
                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4">Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">User Role</label>
                        <select
                          value={editingUser.role || 'student'}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                          className="form-input"
                          required
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Tutor</option>
                          <option value="guardian">Guardian</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Account Status</label>
                        <select
                          value={editingUser.status || 'pending'}
                          onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                          className="form-input"
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="restricted">Restricted</option>
                          <option value="banned">Banned</option>
                          <option value="deleted">Deleted</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="date"
                          value={editingUser.dateOfBirth ? format(new Date(editingUser.dateOfBirth), 'yyyy-MM-dd') : ''}
                          onChange={(e) => setEditingUser({...editingUser, dateOfBirth: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
           
                  <div>
                    <h3 className="font-medium text-text-primary border-b border-border pb-2 mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group md:col-span-2">
                        <label className="form-label">Street Address</label>
                        <input
                          type="text"
                          placeholder="Street address"
                          value={editingUser.address?.street || ''}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            address: { ...editingUser.address, street: e.target.value }
                          })}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={editingUser.address?.city || ''}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            address: { ...editingUser.address, city: e.target.value }
                          })}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">State/Province</label>
                        <input
                          type="text"
                          placeholder="State"
                          value={editingUser.address?.state || ''}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            address: { ...editingUser.address, state: e.target.value }
                          })}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          placeholder="Country"
                          value={editingUser.address?.country || ''}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            address: { ...editingUser.address, country: e.target.value }
                          })}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">ZIP/Postal Code</label>
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={editingUser.address?.zipCode || ''}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            address: { ...editingUser.address, zipCode: e.target.value }
                          })}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;