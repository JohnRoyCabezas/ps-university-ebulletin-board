import React from "react";

const DataLoading = () => {
  return (
    <div className="container d-flex align-items-center mt-5 justify-content-center w-100">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      ></div>
      <span className="sr-only ms-3 h4">Loading...</span>
    </div>
  );
};

export default DataLoading;
