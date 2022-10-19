import React, { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import UserApi from '../api/UserApi';
import CollegeApi from '../api/CollegeApi';
import SuccessModal from '../components/SuccessModal';

const CreateCollegePage = () => {
  const initialParams = {
    college_information: '',
    college: '',
    university: 1,
    dean: null,
  };
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    UserApi.fetchDeans().then((res) => {
      setData(res.data);
    });
  }, []);

  const handleSelectChange = (type, value) => {
    setErrors({});
    if (type === 'fullname') {
      setParams({ ...params, dean: value.value, dean_name: value.label });
    }
  };

  const handleInputChange = (e) => {
    setErrors({});
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CollegeApi.createCollege(params).then(
      (res) => {
        setShowModal(true);
        setParams(initialParams);
      },
      (err) => {
        setErrors(err.response.data);
      }
    );
  };

  return (
    <div className="flex h-screen">
      {showModal && (
        <SuccessModal
          title="College Creation"
          message="A new college has been created!"
          setShowModal={setShowModal}
        />
      )}
      <div className="flex flex-col w-full">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2">
          Create College
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form onSubmit={handleSubmit} className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Name
                  {params.college === '' && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  onChange={handleInputChange}
                  value={params?.college}
                  name="college"
                  placeholder="College of Engineering"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Information
                  {params.college_information === '' && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  onChange={handleInputChange}
                  value={params?.college_information}
                  name="college_information"
                  placeholder="College of Engineering is a..."
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Dean
                  {params?.dean === null && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <Dropdown
                  defaultLabel={params?.dean_name}
                  defaultValue={params?.dean}
                  handleChange={handleSelectChange}
                  data={data}
                  type="fullname"
                />
              </div>
              {errors?.message && (
                <div className="text-xs italic font-light text-red-800">
                  Fill the required fields.
                </div>
              )}
              <div className="mt-8">
                <button
                  disabled={
                    params.college && params.college_information && params.dean
                      ? false
                      : true
                  }
                  onClick={handleSubmit}
                  className={`w-full px-4 py-2 tracking-wide rounded-md 
                    ${
                      params.college &&
                      params.college_information &&
                      params.dean
                        ? `w-full px-4 py-2 text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`
                        : `bg-gray-300 text-gray-400`
                    }
                    `}
                >
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
