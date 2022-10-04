import { React, useState, useRef, useEffect } from "react";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie";
import AuthApi from '../api/AuthApi';
import ErrMsg from "../components/ErrorMessage";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const LoginPage = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setvalidEmail] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    const Email = EMAIL_REGEX.test(email);
    if (email === '' || Email) {
      setErrMsg('')
      setvalidEmail(true)
    } else { setvalidEmail(false) }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = { email, password };

    AuthApi.login(params).then(
      (res) => {
        Cookies.set('token', res.data.token);
        Cookies.set('user', JSON.stringify(res.data.user));
      },
      (err) => {
        setErrMsg(err.response.data.error);
      }
    );
  };

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
                className="text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                placeholder="johndoe@gmail.com"
                type="email"
                ref={emailRef}
                className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md ${validEmail ? "focus:border-blue-400 focus:ring-blue-300" : "focus:border-red-400 focus:ring-red-300"} focus:outline-none focus:ring focus:ring-opacity-40`}
                onChange={(e) => [setEmail(e.target.value)]}
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
