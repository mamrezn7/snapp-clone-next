import React from "react";

const PrimaryButton = ({ fullWidth = true, onClick, children }) => {
  return (
    <button
      className={`bg-primary p-2 text-white rounded-lg hover:bg-green-600 ${
        fullWidth && "w-full"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
