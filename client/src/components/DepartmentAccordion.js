import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CourseCard from './Course';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';

const DepartmentAccordion = ({ handleDropdown, data, courses }) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');
  const ROLES = {
    STUDENT: 1,
    ADMIN: 2,
  };

  const handleClick = (id) => {
    handleDropdown(false);
  };

  return (
    <div className="accordion-item">
      <div>
        <div
          className={`accordion-title flex px-2 py-1 rounded-lg my-1 items-center text-sm hover:bg-slate-600 dark:hover:bg-background ${
            isActive && 'bg-slate-700 dark:bg-background'
          } cursor-pointer`}
        >
          <div className="flex justify-between items-center w-full">
            <Link
              to={`${pathname}/${data.id}`}
              onClick={handleClick}
              className="mx-2 w-full"
            >
              {data?.department}
            </Link>
            {isActive ? (
              <span
                onClick={() => setIsActive(false)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-700 dark:hover:bg-secondary-background"
              >
                <FontAwesomeIcon icon={faChevronUp} size="xs" />
              </span>
            ) : (
              <div
                onClick={() => setIsActive(true)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-700 dark:hover:bg-secondary-background"
              >
                <FontAwesomeIcon icon={faChevronDown} size="xs" />
              </div>
            )}
          </div>
        </div>
        {user?.role_user?.role_id === ROLES['ADMIN']
          ? isActive &&
            courses?.map((course) => {
              return (
                <div key={course.id}>
                  <CourseCard
                    coursepathname={`${pathname}/${data.id}/${course.id}`}
                    handleDropdown={handleDropdown}
                    data={course}
                  />
                </div>
              );
            })
          : isActive &&
            courses?.map((course) => {
              return (
                <div key={course?.id}>
                  <CourseCard
                    handleDropdown={handleDropdown}
                    coursepathname={`${pathname}/${data.id}/${course.course.id}`}
                    data={course?.course}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default DepartmentAccordion;
