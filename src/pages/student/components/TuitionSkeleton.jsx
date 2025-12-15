
const TuitionSkeleton = () => {
  return (
    <div className="dashboard-card animate-pulse">
      <div className="flex-between mb-4">
        <div>
          <div className="h-6 bg-hover-bg rounded w-48 mb-2"></div>
          <div className="h-4 bg-hover-bg rounded w-32"></div>
        </div>
        <div className="h-8 bg-hover-bg rounded-full w-20"></div>
      </div>
      
      <div className="h-4 bg-hover-bg rounded w-full mb-2"></div>
      <div className="h-4 bg-hover-bg rounded w-3/4 mb-4"></div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-hover-bg rounded w-16"></div>
            <div className="h-4 bg-hover-bg rounded w-24"></div>
          </div>
        ))}
      </div>
      
      <div className="h-16 bg-hover-bg rounded mb-4"></div>
      
      <div className="pt-4 border-t border-border flex-between">
        <div className="h-6 bg-hover-bg rounded w-32"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-hover-bg rounded w-24"></div>
          <div className="h-10 bg-hover-bg rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default TuitionSkeleton;