import React from "react";

const ErrorPage = ({ errorStatus, errorType, errorMessage }) => {
  return (
    <div className="p-5 mt-5 bg-light  rounded-3 text-center">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">
          {errorStatus} {errorType}
        </h1>
        <p className="fs-4">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
