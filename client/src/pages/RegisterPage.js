import React from "react";
import NavBar from "../components/Navbar";
import SelectDropDownComponent from "../components/Dropdown";

const RegisterPage = () => {
  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center overflow-hidden m-16">
        <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
          <form className="mt-1">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 flex items-center justify-center mb-2">
                Avatar
              </label>
              <div className="flex items-center justify-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-full w-16"
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Department
              </label>
              <SelectDropDownComponent />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800">
                Role
              </label>
              <SelectDropDownComponent />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800">
                Fullname
              </label>
              <input
                placeholder="John Doe"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                placeholder="johndoe@domain.com"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
              />
            </div>
            <div className="mt-16">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
