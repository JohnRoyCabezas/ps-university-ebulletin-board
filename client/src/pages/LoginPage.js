import React from "react";
import NavBar from "../components/Navbar";

const LoginPage = () => {
  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl h-96">
          <h1 className="text-3xl font-bold text-center">LOGIN</h1>
          <form className="mt-6">
            <div className="mb-4">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                placeholder="johndoe@gmail.com"
                type="email"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                placeholder="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-16">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
