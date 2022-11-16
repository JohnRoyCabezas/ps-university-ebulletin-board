import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClassCard = ({collegeid, course, type}) => {
  const [collegeURL, setCollegeURL] = useState('');

  useEffect(() => {
    if (type === "admin") {
      setCollegeURL("admincollege")
    } else if (type === "user") {
      setCollegeURL("college")
    }
  }, [])

  return (
    <>
      <div className="sidebar-dropdown group">
        <div className="group flex justify-between items-center ">
          <div className="flex w-full flex-1 px-4 py-1">
            <Link to={`${collegeURL}/${collegeid}/${course?.department_id}/${course?.id}`} className="flex items-center w-full">
              <FontAwesomeIcon
                icon={faCircle}
                className="button w-2 h-2 p-2 group-hover:text-sky-500 transition-all ease-in"
              />
              <span className="ml-2 text-sm font-light group-hover:text-white transition-all ease-in">
                {course?.course}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
