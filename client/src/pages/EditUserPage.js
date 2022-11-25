import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AuthApi from '../api/AuthApi';
import Dropdown from '../components/Dropdown';
import RoleApi from '../api/RoleApi';
import DepartmentApi from '../api/DepartmentApi';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import { AvatarUploadApi } from '../api/AvatarUploadApi';
import BackButton from '../components/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '../components/submitButton';
const EditUserPage = () => {
  const navigate = useNavigate();
  const initialParams = {
    fullname: '',
    email: '',
    department_id: '',
    role_id: '',
  };
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState(initialParams);
  const [valid, setValid] = useState({ format: false, size: false });
  const university_id = Cookies.get('universityid');
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    DepartmentApi.fetchDepartments(university_id).then((res) => {
      setDepartments(res.data);
    });
    RoleApi.fetchRoles().then((res) => {
      setRoles(res.data);
    });
    AuthApi.show(id).then((res) => {
      setParams({
        ...params,
        avatar: res.data?.avatar,
        fullname: res.data?.fullname,
        email: res.data?.email,
        department_id: res.data?.department_id,
        role_id: res.data?.role_user?.role?.id,
      });
    });
  }, []);
  const handleInputChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    Cookies.set(
      'params',
      JSON.stringify({ ...params, [e.target.name]: e.target.value })
    );
  };
  const handleSelectChange = (type, item) => {
    if (type === 'department') {
      setParams({ ...params, department_id: item.value });
      Cookies.set(
        'params',
        JSON.stringify({ ...params, department_id: item.value })
      );
    } else if (type === 'role') {
      setParams({ ...params, role_id: item.value });
      Cookies.set('params', JSON.stringify({ ...params, role_id: item.value }));
    }
  };

  const removeAvatar = () => {
    setParams({ ...params, avatar: '0' });
    setValid({size:false, format:false})
  }

  const uploadAvatar = (uploadedAvatar) => {
    if (['jpg', 'png', 'jpeg'].includes(uploadedAvatar.name.substring(uploadedAvatar.name.lastIndexOf(".") + 1))) {
      const formData = new FormData();
      formData.append('avatar', uploadedAvatar);
      AvatarUploadApi
        .upload({ formData }).then((res) => {
          setParams({ ...params, avatar: `http://localhost:8000/Avatars/${res.data}` })
        })
        .catch(function () {
          setValid({ ...valid, size: true })
        })
    } else { setValid({ ...valid, format: true }) }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true)
    AuthApi.update(id, params).then((res) => {
      Cookies.remove('params');
      setShowModal(true);
      setProcessing(false);
    });
  };

  return (
    <div className="flex w-full">
      {showModal && (
        <SuccessModal
          title="Update User"
          message="Successfuly updated user information!"
          setShowModal={(e) => navigate('/manageusers')}
        />
      )}
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          <BackButton link={'/manageusers'} />
          Edit User
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form className="mt-1">
              <div className="flex flex-col items-center justify-center mb-4">
                <label className="text-sm font-semibold text-gray-800 flex items-center justify-center mb-2">
                  Avatar
                </label>
                <div
                  className="flex justify-center w-24 h-24"
                >
                  <img
                    onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                    src={params?.avatar}
                    className="rounded-full w-24"
                    alt=''
                  />
                </div>
                <div className='flex justify-center my-2 flex-col'>
                  <label htmlFor='dropzone' className='bg-white border text-center rounded px-3 py-1 cursor-pointer hover:bg-gray-200'>Upload Photo</label>
                  <input
                    id='dropzone'
                    onClick={() => setValid(false)}
                    onChange={(e) => {
                      uploadAvatar(e.target.files[0])
                    }}
                    type='file'
                    className='hidden'
                  />
                  <label onClick={() => { removeAvatar(); setValid(false) }} className='rounded pt-2 text-center text-sm cursor-pointer hover:underline'>Remove Photo</label>
                </div>
                {(valid.format || valid.size) && (valid.format ? <span className='text-red-600 text-xs relative italic p-1'><FontAwesomeIcon icon={faInfoCircle} /> Must be in '.jpeg', '.jpg', and '.png' format</span> : <span className='text-red-600 text-xs relative italic p-1'><FontAwesomeIcon icon={faInfoCircle} /> Avatar size must be 2mb below</span>)}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
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
                  Role
                </label>
                <Dropdown
                  selectedLabel={
                    params.role_id &&
                    roles[
                      roles
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.role_id))
                    ]?.role
                  }
                  selectedValue={
                    params.role_id &&
                    roles[
                      roles
                        .map((obj) => obj.id)
                        .indexOf(Number(params?.role_id))
                    ]?.id
                  }
                  handleChange={handleSelectChange}
                  type="role"
                  label="role"
                  data={roles}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800">
                  Fullname
                </label>
                <input
                  onChange={handleInputChange}
                  value={params?.fullname}
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
                  onChange={handleInputChange}
                  value={params?.email}
                  name="email"
                  placeholder="johndoe@domain.com"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500 input"
                />
              </div>
              <div className="mt-16">
                <SubmitButton
                  handleSubmit={handleSubmit}
                  buttonDisabled={!departments || !params.fullname || !params.email
                    ? false : true}
                  processing={processing}
                  buttonTitle={"Edit Account"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUserPage;
