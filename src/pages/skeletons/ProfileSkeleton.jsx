const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-pulse">

      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>


      <div className="flex space-x-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-300 rounded"></div>
        ))}
      </div>


      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>


      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 bg-gray-200 rounded space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
