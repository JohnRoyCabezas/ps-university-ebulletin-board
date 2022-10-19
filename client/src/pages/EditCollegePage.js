import { React, useEffect, useState } from "react";
import SelectDropDownComponent from "../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import CollegeApi from "../api/CollegeApi";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SuccessModal from "../components/SuccessModal";

const EditCollegePage = () => {

  const [collegeInfo, setCollegeInfo] = useState('');
  const [college, setCollege] = useState('');
  const [deansList, setDeansList] = useState([]);
  const [defaultLabel, setDefaultLabel] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessDeleteModal, setSuccessDeleteModal] = useState(false);
  const navigate = useNavigate();

  // Const id can become dynamic afterwards
  const id = 2;

  useEffect(() => {
    CollegeApi.fetchSpecificCollege(id).then((res) => {
      setCollegeInfo(res.data?.college?.college_information);
      setCollege(res.data?.college?.college);
      res.data.deans.map((data) => {
        setDeansList(current => [...current, data.user]);
        if (data.user_id === res.data.college.user_id) {
          setDefaultValue(data.user_id);
          setDefaultLabel(data.user.fullname);
        }
      });
    })
  }, [])

  function handleSelectChange(label, value) {
    setDefaultLabel(value.label);
    setDefaultValue(value.value);
  }

  function handleYes() {
    setShowDeleteModal(false);
    CollegeApi.deleteCollege(id).then(() => {
      setSuccessDeleteModal(true);
    })
  }

  function handleDelete() {
    setShowDeleteModal(true);
  }

  const handleSubmit = (e) => {
    setProcessing(true)
    e.preventDefault();
    CollegeApi.updateCollege({ collegeInfo, college, defaultValue }, id).then((res) => {
      setTimeout(() => {
        setProcessing(false);
        setShowModal(true);
      }, 500)
    })
  }

  return (
    <div className="flex">
      {showModal && (
        <SuccessModal
          title="College Update"
          message="The college has been updated!"
          setShowModal={() => navigate('/adminsettings')}
        />)}
      {showSuccessDeleteModal && (
        <SuccessModal
          title="Deleted"
          message="The college has been deleted!"
          setShowModal={() => navigate('/adminsettings')}
        />)}
      <div className="flex flex-col w-full h-screen">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2 fex">
          Edit College
          <button
            type="button"
            className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
            Delete
          </button>
        </h1>

        {showDeleteModal &&
          <DeleteModal
            message={'Are you sure you want to remove this college?'}
            buttonConfirmText={'Yes'}
            buttonCancelText={'No'}
            setShowModal={setShowDeleteModal}
            delete={() => handleYes()}
          />}

        <div className="relative h-full flex flex-col justify-center items-center ">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Name
                  <span className={!college ? "inline-block" : "hidden"}>
                    : <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  value={college || ''}
                  onChange={(e) => setCollege(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Information
                  <span className={!collegeInfo ? "inline-block" : "hidden"}>
                    : <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  value={collegeInfo || ''}
                  onChange={(e) => setCollegeInfo(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  College Dean
                  <span className={!defaultValue ? "inline-block" : "hidden"}>
                    : <span className="text-red-600">*</span>
                  </span>
                </label>
                <SelectDropDownComponent defaultLabel={defaultLabel} defaultValue={defaultValue} data={deansList} type={"fullname"} handleChange={handleSelectChange} />
              </div>
              <div className="mt-8">
                <button
                  disabled={!collegeInfo || !college || !defaultValue || processing ? true : false}
                  className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md ${!collegeInfo || !college || !defaultValue ? true : "hover:bg-blue-900 focus:outline-none focus:bg-blue-900"}`}
                  onClick={handleSubmit}
                >
                  {processing ? <span><FontAwesomeIcon icon={faSpinner} spin /> Processing...</span> : "Accept Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollegePage;
