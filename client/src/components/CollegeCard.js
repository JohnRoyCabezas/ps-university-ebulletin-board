import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faBuildingColumns,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepartmentCard from "./DepartmentCard";

const CollegeCard = ({ active, college }) => {
  const [show, setShow] = useState(false);
  const departments = college?.departments;

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <>
      <div className="group flex w-full justify-between items-center my-1 px-4">
        <div className={`flex flex-1 w-full `}>
          <Link
            to={`admincollege/${college?.id}`}
            className="flex flex-1 w-full items-center"
          >
            <FontAwesomeIcon
              icon={faBuildingColumns}
              className={`button rounded h-3 w-3 p-2 bg-black bg-opacity-25 group-hover:bg-opacity-50  transition-all ease-in ${
                (active?.type === "college" && Number(active?.id) === college?.id)
                ? "text-sky-500 group-hover:text-sky-500"
                : "group-hover:text-white"
              }`}
            />
            <span className="ml-2 font-medium group-hover:text-white transition-all ease-in">
              {college?.college}
            </span>
          </Link>
        </div>
        {departments?.length > 0 && (
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
      <div className={`opacity-100 ${!show && "opacity-0 h-0 hidden"}`}>
        {departments?.map((department) => {
          return (
            <DepartmentCard
              active={active}
              collegeid={college?.id}
              department={department}
              key={department.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CollegeCard;
