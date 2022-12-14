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
import Cookies from "js-cookie";

const CollegeAccordion = ({ userData, data, departments, department }) => {
  const { collegeid } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const ROLES = {
    STUDENT: 1,
    ADMIN: 2,
  };

  function handleClick() {
    data?.id == collegeid ? setIsActive(!isActive) : setIsActive(true);
  }

  return (
    <div className="relative accordion-item">
      <div
      onMouseEnter={() => setIsEditing(true)}
      onMouseLeave={() => setIsEditing(false)}
        className={`accordion-title flex items-center justify-between pl-5 py-2 rounded-lg hover:bg-slate-800 ${
          data?.id == collegeid && 'bg-slate-800'
        } cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex">
          <CollegeIcon size="lg" />
          <span className="ml-2">{data?.college}</span>
        </div>
        <div className="flex justify-center items-center mx-2">
          {isEditing && 
          <span onClick={() => console.log('now editing!')} className="flex justify-center items-center mx-2">
            {user?.role_user?.role_id == ROLES["ADMIN"] && (
              <FontAwesomeIcon icon={faPenToSquare} className=""/>
            )}
          </span>
          }
          {data?.id == collegeid && isActive ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </div>
      </div>

      {user?.role_user?.role_id === ROLES['ADMIN']
        ? data?.id == collegeid && departments?.length > 0 &&
          isActive && (
            <div className="absolute z-50 bg-slate-800 text-white border w-52 rounded-lg flex flex-col p-2 mt-2 left-1/2 -translate-x-1/2">
              {departments?.map((department) => {
                return (
                  <div key={department.id}>
                    <DepartmentAccordion
                      handleDropdown={setIsActive}
                      data={department}
                      courses={department.courses}
                    />
                  </div>
                );
              })}
            </div>
          )
        : data?.id == collegeid &&
          isActive &&
          department && (
            <div className="absolute z-50 bg-slate-800 text-white border w-52 rounded-lg flex flex-col p-2 mt-2 left-1/2 -translate-x-1/2">
              <DepartmentAccordion
                handleDropdown={setIsActive}
                data={department}
                courses={userData?.course_user}
              />
            </div>
          )}
    </div>
  );
};

export default CollegeAccordion;
