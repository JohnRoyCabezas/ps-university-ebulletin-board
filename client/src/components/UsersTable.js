import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import Paginate from './Paginate';
import { Fragment } from 'react';

const UsersTable = ({
  users,
  isAscending,
  paginateData,
  params,
  onSortChange,
  onPageChange,
}) => {
  return (
    <div>
      <div>
        <table className="w-full">
          <thead className="border">
            <tr>
              <th
                onClick={() => onSortChange('id', isAscending ? 'desc' : 'asc')}
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
              >
                ID
                {params?.order_name === 'id' &&
                params?.order_direction === 'desc' ? (
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
                  onSortChange('fullname', isAscending ? 'desc' : 'asc')
                }
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                FullName
                {params?.order_name === 'fullname' &&
                params?.order_direction === 'desc' ? (
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
                  onSortChange('email', isAscending ? 'desc' : 'asc')
                }
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                Email
                {params?.order_name === 'email' &&
                params?.order_direction === 'desc' ? (
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
                  onSortChange('roleUser', isAscending ? 'desc' : 'asc')
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
      </div>
      <div className="mt-8 flex justify-center">
        <Paginate
          page={paginateData.current_page}
          pageCount={paginateData.last_page || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UsersTable;
