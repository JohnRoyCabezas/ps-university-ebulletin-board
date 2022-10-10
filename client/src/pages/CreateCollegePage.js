import React from "react";
import Sidebar from "../components/Sidebar";
import SelectDropDownComponent from "../components/Dropdown";

const CreateCollegePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2">
          Create College
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Name
                </label>
                <input
                  placeholder="College of Engineering"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Information
                </label>
                <input
                  placeholder="College of Engineering is a..."
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Dean
                </label>
                <SelectDropDownComponent />
              </div>
              <div className="mt-8">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
                  Create College
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCollegePage;
