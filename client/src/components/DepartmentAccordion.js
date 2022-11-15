import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CourseCard from './Course';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const DepartmentAccordion = ({ handleDropdown, data, courses }) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');
  const { theme } = useContext(ThemeContext)
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
          className={`accordion-title flex px-2 py-1 rounded-lg my-1 items-center ${theme} text-sm hover:bg-white hover:bg-opacity-30 ${isActive && theme
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
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-black hover:bg-opacity-30"
              >
                <FontAwesomeIcon icon={faChevronUp} size="xs" />
              </span>
            ) : (
              <div
                onClick={() => setIsActive(true)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-black hover:bg-opacity-30"
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
