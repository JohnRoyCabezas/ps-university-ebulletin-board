import Cookies from 'js-cookie';
import React, { useState } from 'react';
import CollegeIcon from '../shared/CollegeIcon';
import DepartmentAccordion from './DepartmentAccordion';

const CollegeAccordion = ({
  userData,
  data,
  departments,
  department,
}) => {
  const [isActive, setIsActive] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');
  const ROLES = {
    STUDENT: 1,
    ADMIN: 2,
  };

  return (
    <div className="accordion-item">
      <div
        onClick={() => setIsActive(!isActive)}
        className={`accordion-title flex items-center px-5 py-2 ${
          isActive && 'bg-slate-800'
        } cursor-pointer`}
      >
        <CollegeIcon />
        <span className="ml-2">{data?.college}</span>
      </div>

      {user?.role_user?.role_id === ROLES['ADMIN']
        ? isActive &&
          departments?.map((department) => {
            return (
              <div key={department.id}>
                <DepartmentAccordion
                  data={department}
                  courses={department.courses}
                />
              </div>
            );
          })
        : isActive && (
            <DepartmentAccordion
              data={department}
              courses={userData?.course_users}
            />
          )}
    </div>
  );
};

export default CollegeAccordion;
