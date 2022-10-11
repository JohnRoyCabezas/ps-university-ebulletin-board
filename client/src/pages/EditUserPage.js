import Dropdown from "../components/Dropdown";
import Sidebar from "../components/Sidebar";

const EditUserPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          Edit User
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="flex flex-col items-center justify-center mb-4">
                <label className="block text-sm font-semibold text-gray-800 flex items-center justify-center mb-2">
                  Avatar
                </label>
                <div className="flex justify-center">
                  <img
                    src="https://joeschmoe.io/api/v1/213"
                    className="rounded-full w-24 "
                    alt="Avatar"
                  />
                </div>
                <div
                  className="mt-2 cursor-pointer"
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
                </label>
                <Dropdown
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Role
                </label>
                <Dropdown
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Fullname
                </label>
                <input
                  name="fullname"
                  placeholder="John Doe"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="johndoe@domain.com"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
                />
              </div>

              <div className="mt-16">
                <button
                  className={`w-full px-4 py-2 tracking-wide rounded-md text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`}
                >
                  Edit Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
