import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClassListModal from './ClassListModal';

const ClassListPicker = ({
    classList,
    students,
    departments,
    handleSave
    }) => {

    const [showModal, setShowModal] = useState(false);

    const getDepartmentName = (id) => {
        let departmentName;
        departments?.find((department)=> {
            if (department.id==id) {
            departmentName = department.department
            }
        })

        return departmentName;
    }

    return (
        <div>
            {showModal && (
                <ClassListModal
                    students = {students}
                    setShowModal={(value) => setShowModal(value)}
                    getDepartmentName = {getDepartmentName}
                    enlisted={classList}
                    handleSave = {handleSave}
                 />)
            }
            <div className="flex justify-between bg-white rounded focus:outline-blue-500 border-solid border-2 border-gray">
                <div className="m-auto">
                    {!classList.length>0 
                    ? <p>No students enlisted</p>
                    : <p>{classList.length} student{classList.length>1 && "s"} enlisted</p>
                    }
                </div>
                <Link onClick={()=> setShowModal(true)} className="text-white rounded-r border-l-2 p-2 bg-blue-500 hover:bg-opacity-75">Open Class List</Link>
            </div>
        </div>
    )
}

export default ClassListPicker;