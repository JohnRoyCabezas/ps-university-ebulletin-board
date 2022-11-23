import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Dropdown from '../components/Dropdown';
import UserApi from '../api/UserApi';
import DepartmentApi from '../api/DepartmentApi';
import CourseApi from '../api/CourseApi';
import SuccessModal from '../components/SuccessModal';
import SubmitButton from '../components/submitButton';
import BackButton from '../components/BackButton';
import ClassListPicker from '../components/ClassListPicker';

const CreateClassPage = () => {
  const initialState = {
    user_ids: [],
    instructor_id: '',
    course: '',
    department_id: '',
  };
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [params, setParams] = useState(initialState);
  const [processing, setProcessing] = useState(false);
  const university_id = Cookies.get('universityid');

  useEffect(() => {
    UserApi.fetchStudents(university_id).then((res) => {
      setStudents(res.data);
    });
    UserApi.fetchInstructors(university_id).then((res) => {
      setInstructors(res.data);
    });
    DepartmentApi.fetchDepartments(university_id).then((res) => {
      setDepartments(res.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (type, value) => {
    if (type === 'department') {
      setParams({ ...params, department_id: value.value });
    } else if (type === 'instructor') {
      const selectedInstructor = value.value;
      setParams({ ...params, instructor_id: selectedInstructor });
    }
  };

  const handleClassListSave = (ids) => {
    setParams({
      ...params, user_ids: ids
    })
  }

  const handleSubmit = () => {
    setProcessing(true);
    CourseApi.createCourse(params).then((res) => {
      setParams(initialState);
      setShowModal(true);
      setProcessing(false);
    });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col h-full w-full">
        <h1 className="font-bold p-3 sticky top-0 z-10 bg-white text-lg border-b-2">
          <BackButton link={'/adminsettings'} />
          Create Class
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          {showModal && (
            <SuccessModal
              title="Create Class"
              message="Successfully created a class!"
              buttonConfirmText={'Close'}
              buttonCancelText={'text'}
              setShowModal={setShowModal}
            />
          )}
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form onSubmit={handleSubmit} className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Name
                </label>
                <input
                  name="course"
                  value={params?.course}
                  onChange={handleInputChange}
                  placeholder="e.g. Engineering 101"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Information
                </label>
                <input
                  name="class_information"
                  value={params?.class_information}
                  onChange={handleInputChange}
                  placeholder="e.g. Class for Engineering 101"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department
                </label>
                <Dropdown
                  selectedLabel={
                    params.department_id &&
                    departments[
                      departments
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.department_id))
                    ]?.department
                  }
                  selectedValue={
                    params.department_id &&
                    departments[
                      departments
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.department_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="department"
                  label="department"
                  data={departments}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Instructor
                </label>
                <Dropdown
                  selectedLabel={
                    params.instructor_id &&
                    instructors[
                      instructors
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.instructor_id))
                    ]?.fullname
                  }
                  selectedValue={
                    params.instructor_id &&
                    instructors[
                      instructors
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.instructor_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="instructor"
                  label="fullname"
                  data={instructors}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class List
                </label>
                <ClassListPicker 
                  classList={params.user_ids}
                  students={students}
                  departments={departments}
                  handleSave={handleClassListSave}
                />
              </div>

              <SubmitButton
                handleSubmit={() => handleSubmit()}
                buttonDisabled={params.course &&
                  params.department_id &&
                  params.instructor_id &&
                  params.user_ids.length > 0
                  ? true : false}
                processing={processing}
                buttonTitle={"Create Class"}
              />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassPage;
