import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AuthApi from "../api/AuthApi";
import Dropdown from "../components/Dropdown";
import RoleApi from "../api/RoleApi";
import DepartmentApi from "../api/DepartmentApi";
import { useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import BackButton from "../components/BackButton";

const EditUserPage = () => {
  const navigate = useNavigate();
  const initialParams = {
    fullname: "",
    email: "",
    department_id: "",
    role_id: "",
  };

  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState(initialParams);
  const university_id = Cookies.get("universityid");
  const [avatar, setAvatar] = useState();

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
      "params",
      JSON.stringify({ ...params, [e.target.name]: e.target.value })
    );
  };

  const handleSelectChange = (type, item) => {
    if (type === "department") {
      setParams({ ...params, department_id: item.value });
      Cookies.set(
        "params",
        JSON.stringify({ ...params, department_id: item.value })
      );
    } else if (type === "role") {
      setParams({ ...params, role_id: item.value });
      Cookies.set("params", JSON.stringify({ ...params, role_id: item.value }));
    }
  };

  const removeAvatar = () => {
    setParams({ ...params, avatar: "" });
  };

  const uploadAvatar = (uploadedAvatar) => {
    setParams({ ...params, avatar: uploadedAvatar });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(params);
    let formData = new FormData();
    formData.append("avatar", params.avatar);
    formData.append("department_id", params.department_id);
    formData.append("email", params.email);
    formData.append("fullname", params.fullname);
    formData.append("role_id", params.role_id);
    formData.append("id", id);
    formData.append("_method", "POST");
    AuthApi.update({ formData }).then(() => {
      Cookies.remove("params");
      setShowModal(true);
    });
  };

  return (
    <div className="flex w-full">
      {showModal && (
        <SuccessModal
          title="Update User"
          message="Successfuly updated user information!"
          setShowModal={() => navigate("/manageusers")}
        />
      )}
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          <BackButton link={"/manageusers"} />
          Edit User
        </h1>
        <div className="relative h-full flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full p-6 m-auto bg-custom-gray rounded-md shadow-md lg:max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="mt-1"
              encType="multipart/form-data"
              id="imageForm"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <label className="text-sm font-semibold text-gray-800 flex items-center justify-center mb-2">
                  Avatar
                </label>
                <div className="flex justify-center w-24 h-24">
                  <img
                    onError={(e) =>
                      (e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
                    }
                    src={params?.avatar}
                    className="rounded-full w-24"
                    alt=""
                  />
                </div>
                <div className="flex justify-center my-2 flex-col">
                  <label
                    htmlFor="dropzone"
                    className="bg-white border rounded px-3 py-1 cursor-pointer hover:bg-gray-200"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="dropzone"
                    onChange={(e) => {
                      // setAvatar(e.target.files[0]);
                      uploadAvatar(e.target.files[0]);
                    }}
                    type="file"
                    className="hidden"
                  />
                  <label
                    onClick={() => removeAvatar()}
                    className="rounded pt-2 text-center text-sm cursor-pointer hover:underline"
                  >
                    Remove Photo
                  </label>
                </div>
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
                <button
                  className={`w-full px-4 py-2 tracking-wide rounded-md text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`}
                >
                  Edit Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
