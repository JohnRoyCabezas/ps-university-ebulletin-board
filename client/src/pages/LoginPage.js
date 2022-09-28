import { React, useState, useRef, useEffect } from "react";
import NavBar from "../components/Navbar";
import axios from "../components/api";
import Cookies from "js-cookie";
import ErrMsg from "../components/ErrorMessage";

const LOG_URL = "/auth/login";
const LoginPage = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOG_URL, { email, password });
      Cookies.set('user', JSON.stringify(response.data.user));
      Cookies.set('token', response.data.token);
    } catch (err) {
      if (!err.response) {
        setErrMsg('No server Response');
      } else {
        setErrMsg(err.response.data.error);
      }
    }
  }

  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center overflow-hidden m-20">
        <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl h-96">
          <h1 className="text-3xl font-bold text-center">LOGIN</h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                placeholder="johndoe@gmail.com"
                type="email"
                ref={emailRef}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => [setEmail(e.target.value), setErrMsg(false)]}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                placeholder="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => [setPassword(e.target.value), setErrMsg(false)]}
              />
              <ErrMsg error={errMsg} />
            </div>
            <div className="mt-16">
              <button
                className={`w-full px-4 py-2 tracking-wide transition-colors duration-200 transform ${!email || !password ? "bg-gray-300 text-gray-400" : "bg-regal-blue text-white shadow-lg shadow-regal-blue-500/50"} rounded-md focus:outline-none focus:bg-blue-900`}
                disabled={!email || !password ? true : false}
              >
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
