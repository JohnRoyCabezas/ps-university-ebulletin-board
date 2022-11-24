import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import Dropdown from "../components/Dropdown";
import SubmitButton from "../components/submitButton";
import SuccessModal from "../components/SuccessModal";
import DeleteModal from "../components/DeleteModal";
import CourseApi from "../api/CourseApi";
import UserApi from '../api/UserApi';
import DepartmentApi from '../api/DepartmentApi';
import ClassListPicker from "../components/ClassListPicker";
import { UserContext } from "../utils/UserContext";

const EditClassPage = () => {
  const { classid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [classData, setClassData] = useState();
  const [params, setParams] = useState();
  const [showModal, setShowModal] = useState({
    updateSucess: false,
    deleteSucess: false,
    delete: false,
  });
  const [oldData, setOldData] = useState();
  const university_id = Cookies.get('universityid');
  const {user, refetchUser} = useContext(UserContext)
  const theme = user.theme

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
    if(classData) {
      setLoading(false);

      const classList = classData.course.students?.map((item) => {
        return item.user.id;
      });

      setOldData({
        old_instructor_id: classData.course.instructor.user_id,
        old_user_ids: classList
      })

      setParams({...params,
        course: classData.course.course,
        department_id: classData.course.department_id,
        instructor_id: classData.course.instructor.user_id,
        user_ids: classList
      })
    }
  }, [classData])

  const handleSave = (ids) => {
    setParams({
      ...params, user_ids: ids
    })
  }

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

  const handleSubmit = () => {
    setProcessing(true);
    CourseApi.updateCourse(params, oldData, classData.course.id).then(() => {
      setProcessing(false);
      setShowModal({...showModal, updateSucess: true});
      refetchUser();
    });
  };

  const handleDelete = () => {
    setShowModal({...showModal, delete:true});
  }

  const handleYes = () => {
    CourseApi.deleteCourse(classid, oldData).then(() => {
      setShowModal({...showModal, delete:false, deleteSucess: true});
      refetchUser();
    })
  }

  return loading
    ? 
    <div role="status" className="m-auto">
      <svg className={`inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-${theme.substring(3)}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
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
        <h1 className="font-bold p-3 sticky top-0 z-10 bg-white text-lg border-b-2 fex">
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

              <label className="block text-sm font-semibold text-gray-800">
                  Class List
                </label>
              <ClassListPicker 
                classList={params.user_ids}
                students={classData.students}
                departments={classData.departments}
                handleSave={handleSave}/>

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
