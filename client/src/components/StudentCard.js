import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const StudentCard = ({student, getDepartmentName, enlisted, handlePendingEnlist}) => {
    const [enlist, setEnlist] = useState(false);

    const handleToggle = () => {
        handlePendingEnlist(student.id)
    }

    return (
        <div className='px-6 py-2 flex align-items-center justify-between hover:bg-custom-gray'>
            <div className="flex">
                <div className="rounded-full my-auto">
                    <img
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                        src={student.avatar}
                        className="rounded-full w-11 h-11 min-w-max bg-white"
                    />
                </div>
                <div className="ml-6 max-w-xs capitalize">
                    <p className="font-bold text-xl break-words">{student.fullname}</p>
                    {/* <p className="italic">XXXX-XXXXX</p> */}
                    <p className="italic">{getDepartmentName(student.department_id)}</p>
                </div>
            </div>
            <div className="flex align-items-center">
                <ToggleSwitch enlisted={enlisted} handleToggle={handleToggle}/>
            </div>
        </div>
    );
}

export default StudentCard;