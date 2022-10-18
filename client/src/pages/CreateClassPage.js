import React from "react";
import SelectDropDownComponent from "../components/Dropdown";
import MultiDropdown from "../components/DropdownMulti";

const CreateCollegePage = () => {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2">
          Create Class
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Name
                </label>
                <input
                  placeholder="College of Engineering"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department
                </label>
                <SelectDropDownComponent />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Instructor
                </label>
                <SelectDropDownComponent />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class List
                </label>
                <MultiDropdown />
              </div>
              <div className="mt-8">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
                  Create Class
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
