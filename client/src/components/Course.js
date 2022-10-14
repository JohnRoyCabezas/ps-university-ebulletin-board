import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ data }) => {
  return (
    <div
      className="accordion-title flex pl-10 px-5 py-2 items-center text-xs
        cursor-pointer"
    >
      <FontAwesomeIcon icon={faSquare}/>
      <span className="ml-2">{data.course}</span>
    </div>
  );
};

export default CourseCard;
