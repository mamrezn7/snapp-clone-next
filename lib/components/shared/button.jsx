import React from "react";

const Button = ({ fullWidth = true, children }) => {
  return (
    <button
      className={`bg-primary p-2 text-white rounded-lg hover:bg-green-600 ${
        fullWidth && "w-full"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
