import React from "react";
import Sidebar from "../components/Sidebar";
import UsersTable from "../components/UsersTable";
import { Link } from "react-router-dom";

const ManageUsersPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          Manage Users
          <Link to="/register">
            <button
              type="button"
              class="p-2.5 ml-4 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add User
            </button>
          </Link>
        </h1>
        <div className="container mx-auto mt-[5vh]">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};
export default ManageUsersPage;
