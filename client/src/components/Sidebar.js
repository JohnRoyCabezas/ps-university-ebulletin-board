import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

// TODO
// const Modal = ({ isShowing, hide }) =>
//   isShowing
//     ? ReactDOM.createPortal(
//         <React.Fragment>
//           <div className="modal-overlay" />
//           <div
//             className="modal-wrapper bg-dark-blue flex flex-col shadow w-60 text-white z-index:9999999"
//             aria-modal
//             aria-hidden
//             tabIndex={-1}
//             role="dialog"
//           >
//             <div className="modal">
//               <div className="modal-header">
//                 <button
//                   type="button"
//                   className="modal-close-button"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                   onClick={hide}
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <ul className="pt-2 pb-4 space-y-1 text-sm">
//                 <li className="rounded-sm">
//                   <a
//                     href="#"
//                     className="flex items-center p-2 space-x-3 rounded-md"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     <span>Settings</span>
//                   </a>
//                 </li>
//                 <li className="rounded-sm">
//                   <a
//                     href="#"
//                     className="flex items-center p-2 space-x-3 rounded-md"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     <span>Logout</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </React.Fragment>,
//         document.body
//       )
//     : null;

// const useModal = () => {
//   const [isShowing, setIsShowing] = useState(false);

//   function toggle() {
//     setIsShowing(!isShowing);
//   }

//   return {
//     isShowing,
//     toggle,
//   };
// };

export default function Sidebar() {
  // const { isShowing, toggle } = useModal();
  return (
    <div className="flex">
      <div className="flex flex-col h-screen bg-regal-blue shadow w-60 text-white">
        <div className="space-y-3">
          <div className="flex items-center m-5">
            <h2 className="text-xl font-bold">Sun* University</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2   pb-4 space-y-1 text-sm">
              <li className="rounded-sm active">
                <a
                  href="#"
                  className="flex items-center ml-2 p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Announcement</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center ml-2 p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>College</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center ml-5 p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <span>Department</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center ml-9 p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <polygon points="12 15 17 21 7 21 12 15"></polygon>
                  </svg>
                  <span>Class 1</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-dark-blue mt-auto">
          <div className="flex items-center p-2">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-12 ml-8"
              alt="Avatar"
            />
            <label className="mx-2">Avatar</label>
            {/* <button className="button-default" onClick={toggle}> */}
            <button className="button-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            {/* <Modal isShowing={isShowing} hide={toggle} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
