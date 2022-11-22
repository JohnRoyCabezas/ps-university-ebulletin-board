import React, { useState } from 'react';
import StudentCard from './StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ClassListModal = ({
  students,
  setShowModal,
  getDepartmentName,
  enlisted,
  handleSave,
  }) => {
  const [searchValue, setSearchValue] = useState("");
  const [localStudentList, setLocalStudentList] = useState(students);
  const [pendingEnlists, setPendingEnlists] = useState(enlisted);

  const filteredData = students.filter(
    student => {
      return (
        student.fullname?.toLowerCase().includes(searchValue?.toLowerCase())
      )
    }
  )

  const checkEnlisted = (id) => {
    return Object.values(pendingEnlists).includes(id);
  }

  const handlePendingEnlist = (id) => {
    if(Object.values(pendingEnlists).includes(id)) {
      setPendingEnlists(Object.values(pendingEnlists).filter(value => value!=id));
    } else {
      setPendingEnlists(pendingEnlists.concat(id));
    }
  }
  
  const handleSearch = (e) => {
    e?.preventDefault();
    setLocalStudentList(filteredData);
  }
  
  const onSave = () => {
    handleSave(pendingEnlists);
    setShowModal(false)
  }

  return (
      <div>
      <div className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="my-6 w-1/2 mx-auto h-4/5">
        <div className="max-h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold m-auto">List of Students</h3>
          </div>
          <div className="p-4 flex items-center w-full">
            <input
              onKeyDown={(e) => {if(e.key==="Enter") handleSearch()}}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if(e.target.value==="") setLocalStudentList(students)
              }}
              placeholder="Search..."
              className="w-full px-2 font-light h-10 bg-white border rounded-md focus:outline-blue-500"
            ></input>
            <button className="absolute text-gray-400 right-5 -translate-x-1/2" onClick={handleSearch} >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="flex-auto overflow-y-auto max-height-1">
              {localStudentList.length>0 ? Object.keys(localStudentList).map((key) => (
              <div key={key}>
                  <StudentCard 
                      student={localStudentList[key]}
                      getDepartmentName={getDepartmentName}
                      enlisted={checkEnlisted(localStudentList[key].id)}
                      handlePendingEnlist = {handlePendingEnlist}
                  />
              </div>
              )): (
                <span className="w-max">
                  <p className="flex italic text-sm justify-center pb-3">Nothing found...</p>
                </span>
              )}
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default ClassListModal;