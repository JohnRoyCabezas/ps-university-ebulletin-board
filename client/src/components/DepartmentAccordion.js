import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CourseCard from './Course';
import Cookies from 'js-cookie';

const DepartmentAccordion = ({ data, courses }) => {
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
        className={`accordion-title flex px-2 py-1 mt-1 rounded-lg items-center text-sm hover:bg-slate-700 ${
          isActive && 'bg-slate-600'
        } cursor-pointer`}
      >
        <div className="flex justify-between items-center w-full">
          <span>{data?.department}</span>
          {isActive ? (
            <FontAwesomeIcon icon={faChevronUp} size="xs" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} size="xs"/>
          )}
        </div>
      </div>

      {user?.role_user?.role_id === ROLES['ADMIN']
        ? isActive &&
          courses?.map((course) => {
            return (
              <div key={course.id}>
                <CourseCard data={course} />
              </div>
            );
          })
        : isActive &&
          courses?.map((course) => {
            return (
              <div key={course.id}>
                <CourseCard data={course?.course} />
              </div>
            );
          })}
    </div>
  );
};

export default DepartmentAccordion;
