import React from "react";

const PageLoading = () => {
  return (
    <div className="container d-flex align-items-center vh-100 justify-content-center w-100">
      <div
        className="spinner-grow"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      ></div>
      <span className="sr-only ms-2 h2">Loading...</span>
    </div>
  );
};

export default PageLoading;
