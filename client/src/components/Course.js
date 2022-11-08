import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CourseCard = ({ coursepathname, data, handleDropdown }) => {
  const handleClick = () => {
    handleDropdown(false);
  }
  return (
    <Link
      onClick={handleClick}
      to={coursepathname}
      className="accordion-title flex pl-10 px-5 py-2 rounded items-center text-xs
      cursor-pointer hover:bg-slate-600"
    >
      <FontAwesomeIcon icon={faBook} size="xl" color="white" />
      <span className="ml-2">{data.course}</span>
    </Link>
  );
};

export default CourseCard;
