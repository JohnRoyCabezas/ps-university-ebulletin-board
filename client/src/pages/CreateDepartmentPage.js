import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import UserApi from "../api/UserApi";
import SuccessModal from "../components/SuccessModal";
import DepartmentApi from "../api/DepartmentApi";
import CollegeApi from "../api/CollegeApi";
import SubmitButton from "../components/submitButton";

const CreateDepartmentPage = () => {
  const initialParams = {
    department_information: "",
    department: "",
    user_id: null,
    college_id: null,
  };
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [college, setCollege] = useState([]);
  const [params, setParams] = useState(initialParams);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    UserApi.fetchDeans().then((res) => {
      setData(res.data);
    });
    CollegeApi.fetchColleges().then((res) => {
      setCollege(res.data);
    });
  }, []);

  const handleSelectChange = (type, value) => {
    setErrors({});
    if (type === "dean") {
      setParams({ ...params, user_id: value.value });
    }
    if (type === "college") {
      setParams({ ...params, college_id: value.value, college_name: value.label });
    }
  };

  const handleInputChange = (e) => {
    setErrors({});
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setProcessing(true);
    DepartmentApi.createDepartment(params).then(
      (res) => {
        setShowModal(true);
        setParams(initialParams);
        setProcessing(false);
      },
      (err) => {
        setErrors(err.response.data);
        setProcessing(false);
      }
    );
  };

  return (
    <div className="flex">
      {showModal && (
        <SuccessModal
          title="Department Creation"
          message="A new department has been created!"
          setShowModal={setShowModal}
        />
      )}
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2">
          Create Department
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form onSubmit={handleSubmit} className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College
                  {params?.college_id === null && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <Dropdown
                  selectedLabel={
                    params?.college_id &&
                    college[
                      college.map((obj) => obj.id).indexOf(Number(params?.college_id))
                    ]?.college
                  }
                  selectedValue={
                    params?.college_id &&
                    college[
                      college.map((obj) => obj.id).indexOf(Number(params?.college_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="college"
                  label="college"
                  data={college}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department Name
                  {params.department === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  onChange={handleInputChange}
                  value={params?.department}
                  name="department"
                  placeholder="Department of Computer Engineering"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department Information
                  {params.department_information === "" && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <input
                  onChange={handleInputChange}
                  value={params?.department_information}
                  name="department_information"
                  placeholder="Department of Engineering is a..."
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department Dean
                  {params?.user_id === null && (
                    <span className="text-s italic font-light text-red-800">
                      *
                    </span>
                  )}
                </label>
                <Dropdown
                  selectedLabel={
                    params.user_id &&
                    data[
                      data.map((obj) => obj.id).indexOf(Number(params?.user_id))
                    ]?.fullname
                  }
                  selectedValue={
                    params.user_id &&
                    data[
                      data.map((obj) => obj.id).indexOf(Number(params?.user_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="dean"
                  label="fullname"
                  data={data}
                />
              </div>
              {errors?.message && (
                <div className="text-xs italic font-light text-red-800">
                  Fill the required fields.
                </div>
              )}

              <SubmitButton
                handleSubmit={() => handleSubmit()}
                buttonDisabled={params.department &&
                  params.department_information &&
                  params.user_id
                  ? true : false}
                processing={processing}
                buttonTitle={"Create Department"}
              />
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartmentPage;
