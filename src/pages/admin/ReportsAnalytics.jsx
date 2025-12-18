import React, { useState } from "react";
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiCreditCard, 
  FiCalendar,
  FiFilter,
  FiEye,
  FiRefreshCw
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useGetRevenueSummaryQuery,
  useGetTransactionsQuery,
  useGetRevenueTrendQuery,
  useExportReportMutation
} from "../../features/admin/adminApi";
import toast from "react-hot-toast";

const ReportsAnalytics = () => {
  const [page, setPage] = useState(1);
  const [timeRange, setTimeRange] = useState("monthly");
  const [searchTerm, setSearchTerm] = useState("");

  const { 
    data: revenueData, 
    isLoading: loadingRevenue,
    refetch: refetchRevenue 
  } = useGetRevenueSummaryQuery();

  const { 
    data: trendData,
    isLoading: loadingTrend
  } = useGetRevenueTrendQuery({ period: timeRange });

  const { 
    data: transactionsData,
    isLoading: loadingTransactions
  } = useGetTransactionsQuery({
    page,
    limit: 10,
    search: searchTerm
  });

  const [exportReport, { isLoading: exporting }] = useExportReportMutation();

  const summary = revenueData?.data?.summary || {};
  const recentTransactions = revenueData?.data?.recentTransactions || [];
  const transactions = transactionsData?.data?.transactions || [];
  const pagination = transactionsData?.data?.pagination || {};
  const trend = trendData?.data || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleExport = async () => {
    try {
      const result = await exportReport({ format: 'json' }).unwrap();
      
      if (result.data) {
        const dataStr = JSON.stringify(result.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `revenue-report-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        toast.success('Report exported successfully!');
      }
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  const handleRefresh = () => {
    refetchRevenue();
    toast.success('Data refreshed!');
  };

  if (loadingRevenue) {
    return (
      <div className="flex-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Revenue Reports</h1>
          <p className="text-text-secondary text-sm mt-1">
            Simple analytics for platform earnings
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="btn-outline flex items-center gap-2"
            disabled={loadingRevenue}
          >
            {loadingRevenue ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FiRefreshCw />
            )}
            Refresh
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="btn-primary flex items-center gap-2"
          >
            {exporting ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FiDollarSign />
            )}
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="dashboard-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(summary.totalRevenue || 0)}
              </h3>
            </div>
            <div className="text-primary text-2xl">
              <FiDollarSign />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-text-secondary">
              {summary.transactionCount || 0} transactions
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-sm">Platform Earnings</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(summary.platformEarnings || 0)}
              </h3>
            </div>
            <div className="text-green-500 text-2xl">
              <FiTrendingUp />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${summary.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {summary.growthRate > 0 ? '+' : ''}{summary.growthRate || 0}% growth
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-sm">Avg. Transaction</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(summary.averageTransaction || 0)}
              </h3>
            </div>
            <div className="text-yellow-500 text-2xl">
              <FiCreditCard />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-text-secondary">
              10% platform fee
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex-between">
            <div>
              <p className="text-text-secondary text-sm">Growth Rate</p>
              <h3 className="text-2xl font-bold mt-2">
                {summary.growthRate > 0 ? '+' : ''}{summary.growthRate || 0}%
              </h3>
            </div>
            <div className="text-purple-500 text-2xl">
              {summary.growthRate > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-text-secondary">
              Compared to last month
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-card mb-6">
        <div className="flex-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-text-secondary" />
              <span className="text-sm text-text-secondary">View:</span>
            </div>
            <div className="flex gap-2">
              {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-primary text-white'
                      : 'bg-hover-bg text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-text-secondary">
            Showing {trend.length} periods
          </div>
        </div>
      </div>

      <div className="dashboard-card mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Revenue Trend</h3>
        {loadingTrend ? (
          <div className="flex-center h-40">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl text-primary" />
          </div>
        ) : (
          <div className="space-y-3">
            {trend.slice(-6).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-hover-bg rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-sm">{item.period}</p>
                  <p className="text-xs text-text-secondary">{item.transactions} transactions</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatCurrency(item.revenue)}</p>
                  <p className="text-xs text-text-secondary">
                    Avg: {formatCurrency(item.averageAmount || 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-card mb-6">
        <div className="flex-between mb-4">
          <h3 className="font-semibold text-text-primary">Recent Transactions</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by student or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input text-sm"
            />
            <button className="btn-outline text-sm px-3 py-1.5">
              <FiFilter />
            </button>
          </div>
        </div>

        {loadingTransactions ? (
          <div className="flex-center h-40">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="py-3 px-4 text-left text-sm font-medium">Transaction ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Student</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Platform Fee</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="table-row">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-text-secondary">
                          {transaction.transactionId?.substring(0, 12)}...
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{transaction.user.name}</p>
                          <p className="text-xs text-text-secondary">{transaction.user.role}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-sm">
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-primary">
                          {formatCurrency(transaction.platformFee)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary">
                          {formatDate(transaction.date)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn-outline text-xs px-3 py-1 flex items-center gap-1">
                          <FiEye size={12} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.total > 10 && (
              <div className="flex-between mt-6 pt-4 border-t border-border">
                <div className="text-sm text-text-secondary">
                  Page {pagination.page} of {pagination.pages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={pagination.page === 1}
                    className="btn-outline text-sm px-3 py-1.5 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="btn-primary text-sm px-3 py-1.5 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashboard-card">
          <h4 className="font-medium text-text-primary mb-2">Daily Stats</h4>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(revenueData?.data?.stats?.dailyRevenue?.revenue || 0)}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {revenueData?.data?.stats?.dailyRevenue?.count || 0} transactions today
          </p>
        </div>

        <div className="dashboard-card">
          <h4 className="font-medium text-text-primary mb-2">Weekly Stats</h4>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(revenueData?.data?.stats?.weeklyRevenue?.revenue || 0)}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {revenueData?.data?.stats?.weeklyRevenue?.count || 0} transactions this week
          </p>
        </div>

        <div className="dashboard-card">
          <h4 className="font-medium text-text-primary mb-2">Monthly Stats</h4>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(revenueData?.data?.stats?.monthlyRevenue?.revenue || 0)}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {revenueData?.data?.stats?.monthlyRevenue?.count || 0} transactions this month
          </p>
        </div>
      </div>

      <div className="dashboard-card mt-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-xl mt-1">ℹ️</div>
          <div>
            <h4 className="font-medium text-blue-800">How Revenue is Calculated</h4>
            <p className="text-sm text-blue-700 mt-1">
              • Total revenue includes all successful payments (paymentStatus: 'paid' with paymentIntentId)
              <br />
              • Platform earns 10% commission on each transaction
              <br />
              • Only completed payments are counted in revenue calculations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;