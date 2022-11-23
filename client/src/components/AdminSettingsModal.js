import Cookies from 'js-cookie';
import React, { useContext, useRef, useState } from 'react';
import UniversityApi from '../api/UniversityApi';
import SuccessModal from './SuccessModal';
import ThemePick from './ThemePick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../utils/UserContext';
import SubmitButton from '../components/submitButton';


const AdminSettingsModal = ({ setShowModal, university }) => {
  const [activeTab, setActiveTab] = useState({ edit: true });
  const [universityName, setUniversityName] = useState({
    current: university,
    pending: university,
  });
  const [error, setError] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const universityid = Cookies.get('universityid');
  const inputRef = useRef();
  const { theme } = useContext(UserContext).user;
  const [processing, setProcessing] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setProcessing(true);
    UniversityApi.editUniversityName(universityid, universityName.pending).then(() => {
      setShowSuccess(true);
      setUniversityName({ ...universityName, current: universityName.pending })
      setError(null);
      setProcessing(false);
    }).catch(({ response }) => {
      setError(response.data.message)
    }).finally(() => setProcessing(false))
  }

  return (
    <div>
      {
        showSuccess && (
          <SuccessModal
            title="Update Success!"
            message="University Name Updated!"
            setShowModal={setShowSuccess} />
        )
      }
      <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none`}>
        <div className="relative w-1/2 my-6 mx-auto">
          <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300">
            <div className="relative py-2 flex flex-row-reverse">
              <button
                className="mx-2 hover:bg-gray-500 rounded-md px-1"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <FontAwesomeIcon icon={faClose} size="2xl" />
              </button>
            </div>
            <div className="flex h-96">
              <div className="mr-3 whitespace-nowrap text-sm font-medium text-center text-black border-b border-custom-gray">
                <ul>
                  <li>
                    <button className={`w-full rounded-md inline-block p-4 border-b-2 hover:bg-black hover:bg-opacity-20 hover:text-black ${activeTab?.edit && theme + " bg-opacity-50 text-white"}`}
                      onClick={() => setActiveTab({ edit: true })}
                    >Edit University Name</button>
                  </li>
                  <li>
                    <button className={`w-full rounded-md inline-block p-4 border-b-2 hover:bg-black hover:bg-opacity-10 hover:text-black ${activeTab?.theme && theme + " bg-opacity-50 text-white"}`}
                      aria-current="page"
                      onClick={() => setActiveTab({ theme: true })}
                    >Change Theme</button>
                  </li>
                </ul>
              </div>
              <div className="w-full h-full">
                {/* edit tab */}
                {activeTab?.edit && (
                  <div className="flex m-auto justify-center items-center w-3/4 h-3/4">
                    <div className={`p-6 ${theme} bg-opacity-20 rounded-md shadow-md w-full`}>
                      <form>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-800">
                            University Name
                          </label>
                          <input
                            ref={inputRef}
                            name="university"
                            value={universityName.pending}
                            onChange={(e) => {
                              setUniversityName({ ...universityName, pending: e.target.value });
                              setError(null);
                            }
                            }
                            placeholder="University of Sun*"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-500 focus:outline-blue-500  input"
                          />
                          <p hidden={!error} className="instructions text-red-600 rounded text-sm italic pt-2">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {error}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <SubmitButton
                            handleSubmit={handleEdit}
                            buttonDisabled={!universityName.pending.length>0 || universityName.pending===universityName.current
                              ? false : true}
                            processing={processing}
                            buttonTitle={"Save"}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* theme tab */}
                {activeTab?.theme && (
                  <ThemePick />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme} opacity-70 fixed inset-0 top-0 z-30`}></div>
    </div>
  );
}

export default AdminSettingsModal;