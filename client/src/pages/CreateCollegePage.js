import React, { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import UserApi from '../api/UserApi';
import CollegeApi from '../api/CollegeApi';
import SuccessModal from '../components/SuccessModal';
import SubmitButton from '../components/submitButton';
import Cookies from 'js-cookie';

const CreateCollegePage = () => {
  const user = JSON.parse(Cookies.get('user') || '{}');
  const initialParams = {
    college_information: '',
    college: '',
    user_id: user.id,
    dean: '',
  };
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deans, setDeans] = useState([]);
  const [params, setParams] = useState(initialParams);
  const [processing, setProcessing] = useState(false);
  const universityid = Cookies.get('universityid')

  useEffect(() => {
    UserApi.fetchDeans(universityid).then((res) => {
      setDeans(res.data);
    });
  }, []);

  const handleSelectChange = (type, value) => {
    setErrors({});
    if (type === 'dean') {
      setParams({ ...params, dean_name: value.label, dean: value.value });
    }
  };

  const handleInputChange = (e) => {
    setErrors({});
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setProcessing(true);
    CollegeApi.createCollege(params).then(
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
                  selectedLabel={
                    params?.dean &&
                    deans[
                      deans.map((obj) => obj.id).indexOf(Number(params?.dean))
                    ]?.fullname
                  }
                  selectedValue={
                    params?.dean &&
                    deans[
                      deans.map((obj) => obj.id).indexOf(Number(params?.dean))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  data={deans}
                  type="dean"
                  label="fullname"
                />
              </div>
              {errors?.message && (
                <div className="text-xs italic font-light text-red-800">
                  Fill the required fields.
                </div>
              )}

              <SubmitButton
                handleSubmit={() => handleSubmit()}
                buttonDisabled={params.college &&
                  params.college_information &&
                  params.dean || processing ? true : false}
                processing={processing}
                buttonTitle={"Create College"}
              />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollegePage;
