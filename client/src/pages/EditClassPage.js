import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import Dropdown from "../components/Dropdown";
import DropdownMulti from '../components/DropdownMulti';
import SubmitButton from "../components/submitButton";
import SuccessModal from "../components/SuccessModal";
import DeleteModal from "../components/DeleteModal";
import CourseApi from "../api/CourseApi";
import UserApi from '../api/UserApi';
import DepartmentApi from '../api/DepartmentApi';

const EditClassPage = () => {
  const { classid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [classData, setClassData] = useState();
  const [params, setParams] = useState();
  const [selected, setSelected] = useState();
  const [showModal, setShowModal] = useState({
    updateSucess: false,
    deleteSucess: false,
    delete: false,
  });
  const [oldData, setOldData] = useState();
  const university_id = Cookies.get('universityid');

  useEffect(()=> {
    const fetchData = async () => {
      const course = await CourseApi.fetchSpecificCourse(classid);
      const departments = await DepartmentApi.fetchDepartments(university_id);
      const students = await UserApi.fetchStudents(university_id);
      const instructors = await UserApi.fetchInstructors(university_id);

      setClassData({
        course:course.data,
        departments:departments.data,
        students:students.data,
        instructors:instructors.data,
      })
    }

    fetchData();
  }, [])

  useEffect(()=> {
    // if(course && departments && students && instructors) {
    if(classData) {
      setLoading(false);

      const classList = classData.course.students?.map((item) => {
        return {
          label: item.user.fullname,
          value: item.user.id,
        };
      });

      setOldData({
        old_instructor_id: classData.course.instructor.user_id,
        old_user_ids: classList.map((value) => value.value)
      })

      setParams({...params,
        course: classData.course.course,
        department_id: classData.course.department_id,
        instructor_id: classData.course.instructor.user_id,
        user_ids: classList.map((value) => value.value)
      })

      setSelected(classList);
    }
  }, [classData])

  const handleInputChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (type, value) => {
    if (type === 'department') {
      setParams({ ...params, department_id: value.value });
    } else if (type === 'instructor') {
      setParams({ ...params, instructor_id: value.value });
    }
  };

  const handleMultiSelectChange = (values) => {
    setSelected(values);
    setParams({ ...params, user_ids: values.map((value) => value.value) });
  };

  const handleSubmit = () => {
    setProcessing(true);
    CourseApi.updateCourse(params, oldData, classData.course.id).then(() => {
      setProcessing(false);
      setShowModal({...showModal, updateSucess: true});
    });
  };

  function handleDelete() {
    setShowModal({...showModal, delete:true});
  }

  function handleYes() {
    CourseApi.deleteCourse(classid, oldData).then(() => {
      setShowModal({...showModal, delete:false, deleteSucess: true});
    })
  }

  return loading ?
    <div className="relative w-full h-full flex flex-col justify-center items-center">  
      Loading...
    </div>
    : (
    <div className="flex w-full">
      {showModal.updateSucess && (
        <SuccessModal
        title="Class Update"
        message="The class has been updated!"
        setShowModal={() => navigate(-1)}/>
      )}

      {showModal.deleteSucess && (
        <SuccessModal
          title="Deleted"
          message="The class has been deleted!"
          setShowModal={() => navigate('/adminsettings')}/>
      )}

      {showModal.delete &&
          <DeleteModal
            message={'Are you sure you want to remove this class?'}
            buttonConfirmText={'Yes'}
            buttonCancelText={'No'}
            setShowModal={(value)=> setShowModal({...showModal, delete: value})}
            delete={() => handleYes()}
          />}
      <div className="flex flex-col w-full  h-screen">
        <h1 className="font-bold p-3 sticky top-0 z-50 bg-white text-lg border-b-2 fex">
          Edit Class
          <button
            type="button"
            className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
            Delete
          </button>
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Name
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                  defaultValue={classData?.course?.course || ""}
                  name="course"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Department
                </label>
                <Dropdown
                  selectedLabel={
                    params?.department_id &&
                    classData.departments[
                      classData.departments
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.department_id))
                    ]?.department
                  }
                  selectedValue={
                    params?.department_id &&
                    classData.departments[
                      classData.departments
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.department_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="department"
                  label="department"
                  data={classData.departments}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Instructor
                </label>
                <Dropdown
                  selectedLabel={
                    params?.instructor_id &&
                    classData.instructors[
                      classData.instructors
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.instructor_id))
                    ]?.fullname
                  }
                  selectedValue={
                    params?.instructor_id &&
                    classData.instructors[
                      classData.instructors
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.instructor_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="instructor"
                  label="fullname"
                  data={classData.instructors}
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
                  data={classData.students}
                  handleMultiChange={handleMultiSelectChange}
                />
              </div>
              <div className="mt-8">
                <SubmitButton
                handleSubmit={handleSubmit}
                buttonDisabled={
                  params.course &&
                  params.department_id &&
                  params.instructor_id &&
                  params.user_ids.length>0
                }
                processing={processing}
                buttonTitle={"Save"}
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditClassPage;
