import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Paginate from "./Paginate";

export default function UsersTable() {
  return (
    <div>
      <div>
        <table className="w-full">
          <thead className="border">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
              >
                ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                Avatar
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                FullName
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4"
              >
                Department
              </th>
              <th
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <tr className="bg-white border transition duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Engineering
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Student
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    class="py-2.5 mr-2 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    class="py-2.5 bg-red-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-center">
        <Paginate />
      </div>
    </div>
  );
}
