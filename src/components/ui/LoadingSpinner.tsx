import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  minHeight?: string | "full";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  minHeight = "150px",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center place-self-center bg-transparent p-4 ${className}`}
      style={{ minHeight }}
    >
      <div
        className={` ${sizeClasses[size]} border-secondary-text/20 border-t-accent flex-shrink-0 animate-spin rounded-full`}
      />
    </div>
  );
};
