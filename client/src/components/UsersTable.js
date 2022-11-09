import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Paginate from "./Paginate";
import { Fragment, useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/UserApi";
import Cookies from "js-cookie";

const UsersTable = ({ isAscending, params, onSortChange, onPageChange }) => {
  const [users, setUsers] = useState([]);
  const [paginateData, setPaginateData] = useState({});
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [loading, setLoading] = useState(true);
  const universityid = Cookies.get('universityid')

  useEffect(() => {
    UserApi.fetchAllUsers({ ...params, university_id: universityid }).then((res) => {
      setPaginateData(res.data);
      setUsers(res.data.data);
      setLoading(false);
    });
  }, [params]);

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    AuthApi.softDelete(deleteId).then((res) => {
      UserApi.fetchAllUsers(params).then((res) => {
        setPaginateData(res.data);
        setUsers(res.data.data);
      });
    });
  };

  return (
    <div>
      {showDeleteModal && (
        <DeleteModal
          buttonCancelText="Cancel"
          buttonConfirmText="Yes"
          message="Are you sure you want to delete user?"
          setShowModal={setShowDeleteModal}
          delete={() => handleConfirmDelete()}
        />
      )}
      {users.length != 0 ? (
        <div>
          <table className="w-full">
            <thead className="border">
              <tr>
                <th
                  onClick={() =>
                    onSortChange("id", isAscending ? "desc" : "asc")
                  }
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  ID
                  {params?.order_name === "id" &&
                    params?.order_direction === "desc" ? (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </span>
                  ) : (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  )}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  Avatar
                </th>
                <th
                  onClick={() =>
                    onSortChange("fullname", isAscending ? "desc" : "asc")
                  }
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  FullName
                  {params?.order_name === "fullname" &&
                    params?.order_direction === "desc" ? (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </span>
                  ) : (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  )}
                </th>
                <th
                  onClick={() =>
                    onSortChange("email", isAscending ? "desc" : "asc")
                  }
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  Email
                  {params?.order_name === "email" &&
                    params?.order_direction === "desc" ? (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </span>
                  ) : (
                    <span className="mx-2 cursor-pointer">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  )}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  Department
                </th>
                <th
                  onClick={() =>
                    onSortChange("roleUser", isAscending ? "desc" : "asc")
                  }
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <Fragment key={user.id}>
                    <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user?.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img

                          onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                          src={user.avatar}
                          alt="avatar"
                          style={{ width: 40, height: 40 }}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user?.fullname}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user?.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user?.department?.department}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user?.role_user?.role?.role}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(user.id)}
                          type="button"
                          className="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            size="lg"
                            color="#FFFFF"
                            className="mx-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          type="button"
                          className="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="lg"
                            color="#FFFFF"
                            className="mx-4"
                          />
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <div className="mt-8 flex justify-center">
            <Paginate
              page={paginateData.current_page}
              pageCount={paginateData.last_page || 0}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <h1 className="flex justify-between font-bold p-3 sticky top-0 bg-white text-xl">{!loading ? "No Registered User" : "Loading..."}</h1>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
