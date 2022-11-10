import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import CollegeApi from "../api/CollegeApi";
import DeleteModal from "../components/DeleteModal";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import SubmitButton from "../components/submitButton";
import Cookies from "js-cookie";
import Dropdown from "../components/Dropdown";
import UserApi from "../api/UserApi";
import BackButton from "../components/BackButton";


const EditCollegePage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [collegeInfo, setCollegeInfo] = useState('');
  const [college, setCollege] = useState('');
  const [deansList, setDeansList] = useState([]);
  const [defaultLabel, setDefaultLabel] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessDeleteModal, setSuccessDeleteModal] = useState(false);
  const user = JSON.parse(Cookies.get('user'));
  const id = location.state.collegeid;

  useEffect(() => {
    CollegeApi.fetchSpecificCollege(id).then((res) => {
      setCollege(res?.data?.college?.college);
      setCollegeInfo(res?.data?.college?.college_information);
      setDefaultValue(res?.data?.college?.user_id);

      UserApi.fetchDeans(user?.university_id).then((deans) => {
        deans.data.forEach((data, index) => {
          if (data.id === res?.data?.college?.user_id) {
            // setDefaultLabel(deans.data.splice(index, 1)[0].fullname);
            setDefaultLabel(deans?.data[index].fullname)
          }
        })
        setDeansList(deans.data);
      })
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

  const handleSubmit = () => {
    setProcessing(true)
    CollegeApi.updateCollege({ collegeInfo, college, defaultValue }, id).then((res) => {
      setProcessing(false);
      setShowModal(true);
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
          <BackButton link={`/admincollege/${id}`} />
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

                <Dropdown
                  selectedLabel={defaultLabel}
                  selectedValue={defaultValue}
                  data={deansList}
                  type={"dean"}
                  label={"fullname"}
                  handleChange={handleSelectChange}
                />
              </div>

              <SubmitButton
                handleSubmit={() => handleSubmit()}
                buttonDisabled={collegeInfo && college && defaultValue ? true : false}
                processing={processing}
                buttonTitle={"Accept Changes"}
              />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollegePage;
