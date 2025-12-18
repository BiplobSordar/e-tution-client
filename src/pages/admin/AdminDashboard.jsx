import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useGetTuitionsQuery,
  useGetRevenueSummaryQuery,
  useGetTransactionsQuery
} from "../../features/admin/adminApi";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiBook,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
  FiEye,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiBarChart2,
  FiRefreshCw,
  FiChevronRight,
  FiDownload,
  FiShoppingBag,
  FiPercent,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen
} from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { TbCalendarStats } from 'react-icons/tb';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(false);
  

  const { 
    data: usersData, 
    isLoading: usersLoading, 
    refetch: refetchUsers,
    error: usersError
  } = useGetUsersQuery();
  
  const { 
    data: tuitionsData, 
    isLoading: tuitionsLoading, 
    refetch: refetchTuitions,
    error: tuitionsError
  } = useGetTuitionsQuery({
    limit: 100,
    status: 'all'
  });
  
  const { 
    data: revenueData, 
    isLoading: revenueLoading, 
    refetch: refetchRevenue,
    error: revenueError
  } = useGetRevenueSummaryQuery();
  
  const { 
    data: transactionsData, 
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
    error: transactionsError
  } = useGetTransactionsQuery({
    page: 1,
    limit: 10,
    search: ''
  });

  const isLoading = usersLoading || tuitionsLoading || revenueLoading || transactionsLoading;
  

  const hasError = usersError || tuitionsError || revenueError || transactionsError;

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await Promise.all([
        refetchUsers(),
        refetchTuitions(),
        refetchRevenue(),
        refetchTransactions()
      ]);
      toast.success('Dashboard updated successfully!');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  
  const users = usersData?.data || [];
  const tuitions = tuitionsData?.data || [];
  const transactions = transactionsData?.data?.transactions || [];
  const revenueSummary = revenueData?.data?.summary || {};
  

  const calculateStats = () => {
  
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsersToday = users.filter(u => new Date(u.createdAt) > twentyFourHoursAgo).length;
    

    const totalTuitions = tuitions.length;
    const pendingTuitions = tuitions.filter(t => t.adminApprovalStatus === 'pending').length;
    const openTuitions = tuitions.filter(t => t.status === 'open').length;
    const completedTuitions = tuitions.filter(t => t.status === 'completed').length;
    

    const tutors = users.filter(u => u.role === 'teacher').length;
    const students = users.filter(u => u.role === 'student').length;
    const guardians = users.filter(u => u.role === 'guardian').length;
    const admins = users.filter(u => u.role === 'admin').length;
    

    const totalRevenue = revenueSummary.totalRevenue || 0;
    const platformEarnings = revenueSummary.platformEarnings || 0;
    const avgTransaction = revenueSummary.averageTransaction || 0;
    const growthRate = revenueSummary.growthRate || 0;
    
  
    const monthlyRevenue = totalRevenue / 12; 
    
    return {
   
      totalUsers,
      activeUsers,
      pendingUsers,
      newUsersToday,
      
 
      totalTuitions,
      pendingTuitions,
      openTuitions,
      completedTuitions,

      totalRevenue,
      platformEarnings,
      avgTransaction,
      growthRate,
      monthlyRevenue,
      
   
      tutors,
      students,
      guardians,
      admins,
    };
  };

  const stats = calculateStats();

  const generateRecentActivities = () => {
    const activities = [];
    

    const recentUsers = [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map(user => ({
        id: user._id,
        type: 'user',
        description: `New ${user.role} registered: ${user.name}`,
        timestamp: user.createdAt,
        status: user.status
      }));
    
  
    const recentTuitions = [...tuitions]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map(tuition => ({
        id: tuition._id,
        type: 'tuition',
        description: `New tuition posted: ${tuition.title}`,
        timestamp: tuition.createdAt,
        status: tuition.adminApprovalStatus || 'pending'
      }));
    
   
    const recentTransactions = [...transactions]
      .slice(0, 3)
      .map(transaction => ({
        id: transaction._id,
        type: 'payment',
        description: `Payment received: $${transaction.amount}`,
        timestamp: transaction.date || new Date().toISOString(),
        status: transaction.status || 'completed'
      }));
    
    return [...recentUsers, ...recentTuitions, ...recentTransactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 8);
  };

  const recentActivities = generateRecentActivities();
  const recentTuitions = tuitions.slice(0, 5);
  const recentUsers = users.slice(0, 5);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };


  const calculatePercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'pending': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'approved': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'rejected': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'completed': return 'text-purple-500 bg-purple-100 dark:bg-purple-900';
      case 'open': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'paid': return 'text-green-500 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };


  const getRoleColor = (role) => {
    switch (role) {
      case 'teacher': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'student': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'guardian': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      case 'admin': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };


  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <FiUser />;
      case 'tuition': return <HiOutlineAcademicCap />;
      case 'payment': return <FiCreditCard />;
      default: return <FiActivity />;
    }
  };

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

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <p className="text-text-secondary">Failed to load dashboard data. Please try again.</p>
          <button onClick={handleRefresh} className="btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      <div className="flex-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-text-secondary text-sm md:text-base mt-2">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Period:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-input text-sm"
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FiRefreshCw />
            )}
            Refresh
          </button>
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">

        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Total Revenue</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">
                {formatCurrency(stats.totalRevenue)}
              </h3>
            </div>
            <div className="text-primary text-2xl md:text-3xl">
              <FiDollarSign />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-xs md:text-sm ${stats.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.growthRate > 0 ? <FiTrendingUp className="inline mr-1" /> : <FiTrendingDown className="inline mr-1" />}
              {stats.growthRate > 0 ? '+' : ''}{stats.growthRate || 0}%
            </span>
            <span className="text-xs text-text-secondary">from last month</span>
          </div>
        </div>


        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Total Users</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.totalUsers}</h3>
            </div>
            <div className="text-green-500 text-2xl md:text-3xl">
              <FiUsers />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Active: {stats.activeUsers}</span>
              <span className="text-text-secondary">Pending: {stats.pendingUsers}</span>
            </div>
          </div>
        </div>

    
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Total Tuitions</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">{stats.totalTuitions}</h3>
            </div>
            <div className="text-blue-500 text-2xl md:text-3xl">
              <HiOutlineAcademicCap />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Open: {stats.openTuitions}</span>
              <span className="text-text-secondary">Pending: {stats.pendingTuitions}</span>
            </div>
          </div>
        </div>

  
        <div className="stat-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-xs md:text-sm">Platform Earnings</p>
              <h3 className="text-xl md:text-2xl font-bold mt-2">
                {formatCurrency(stats.platformEarnings)}
              </h3>
            </div>
            <div className="text-purple-500 text-2xl md:text-3xl">
              <FiCreditCard />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Avg Transaction: {formatCurrency(stats.avgTransaction)}</span>
            </div>
          </div>
        </div>
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
     
        <div className="lg:col-span-2 space-y-6">
         
          <div className="dashboard-card">
            <div className="flex-between mb-4">
              <h3 className="font-semibold text-text-primary">Recent Activities</h3>
              <span className="text-sm text-text-secondary">
                {format(new Date(), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <FiActivity className="w-12 h-12 text-text-secondary mx-auto opacity-50" />
                  <p className="text-text-secondary mt-2">No recent activities</p>
                </div>
              ) : (
                recentActivities.map((activity, index) => (
                  <div key={`${activity.id}-${index}`} className="flex items-start gap-3 p-3 hover:bg-hover-bg rounded-lg transition-colors">
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-text-primary">{activity.description}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        {format(new Date(activity.timestamp), 'MMM dd, hh:mm a')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
            <div className="dashboard-card">
              <h3 className="font-semibold text-text-primary mb-4">User Distribution</h3>
              <div className="space-y-3">
                {[
                  { role: 'Students', count: stats.students, color: 'bg-green-500', icon: '👨‍🎓' },
                  { role: 'Tutors', count: stats.tutors, color: 'bg-blue-500', icon: '👨‍🏫' },
                  { role: 'Guardians', count: stats.guardians, color: 'bg-purple-500', icon: '👨‍👦' },
                  { role: 'Admins', count: stats.admins, color: 'bg-red-500', icon: '👨‍💼' },
                ].map((item, index) => {
                  const percentage = calculatePercentage(item.count, stats.totalUsers);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="text-text-secondary">{item.role}</span>
                        </div>
                        <span className="font-medium">{item.count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-hover-bg rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           
            <div className="dashboard-card">
              <h3 className="font-semibold text-text-primary mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-hover-bg p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">New Users Today</p>
                  <p className="text-xl font-bold">{stats.newUsersToday}</p>
                </div>
                <div className="bg-hover-bg p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Completed Tuitions</p>
                  <p className="text-xl font-bold">{stats.completedTuitions}</p>
                </div>
                <div className="bg-hover-bg p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Pending Approvals</p>
                  <p className="text-xl font-bold">{stats.pendingTuitions}</p>
                </div>
                <div className="bg-hover-bg p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Avg. Revenue/Day</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.monthlyRevenue / 30)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
         
          <div className="dashboard-card">
            <div className="flex-between mb-4">
              <h3 className="font-semibold text-text-primary">Recent Tuitions</h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {recentTuitions.length === 0 ? (
                <div className="text-center py-8">
                  <HiOutlineAcademicCap className="w-10 h-10 text-text-secondary mx-auto opacity-50" />
                  <p className="text-text-secondary mt-2 text-sm">No recent tuitions</p>
                </div>
              ) : (
                recentTuitions.map((tuition) => (
                  <div key={tuition._id} className="p-3 border border-border rounded-lg hover:bg-hover-bg transition-colors">
                    <div className="flex-between mb-2">
                      <h4 className="font-medium text-sm text-text-primary truncate">
                        {tuition.title || 'Untitled Tuition'}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tuition.status)}`}>
                        {tuition.status || 'open'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>${tuition.totalFee || 0}</span>
                      <span>{format(new Date(tuition.createdAt), 'MMM dd')}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${getRoleColor(tuition.postedBy?.role || 'student')}`}>
                        {tuition.postedBy?.role || 'Student'}
                      </span>
                      <span className="truncate">{tuition.postedBy?.name || 'Unknown User'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


          <div className="dashboard-card">
            <div className="flex-between mb-4">
              <h3 className="font-semibold text-text-primary">Recent Users</h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {recentUsers.length === 0 ? (
                <div className="text-center py-8">
                  <FiUser className="w-10 h-10 text-text-secondary mx-auto opacity-50" />
                  <p className="text-text-secondary mt-2 text-sm">No recent users</p>
                </div>
              ) : (
                recentUsers.map((user) => (
                  <div key={user._id} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-hover-bg transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light flex-center">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-semibold text-primary text-sm">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-text-primary truncate">{user.name || 'Unknown User'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                          {user.role === 'teacher' ? 'Tutor' : user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <FiBarChart2 size={24} />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Conversion Rate</p>
              <h4 className="text-xl font-bold mt-1">
                {calculatePercentage(stats.completedTuitions, stats.totalTuitions)}%
              </h4>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Avg. Response Time</p>
              <h4 className="text-xl font-bold mt-1">2.4 hrs</h4>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <FiPercent size={24} />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Platform Fee Rate</p>
              <h4 className="text-xl font-bold mt-1">10%</h4>
            </div>
          </div>
        </div>
      </div>


      <div className="dashboard-card">
        <h3 className="font-semibold text-text-primary mb-4">System Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex-center mx-auto mb-2">
              <FiCheckCircle size={24} />
            </div>
            <p className="text-sm text-text-secondary">API Status</p>
            <p className="font-medium text-green-600 mt-1">Operational</p>
          </div>
          
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex-center mx-auto mb-2">
              <FiUsers size={24} />
            </div>
            <p className="text-sm text-text-secondary">Active Users</p>
            <p className="font-medium mt-1">{stats.activeUsers}</p>
          </div>
          
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex-center mx-auto mb-2">
              <HiOutlineAcademicCap size={24} />
            </div>
            <p className="text-sm text-text-secondary">Active Tuitions</p>
            <p className="font-medium mt-1">{stats.openTuitions}</p>
          </div>
          
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex-center mx-auto mb-2">
              <FiCreditCard size={24} />
            </div>
            <p className="text-sm text-text-secondary">Transactions Today</p>
            <p className="font-medium mt-1">{Math.floor(stats.totalUsers * 0.1)}</p>
          </div>
        </div>
      </div>


      <div className="dashboard-card mt-6 bg-primary-light border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-primary">Quick Actions</h4>
            <p className="text-sm text-text-secondary mt-1">
              Manage your platform efficiently with these quick actions
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => window.location.href = '/admin/reports'}
              className="btn-outline text-sm px-4 py-2"
            >
              <FiEye className="mr-2" />
              View Reports
            </button>
            <button 
              onClick={handleRefresh}
              className="btn-primary text-sm px-4 py-2"
            >
              <FiDownload className="mr-2" />
              Export Data
            </button>
            <button 
              onClick={() => window.location.href = '/admin/tuitions'}
              className="btn-outline text-sm px-4 py-2"
            >
              <FiCalendar className="mr-2" />
              Manage Tuitions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;