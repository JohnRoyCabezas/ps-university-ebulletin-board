import React, { useEffect, useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import AuthApi from "../api/AuthApi";
import UniversityApi from "../api/UniversityApi";
import SubmitButton from "../components/submitButton";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CreateUniversityPage = () => {
  const initialParams = {
    password_confirmation: "",
    confirmpassword: "",
    fullname: "",
    email: "",
    university: "",
    password: "",
    avatar: `https://joeschmoe.io/api/v1/0`,
  };

  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const [errors, setErrors] = useState({});
  const [showWizard, setShowWizard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState(initialParams);
  const navigate = useNavigate();

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
    if (params.password != params.password_confirmation) {
      setErrors({
        ...errors,
        password: "Password does not match",
        password_confirmation: "Password does not match",
      });
    }
  }, [params]);

  const handleAvatarChange = () => {
    setErrors({});
    const randomAvatar = `https://joeschmoe.io/api/v1/${
      Math.floor(Math.random() * 90000) + 10000
    }`;
    setParams({ ...params, avatar: randomAvatar });
    Cookies.set("params", JSON.stringify({ ...params }));
  };

  const [processing, setProcessing] = useState(false);

  const handleSubmit = () => {
    setProcessing(true);
    UniversityApi.createUniversity(params).then(
      (res) => {
        setShowWizard(false);
        setShowModal(true);
        setProcessing(false);
        Cookies.remove("params");
      },
      (err) => {
        setErrors(err.response.data.errors);
        setProcessing(false);
      }
    );
  };
  useLayoutEffect(() => {
    UniversityApi.fetchUniversities().then((res) => {
      setData(res.data);
    });
  }, []);

  const CreateUser = () => {
    var x = 0;
    {
      data.map((univ, i) => (univ?.university == params.university ? x++ : ""));
    }
    {
      x == 0 ? setShowWizard(true) : setShowAlert(true);
    }
  };

  const redirectLogin = () => {
    AuthApi.login(params).then((res) => {
      Cookies.set("token", res.data.token);
      Cookies.set("user", JSON.stringify(res.data.user));
      Cookies.set("universityid", res.data.user.university_id);

      window.location.pathname = "/adminsettings";
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <NavBar />
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          {showModal && (
            <div>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Registration</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          X
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        A new University and University Admin Account has been
                        registered!
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => redirectLogin()}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          )}
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form onSubmit={handleNext} className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  University Name
                  {params.university === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  name="university"
                  value={params?.university}
                  onChange={handleInputChange}
                  placeholder="University of Sun*"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="flex justify-center flex-row-reverse">
              <button
                  onClick={() => CreateUser()}
                  className={`px-11 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md ${
                    params.university
                      ? `text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`
                      : `bg-gray-300 text-gray-400`
                  }`}
                  disabled={!params.university}
                >
                  Next
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-300 hover:ring-1 ring-regal-blue text-regal-blue text-center py-1 px-9 rounded mr-5"
                >
                  Cancel
                </button>
                
              </div>
            </form>
          </div>
          {showWizard && (
            <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md z-50 lg:max-w-xl fixed inset">
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
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Password
                    {params.password === "" && (
                      <span className="text-s italic font-light text-red-800">
                        *
                      </span>
                    )}
                    <span className="ml-2 text-s italic font-light text-red-800">
                      {errors.password}
                    </span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={params?.password}
                    onChange={handleInputChange}
                    placeholder="************"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Confirm Password
                    {params.password_confirmation === "" && (
                      <span className="text-s italic font-light text-red-800">
                        *
                      </span>
                    )}
                    <span className="ml-2 text-s italic font-light text-red-800">
                      {errors.password_confirmation}
                    </span>
                  </label>
                  <input
                    name="password_confirmation"
                    type="password"
                    value={params?.password_confirmation}
                    onChange={handleInputChange}
                    placeholder="************"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
                  />
                </div>
                <SubmitButton
                  handleSubmit={() => handleSubmit()}
                  buttonDisabled={
                    !errors.email &&
                    !errors.password &&
                    params.fullname &&
                    params.avatar &&
                    params.email &&
                    params.password &&
                    params.password_confirmation &&
                    params.university
                      ? true
                      : false
                  }
                  processing={processing}
                  buttonTitle={"Create University"}
                />
                <button
                  onClick={() => setShowWizard(false)}
                  className="bg-red-700 hover:ring-1 ring-regal-blue text-white text-center py-1 px-9 rounded mt-3"
                >
                  Go Back
                </button>
              </form>
            </div>
          )}
          {showAlert && (
            <div>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Registration</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}
                      >
                        <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          X
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        A University with the same name exists.
                      </p>
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Please choose another name or contact the system
                        administrator for help.
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowAlert(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUniversityPage;
