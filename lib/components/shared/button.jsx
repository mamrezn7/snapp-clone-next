import React from "react";

const PrimaryButton = ({ fullWidth = true, onClick, children }) => {
  return (
    <button
      className={`bg-primary p-3 text-white rounded-lg hover:bg-green-600 font-bold ${
        fullWidth && "w-full"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const CustomButton = ({ className, onClick, children }) => {
  return (
    <button
      className={`rounded-lg font-bold ${className}
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, CustomButton };
