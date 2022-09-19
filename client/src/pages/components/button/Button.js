import React from "react";

const Button = ({
  handleClick,
  isLoading,
  isFetching,
  isValid,
  label,
  className,
}) => {
  let spinner = (isFetching || isLoading) && (
    <div className="spinner-border me-1" role="status"></div>
  );
  return (
    <button
      className={
        "d-flex align-items-center justify-content-center " + className
      }
      disabled={!isValid || isFetching || isLoading}
      type="submit"
      onClick={handleClick}
    >
      {spinner}
      {label}
    </button>
  );
};

export default Button;
