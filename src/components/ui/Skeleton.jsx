import React from "react";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-base-300 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
