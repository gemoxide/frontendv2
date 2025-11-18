import React from "react";

const Overlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="flex flex-col space-y-4 items-center justify-center h-full">
        <span className="loading loading-ring loading-lg"></span>
        <p className="text-white text-lg font-bold">
          We are processing your request...
        </p>
      </div>
    </div>
  );
};

export default Overlay;
