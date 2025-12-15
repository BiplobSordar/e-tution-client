

const StatusBadge = ({ status, size = 'md', showIcon = false, className = '' }) => {
  const getStatusConfig = (status) => {
    const configs = {
   
      'open': {
        label: 'Open',
        bgClass: 'bg-blue-100 dark:bg-blue-900/20',
        textClass: 'text-blue-800 dark:text-blue-300',
        borderClass: 'border-blue-200 dark:border-blue-800',
        icon: '🔍'
      },
      'pending': {
        label: 'Pending',
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/20',
        textClass: 'text-yellow-800 dark:text-yellow-300',
        borderClass: 'border-yellow-200 dark:border-yellow-800',
        icon: '⏳'
      },
      'in-progress': {
        label: 'In Progress',
        bgClass: 'bg-purple-100 dark:bg-purple-900/20',
        textClass: 'text-purple-800 dark:text-purple-300',
        borderClass: 'border-purple-200 dark:border-purple-800',
        icon: '🔄'
      },
      'completed': {
        label: 'Completed',
        bgClass: 'bg-green-100 dark:bg-green-900/20',
        textClass: 'text-green-800 dark:text-green-300',
        borderClass: 'border-green-200 dark:border-green-800',
        icon: '✅'
      },
      'cancelled': {
        label: 'Cancelled',
        bgClass: 'bg-red-100 dark:bg-red-900/20',
        textClass: 'text-red-800 dark:text-red-300',
        borderClass: 'border-red-200 dark:border-red-800',
        icon: '❌'
      },
      'assigned': {
        label: 'Assigned',
        bgClass: 'bg-indigo-100 dark:bg-indigo-900/20',
        textClass: 'text-indigo-800 dark:text-indigo-300',
        borderClass: 'border-indigo-200 dark:border-indigo-800',
        icon: '👨‍🏫'
      },
      'paid': {
        label: 'Paid',
        bgClass: 'bg-emerald-100 dark:bg-emerald-900/20',
        textClass: 'text-emerald-800 dark:text-emerald-300',
        borderClass: 'border-emerald-200 dark:border-emerald-800',
        icon: '💰'
      },
      

      'accepted': {
        label: 'Accepted',
        bgClass: 'bg-green-100 dark:bg-green-900/20',
        textClass: 'text-green-800 dark:text-green-300',
        borderClass: 'border-green-200 dark:border-green-800',
        icon: '✓'
      },
      'rejected': {
        label: 'Rejected',
        bgClass: 'bg-red-100 dark:bg-red-900/20',
        textClass: 'text-red-800 dark:text-red-300',
        borderClass: 'border-red-200 dark:border-red-800',
        icon: '✗'
      },
      
     
      'unpaid': {
        label: 'Unpaid',
        bgClass: 'bg-gray-100 dark:bg-gray-800',
        textClass: 'text-gray-800 dark:text-gray-300',
        borderClass: 'border-gray-200 dark:border-gray-700',
        icon: '💳'
      },
      
    
      'active': {
        label: 'Active',
        bgClass: 'bg-emerald-100 dark:bg-emerald-900/20',
        textClass: 'text-emerald-800 dark:text-emerald-300',
        borderClass: 'border-emerald-200 dark:border-emerald-800',
        icon: '🟢'
      },
      'inactive': {
        label: 'Inactive',
        bgClass: 'bg-gray-100 dark:bg-gray-800',
        textClass: 'text-gray-800 dark:text-gray-300',
        borderClass: 'border-gray-200 dark:border-gray-700',
        icon: '⚫'
      }
    };

    return configs[status] || {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      bgClass: 'bg-gray-100 dark:bg-gray-800',
      textClass: 'text-gray-800 dark:text-gray-300',
      borderClass: 'border-gray-200 dark:border-gray-700',
      icon: '•'
    };
  };

  const config = getStatusConfig(status);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full border
        font-medium whitespace-nowrap
        ${sizeClasses[size]}
        ${config.bgClass}
        ${config.textClass}
        ${config.borderClass}
        ${className}
      `}
    >
      {showIcon && <span className="text-sm">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export const CompactStatusBadge = ({ status, className = '' }) => {
  const getStatusDotColor = (status) => {
    const colors = {
      'open': 'bg-blue-500',
      'pending': 'bg-yellow-500',
      'in-progress': 'bg-purple-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-red-500',
      'assigned': 'bg-indigo-500',
      'paid': 'bg-emerald-500',
      'accepted': 'bg-green-500',
      'rejected': 'bg-red-500',
      'active': 'bg-emerald-500',
      'inactive': 'bg-gray-500'
    };
    
    return colors[status] || 'bg-gray-500';
  };

  const config = getStatusConfig(status);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${getStatusDotColor(status)}`} />
      <span className="text-sm text-text-secondary">{config.label}</span>
    </div>
  );
};


export const getStatusConfig = (status) => {
  const configs = {
    'open': { label: 'Open', color: 'blue' },
    'pending': { label: 'Pending', color: 'yellow' },
    'in-progress': { label: 'In Progress', color: 'purple' },
    'completed': { label: 'Completed', color: 'green' },
    'cancelled': { label: 'Cancelled', color: 'red' },
    'assigned': { label: 'Assigned', color: 'indigo' },
    'paid': { label: 'Paid', color: 'emerald' },
    'accepted': { label: 'Accepted', color: 'green' },
    'rejected': { label: 'Rejected', color: 'red' },
    'active': { label: 'Active', color: 'emerald' },
    'inactive': { label: 'Inactive', color: 'gray' }
  };
  
  return configs[status] || { label: status, color: 'gray' };
};

export default StatusBadge;