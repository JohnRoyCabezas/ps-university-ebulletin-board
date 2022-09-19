import React from "react";

const UnauthorizedErrorPage = () => {
  return (
    <div class="p-5 mt-5 bg-light  rounded-3 text-center">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">401 Unauthorized Access</h1>
        <p class="fs-4">You are not authorized to access this page.</p>
      </div>
    </div>
  );
};

export default UnauthorizedErrorPage;
