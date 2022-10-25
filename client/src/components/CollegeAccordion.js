import Cookies from "js-cookie";
import React, { useState } from "react";
import CollegeIcon from "../shared/CollegeIcon";
import DepartmentAccordion from "./DepartmentAccordion";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const CollegeAccordion = ({ userData, data, departments, department }) => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(false);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const ROLES = {
    STUDENT: 1,
    ADMIN: 2,
  };

  function handleClick() {
    data?.id == id ? setIsActive(!isActive) : setIsActive(true);
  }

  return (
    <div className="accordion-item">
      <div
        className={`z-0 accordion-title flex items-center justify-between pl-5 py-2 ${
          data?.id == id && "bg-slate-800"
        } cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex">
          <CollegeIcon size="lg" />
          <span className="ml-2">{data?.college}</span>
        </div>
        <div className="pr-3">
          {data?.id == id && isActive ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
          {user?.role_user?.role_id == ROLES["ADMIN"] && (
            <FontAwesomeIcon icon={faPenToSquare} className="ml-2"/>
          )}
        </div>
      </div>

      {user?.role_user?.role_id === ROLES["ADMIN"]
        ? data?.id == id &&
          isActive &&
          departments.length > 0 && (
            <div className="absolute bg-slate-800 opacity-1 z-10 text-white border rounded-lg w-60 flex flex-col px-2 py-1 mt-2 ml-10">
              {departments?.map((department) => {
                return (
                  <div key={department.id}>
                    <DepartmentAccordion
                      data={department}
                      courses={department.courses}
                    />
                  </div>
                );
              })}
            </div>
          )
        : data?.id == id &&
          isActive &&
          department && (
            <div className="mx-2">
              <DepartmentAccordion
                data={department}
                courses={userData?.course_users}
              />
            </div>
          )}
    </div>
  );
};

export default CollegeAccordion;
