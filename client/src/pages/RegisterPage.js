import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dropdown from "../components/Dropdown";
import DepartmentApi from "../api/DepartmentApi";
import AuthApi from "../api/AuthApi";
import RoleApi from "../api/RoleApi";
import RegistrationModal from "../components/RegistrationModal";

const RegisterPage = () => {
  const initialParams = {
    fullname: "",
    email: "",
    department_id: "",
    role: "",
    avatar: `https://joeschmoe.io/api/v1/0`,
  };

  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    fullname: "",
    email: "",
    department_id: "",
    role: "",
    avatar: `https://joeschmoe.io/api/v1/0`,
  });

  useEffect(() => {
    DepartmentApi.fetchDepartments().then((res) => {
      setDepartments(res.data);
    });
    RoleApi.fetchRoles().then((res) => {
      setRoles(res.data);
    });
    Cookies.get("params") &&
      setParams(JSON.parse(Cookies.get("params") || "{}"));
  }, []);

  const handleInputChange = (e) => {
    setErrors({});
    setParams({ ...params, [e.target.name]: e.target.value });
    Cookies.set(
      "params",
      JSON.stringify({ ...params, [e.target.name]: e.target.value })
    );
  };

  useEffect(() => {
    if (params.email === "" || EMAIL_REGEX.test(params.email)) {
      setErrors({});
    } else setErrors({ ...errors, email: "Not a valid email format" });
  }, [params.email]);

  const handleAvatarChange = () => {
    setErrors({});
    const randomAvatar = `https://joeschmoe.io/api/v1/${
      Math.floor(Math.random() * 90000) + 10000
    }`;
    setParams({ ...params, avatar: randomAvatar });
    Cookies.set("params", JSON.stringify({ ...params }));
  };

  const handleSelectChange = (type, item) => {
    setErrors({});
    if (type === "department") {
      setParams({ ...params, department_id: item.value });
      Cookies.set(
        "params",
        JSON.stringify({ ...params, department_id: item.value })
      );
    } else if (type === "role") {
      setParams({ ...params, role: item.value });
      Cookies.set("params", JSON.stringify({ ...params, role: item.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthApi.register(params).then(
      (res) => {
        Cookies.remove("params");
        setParams(initialParams);
        setShowModal(true);
      },
      (err) => {
        setErrors(err.response.data.errors);
      }
    );
    
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          Create User
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          {showModal && (
            <RegistrationModal
              message={"Registration Complete!"}
              buttonConfirmText={"Close"}
              buttonCancelText={"text"}
              setShowModal={setShowModal}
            />
          )}
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="flex flex-col items-center justify-center mb-4">
                <label className="text-sm font-semibold text-gray-800 flex items-center justify-center mb-2">
                  Avatar
                </label>
                <div className="flex justify-center">
                  <img
                    src={params.avatar}
                    className="rounded-full w-24 "
                    alt="Avatar"
                  />
                </div>
                <div
                  className="mt-2 cursor-pointer"
                  onClick={handleAvatarChange}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Department
                  {params.department_id === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <Dropdown
                  defaultLabel={
                    departments[params?.department_id - 1]?.department
                  }
                  defaultValue={departments[params?.department_id - 1]?.id}
                  handleChange={handleSelectChange}
                  type="department"
                  data={departments}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Role
                  {params.role === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <Dropdown
                  defaultLabel={roles[params?.role - 1]?.role}
                  defaultValue={roles[params?.role - 1]?.id}
                  handleChange={handleSelectChange}
                  type="role"
                  data={roles}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Fullname
                  {params.fullname === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  name="fullname"
                  value={params?.fullname}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Email
                  {params.email === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                  <span className="ml-2 text-s italic font-light text-red-800">
                    {errors.email}
                  </span>
                </label>
                <input
                  name="email"
                  value={params?.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@domain.com"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
                />
              </div>

              <div className="mt-16">
                <button
                  disabled={
                    !errors.email &&
                    params.fullname &&
                    params.avatar &&
                    params.department_id &&
                    params.email &&
                    params.role
                      ? false
                      : true
                  }
                  onClick={handleSubmit}
                  className={`w-full px-4 py-2 tracking-wide rounded-md 
                ${
                  !errors.email &&
                  params.fullname &&
                  params.avatar &&
                  params.department_id &&
                  params.email &&
                  params.role
                    ? `text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`
                    : `bg-gray-300 text-gray-400`
                }`}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
