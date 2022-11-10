import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DeleteModal = (props) => {
  function handleYes() {
    props.setShowModal(false)
    props.delete()
  }

  function handleCancel() {
    props.setShowModal(false)
    props.cancel()
  }

  return (
    <>
      <div className="justify-center items-center fixed flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
        <div className="mx-auto bg-transparent relative right-0 left-0 max-w-3xl">
          <div className="justify-center flex py-auto rounded-full z-10 top-8 relative">
            <span className="w-20 h-20 flex justify-center p-5 border-red-500/75 shadow-xl rounded-full"><FontAwesomeIcon icon={faTrashCan} style={{ color: 'red' }} size="3x" beatFade /></span>
          </div>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full mix-blend-difference bg-white pt-5 outline-none focus:outline-none">
            <div className="relative p-4 flex-auto">
              <span 
              className="text-slate-500 text-lg leading-relaxed"
              >
                {props.message}
              </span>
            </div>
            <div className="flex items-center justify-end p-6 border-slate-200 rounded-b bg-gray-100 p-2">
              <button
                className="text-red-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-hover-background dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={handleYes}
              >
                {props.buttonConfirmText}
              </button>
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:text-secondary-background"
                type="button"
                onClick={() => handleCancel()}
              >
                {props.buttonCancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default DeleteModal;
