import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBuilding, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassCard from "./ClassCard";

const DepartmentCard = ({ department, collegeid }) => {
  const [show, setShow] = useState(false);
  const courses = department?.courses;

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="flex flex-col justify-between text-sm">
        <div className="flex flex-col w-full flex-1">
          <div className="flex items-center group px-4 py-1 hover:bg-slate-700">
            <Link
              to={`admincollege/${department?.college_id}/${department?.id}`}
              className="flex items-center w-full"
            >
              <FontAwesomeIcon
                icon={faBuilding}
                className="h-3 w-3 p-2 rounded group-hover:text-white transition-all ease-in"
              />
              <span className="ml-2 font-normal group-hover:text-white transition-all ease-in  whitespace-nowrap">
                {department?.department}
              </span>
            </Link>
            {courses.length > 0 && (
              <button
                onClick={handleClick}
                className="flex items-center justify-center w-6 h-6 group-hover:text-white transition-all ease-in"
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="xs"
                  className={`transition-all ease-in ${show && "rotate-90"}`}
                />
              </button>
            )}
          </div>
          <div className={`ml-2 opacity-100 ${!show && "opacity-0 h-0 hidden"}`}>
            {courses?.map((course) => {
              return (
                <ClassCard
                  key={course.id}
                  collegeid={collegeid}
                  course={course}
                  type="admin"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentCard;
