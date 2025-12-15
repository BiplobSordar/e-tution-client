
const SkeletonLoader = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="dashboard-card animate-pulse">
   
          <div className="flex-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-5 h-5 bg-hover-bg rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-hover-bg rounded w-3/4 mb-2"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-hover-bg rounded w-24"></div>
                    <div className="h-4 bg-hover-bg rounded w-32"></div>
                    <div className="h-4 bg-hover-bg rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-10 bg-hover-bg rounded w-32"></div>
          </div>
          

          <div className="mt-6 pt-6 border-t border-border">
            <div className="h-6 bg-hover-bg rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map((j) => (
                <div key={j} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-hover-bg rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex-between mb-1">
                        <div className="h-5 bg-hover-bg rounded w-32"></div>
                        <div className="h-6 bg-hover-bg rounded w-16"></div>
                      </div>
                      <div className="flex gap-3 mb-2">
                        <div className="h-4 bg-hover-bg rounded w-20"></div>
                        <div className="h-4 bg-hover-bg rounded w-16"></div>
                        <div className="h-4 bg-hover-bg rounded w-24"></div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <div className="h-6 bg-hover-bg rounded w-16"></div>
                        <div className="h-6 bg-hover-bg rounded w-20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-hover-bg rounded w-full"></div>
                        <div className="h-4 bg-hover-bg rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;