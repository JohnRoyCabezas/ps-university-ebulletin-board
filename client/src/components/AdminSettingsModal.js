import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSettingsModal = ({setShowModal}) => {
  const [activeTab, setActiveTab] = useState({edit: true});
  const [universityName, setUniversityName] = useState("");

  const handleEdit = () => {
    // 
  }

  return (
      <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-1/2 my-6 mx-auto">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold mx-auto">Admin Settings</h3>
          <button
            className="absolute right-10 my-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
              X
          </button>
        </div>
        <div className="flex h-96">
          <div className="mr-3 whitespace-nowrap text-sm font-medium text-center text-gray-500 border-b border-custom-gray dark:text-gray-400 dark:border-gray-700">
            <ul>
                <li>
                    <Link to="#" className={`inline-block p-4 border-b-2 hover:bg-custom-gray hover:border-custom-gray dark:hover:text-gray-300 active:bg-custom-gray ${activeTab?.edit ? "active tab": ""}`}
                    onClick={() => setActiveTab({edit: true})}
                    >Edit University Name</Link>
                </li>
                <li>
                    <Link to="#" className={`w-full inline-block p-4 border-b-2 hover:bg-custom-gray hover:border-custom-gray dark:hover:text-gray-300 active:bg-custom-gray ${activeTab?.theme ? "active tab": ""}`}
                    aria-current="page"
                    onClick={() => setActiveTab({theme: true})}
                    >Change Theme</Link>
                </li>
            </ul>
          </div>
          <div className="w-full h-full">
            {/* edit tab */}
            { activeTab?.edit && (
              <div className="flex m-auto justify-center items-center w-3/4 h-3/4">
                <div className="p-6 bg-custom-gray rounded-md shadow-md w-full">
                  <form onSubmit={handleEdit}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-800">
                        University Name
                      </label>
                      <input
                        name="university"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        placeholder="University of Sun*"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        // onClick={() => ("")}
                        className={`px-11 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md 
                          ${universityName.length>0
                              ? `text-white transition-colors duration-200 transform bg-regal-blue  hover:bg-blue-900 focus:outline-none focus:bg-blue-900`
                              : `bg-gray-300 text-gray-400`
                          }
                        `}
                        disabled={!universityName.length>0}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 top-0 z-40 bg-black"></div>
      </div>
  );
}

export default AdminSettingsModal;