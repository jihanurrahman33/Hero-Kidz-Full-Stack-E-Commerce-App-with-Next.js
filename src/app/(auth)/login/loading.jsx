import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 p-6">
        <div className="skeleton h-6 w-1/2 mx-auto mb-4" />
        <div className="skeleton h-10 w-full mb-3" />
        <div className="skeleton h-10 w-full mb-3" />
        <div className="skeleton h-10 w-full mt-4" />
      </div>
    </div>
  );
};

export default loading;
