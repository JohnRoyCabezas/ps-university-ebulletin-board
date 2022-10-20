import React, { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import DropdownMulti from '../components/DropdownMulti';
import UserApi from '../api/UserApi';
import DepartmentApi from '../api/DepartmentApi';
import CourseApi from '../api/CourseApi';
import SuccessModal from '../components/SuccessModal';

const CreateCollegePage = () => {
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
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    UserApi.fetchStudents().then((res) => {
      setStudents(res.data);
    });
    UserApi.fetchInstructors().then((res) => {
      setInstructors(res.data);
    });
    DepartmentApi.fetchDepartments().then((res) => {
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

  const handleMultiSelectChange = (values) => {
    setSelected(values);

    const selectedStudents = values.map((value) => value.value);
    setParams({ ...params, user_ids: selectedStudents });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CourseApi.createCourse(params).then((res) => {
      setParams(initialState);
      setShowModal(true);
      setSelected([]);
    });
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2">
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
                <DropdownMulti
                  selected={selected}
                  type="students"
                  label="fullname"
                  data={students}
                  handleMultiChange={handleMultiSelectChange}
                />
              </div>
              <div className="mt-8">
                <button
                  disabled={ 
                    params.course &&
                    params.department_id &&
                    params.instructor_id &&
                    params.user_ids.length>0
                      ? false
                      : true
                  }
                  onClick={handleSubmit}
                  className={`w-full px-4 py-2 tracking-wide rounded-md 
                ${
                  params.course &&
                  params.department_id &&
                  params.instructor_id &&
                  params.user_ids.length>0
                    ? `text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`
                    : `bg-gray-300 text-gray-400`
                }`}
                >
                  Create Class
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
