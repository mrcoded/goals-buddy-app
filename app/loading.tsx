import React from "react";

const Loading = () => {
  return (
    <div className="mb-4 translate-y-1/2">
      <div className="flex items-center justify-center gap-2 font-medium">
        Loading...
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-400"></div>
      </div>
    </div>
  );
};

export default Loading;
